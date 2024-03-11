import { useState } from "react"
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./RegRoom.modal.styles"

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
}

export default function RegRoomModal({ onClose, hotel_id }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState();

    const onClickRegister = async () => {
        if (window.confirm("저장하시겠습니까?")) {
            try {
                const config = await sendJWT({
                    method: "put",
                    url: "/hotel/mgmt/facil",
                    data: roomData,
                });
                const response = await axiosInstance.request(config);
                window.alert("저장완료");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status === 409) {
                        window.alert("올바른 접근이 아닙니다.");
                        navigate("/");
                    } else if (error.response.status === 401) {
                        window.alert("올바른 접근이 아닙니다.");
                        navigate("/main");
                    }
                }
            }
        } else {
        }
    };

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.CloseBtn onClick={onClose}>
                    <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                </tw.CloseBtn>
                <tw.Title>객실추가</tw.Title>
                <tw.InputWrap>
                    <tw.UpperTag>호텔이름</tw.UpperTag>
                    <tw.Input />
                </tw.InputWrap>
                <tw.RegBtn $validator={true}>등록하기</tw.RegBtn>
            </tw.ModalWrap>
        </tw.Container>
    );
}
