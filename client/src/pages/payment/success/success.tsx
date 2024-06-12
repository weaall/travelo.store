import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";

export function Success() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [responseData, setResponseData] = useState(null);

    const bookingDataString = Cookies.get("bookingData");

    const bookingData = JSON.parse(bookingDataString || "");

    const [customerKey, hotelId, roomId, totalPrice, checkInDate, checkOutDate, customerName, customerMobilePhone, customerEmail] =
        bookingData;

    const rollbackBookingRef = async () => {
        try {
            Cookies.remove("bookingData")
            const config = await sendJWT({
                method: "post",
                url: "/booking/rollback",
                data: {
                    booking_id: customerKey,
                    room_id: roomId,
                    check_in: checkInDate,
                    check_out: checkOutDate,
                },
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

    const updateBooking = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/booking",
                data: {
                    booking_id: customerKey,
                    hotel_id: hotelId,
                    room_id: roomId,
                    total_price: totalPrice,
                    check_in: checkInDate,
                    check_out: checkOutDate,
                    name: customerName,
                    phone_num: customerMobilePhone,
                    email: customerEmail,
                },
            });

            await axiosInstance.request(config);
            Cookies.remove("bookingData")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("로그인해주세요");
                    navigate("/");
                } else if (error.response.status === 400) {
                    navigate("/");
                }
            }
        }
    };

    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
        // @docs https://docs.tosspayments.com/reference/using-api/api-keys
        const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

        async function confirm() {
            const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
                method: "POST",
                headers: {
                    Authorization: encryptedSecretKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();

            if (!response.ok) {
                rollbackBookingRef();
                navigate(`/fail?code=${json.code}&message=${json.message}`);
                return;
            }

            updateBooking();
            return json;
        }
        confirm().then((data) => {
            setResponseData(data);
        });
    }, [searchParams]);

    return (
        <>
            <div className="box_section" style={{ width: "600px" }}>
                <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
                <h2>결제를 완료했어요</h2>
                <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                    <div className="p-grid-col text--left">
                        <b>결제금액</b>
                    </div>
                    <div className="p-grid-col text--right" id="amount">
                        {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                    <div className="p-grid-col text--left">
                        <b>주문번호</b>
                    </div>
                    <div className="p-grid-col text--right" id="orderId">
                        {`${searchParams.get("orderId")}`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                    <div className="p-grid-col text--left">
                        <b>paymentKey</b>
                    </div>
                    <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
                        {`${searchParams.get("paymentKey")}`}
                    </div>
                </div>
                <div className="p-grid-col">
                    <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
                        <button className="button p-grid-col5">연동 문서</button>
                    </Link>
                    <Link to="https://discord.gg/A4fRFXQhRu">
                        <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
                            실시간 문의
                        </button>
                    </Link>
                </div>
            </div>
            <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
                <b>Response Data :</b>
                <div id="response" style={{ whiteSpace: "initial" }}>
                    {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
                </div>
            </div>
        </>
    );
}
