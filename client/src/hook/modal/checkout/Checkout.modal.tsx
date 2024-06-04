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


    const navigate = useNavigate();

    const updateBookingRep = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/booking/repo",
                data: props,
            });

            const response = await axiosInstance .request(config);
            const fetchedData = response.data.data[0];

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                } else if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
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
                            // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                            // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                            try {
                                await paymentWidget?.requestPayment({
                                    orderId: nanoid(),
                                    orderName: props.orderName,
                                    customerName: props.customerName,
                                    customerEmail: props.customerEmail,
                                    customerMobilePhone: props.customerMobilePhone,
                                    successUrl: `${window.location.origin}/success`,
                                    failUrl: `${window.location.origin}/fail`,
                                });
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
