import { useEffect, useRef, useState } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

import { useQuery } from "@tanstack/react-query";

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

export function CheckoutPage() {
    const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
    const [price, setPrice] = useState(50_000);
    const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

    useEffect(() => {
        if (paymentWidget == null) {
            return;
        }
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price }, { variantKey: "DEFAULT" });

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

    return (
        <div className="wrapper">
            <div className="box_section">
                <div id="payment-widget" />
                <div id="agreement" />
                <button
                    className="button"
                    style={{ marginTop: "30px" }}
                    disabled={!paymentMethodsWidgetReady}
                    onClick={async () => {
                        // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                        try {
                            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                            // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                            await paymentWidget?.requestPayment({
                                orderId: nanoid(),
                                orderName: "토스 티셔츠 외 2건",
                                customerName: "김토스",
                                customerEmail: "customer123@gmail.com",
                                customerMobilePhone: "01012341234",
                                successUrl: `${window.location.origin}/success`,
                                failUrl: `${window.location.origin}/fail`,
                            });
                        } catch (error) {
                            // 에러 처리하기
                            console.error(error);
                        }
                    }}
                >
                    결제하기
                </button>
            </div>
        </div>
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
