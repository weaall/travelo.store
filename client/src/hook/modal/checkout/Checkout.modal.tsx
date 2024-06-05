import { useEffect, useRef, useState } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";

import * as tw from "./Checkout.modal.styles";
import { useNavigate } from "react-router-dom";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";

interface ModalProps {
    onClose: () => void;
    checkInDate: string;
    checkOutDate: string;

    hotelId: string;
    roomId: string;
    totalPrice: number;

    orderName: string;

    customerName: string;
    customerEmail: string;
    customerMobilePhone: string;
}

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid(12);

export function CheckoutModal( props : ModalProps) {
    const navigate = useNavigate();

    const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
    const [price, setPrice] = useState(props.totalPrice);
    const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

    useEffect(() => {
        if (paymentWidget == null) {
            return;
        }
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            selector,
            { value: price, currency: "KRW", country: "KR" },
            { variantKey: "DEFAULT" },
        );

        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

        paymentMethodsWidget.on("ready", () => {
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
            isPaymentMethodsWidgetReady(true);
        });
    }, [paymentWidget]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    const [bookingRef, setBookingRef] = useState({
        booking_id: customerKey,
        room_id: props.roomId,
        total_price: props.totalPrice,
        check_in: props.checkInDate,
        check_out: props.checkOutDate
    })

    const updateBookingRef = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/booking/ref",
                data: bookingRef,
            });

            await axiosInstance.request(config);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("로그인해주세요");
                    navigate("/");
                } else if (error.response.status === 400) {
                    window.alert("해당객실이 모두 소진되었습니다.");
                    navigate("/");
                }
            }
        }
    };

    const [booking, setBooking] = useState({
        booking_id: customerKey,
        hotel_id: props.hotelId,
        room_id: props.roomId,
        total_price: props.totalPrice,
        check_in: props.checkInDate,
        check_out: props.checkOutDate,
        name: props.customerName,
        phone_num: props.customerMobilePhone,
        email: props.customerEmail,
    });

    const updateBooking = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/booking",
                data: booking,
            });

            await axiosInstance.request(config);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("로그인해주세요");
                    navigate("/");
                } else if (error.response.status === 400) {
                    window.alert("해당객실이 모두 소진되었습니다.");
                    navigate("/");
                }
            }
        }
    };

    const rollbackBookingRef = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/booking",
                data: props.roomId
            });

            await axiosInstance.request(config);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("로그인해주세요");
                    navigate("/");
                } else if (error.response.status === 400) {
                    window.alert("해당객실이 모두 소진되었습니다.");
                    navigate("/");
                }
            }
        }
    };

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={props.onClose}>
                        <tw.CloseSVG alt="닫기 버튼" src={require("../../../assets/svg/close_svg.svg").default} />
                    </tw.CloseBtn>
                    <tw.Title>예약하기</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <div className="wrapper">
                        <div className="box_section">
                            <div id="payment-widget" />
                            <div id="agreement" />
                        </div>
                    </div>
                </tw.InputWrap>
                <tw.PayWrap>
                    <tw.PaymentBtn
                        className="button"
                        disabled={!paymentMethodsWidgetReady}
                        onClick={async () => {
                            try {
                                await updateBookingRef();
                    
                                try {
                                    await paymentWidget?.requestPayment({
                                        orderId: customerKey,
                                        orderName: props.orderName,
                                        customerName: props.customerName,
                                        customerEmail: props.customerEmail,
                                        customerMobilePhone: props.customerMobilePhone,
                                        successUrl: `${window.location.origin}/success`,
                                        failUrl: `${window.location.origin}/fail`,
                                    });
                    
                                    await updateBooking();
                                } catch (paymentError) {
                                    await rollbackBookingRef();
                                    throw paymentError;
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        결제하기
                    </tw.PaymentBtn>
                </tw.PayWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}

function usePaymentWidget(clientKey: string, customerKey: string) {
    return useQuery({
        queryKey: ["payment-widget", clientKey, customerKey],
        queryFn: () => {
            // ------  결제위젯 초기화 ------
            // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
            return loadPaymentWidget(clientKey, customerKey);
        },
    });
}
