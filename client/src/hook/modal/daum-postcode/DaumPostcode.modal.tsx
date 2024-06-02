import { useEffect } from "react";
import * as tw from "./DaumPostcode.modal.styles";

interface ModalProps {
    onClose: () => void;
    onChangePostcode: (address: string) => void;
    onChangeAddress: (address: string) => void;
}

export default function DaumPostcodeModal({ onClose, onChangePostcode, onChangeAddress }: ModalProps) {

    useEffect(() => {
        const openKaKao = () => {
            const script = document.createElement("script");
            script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

            script.onload = () => {
                new (window as any).daum.Postcode({
                    oncomplete: (data: any) => {
                        let fullAddress = data.address;
                        let extraAddress = "";

                        if (data.addressType === "R") {
                            if (data.bname !== "") {
                                extraAddress += data.bname;
                            }
                            if (data.buildingName !== "") {
                                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
                            }
                            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
                        }

                        onChangeAddress(fullAddress);
                        onChangePostcode(data.zonecode);
                        onClose();
                    },
                    width: "400px", 
                    height: "450px",
                    theme: {
                        bgColor: "#FFFFFF", //바탕 배경색
                        pageBgColor: "#333333", //페이지 배경색
                        textColor: "#000000", //기본 글자색
                        emphTextColor: "#6666FF", //강조 글자색
                        outlineColor: "#000000" //테두리
                    },
                    useBannerLink: false
                }).embed(document.getElementById("postcode-container"));
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        openKaKao();
    }, [onClose]);

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="닫기 버튼" src={require("../../../assets/svg/close_svg.svg").default} />
                    </tw.CloseBtn>
                    <tw.Title>주소 검색</tw.Title>
                </tw.TitleWrap>
                <div id="postcode-container"></div>
            </tw.ModalWrap>
        </tw.Container>
    );
}
