import React, { DragEvent, useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./SetPrice.modal.styles"

interface ModalProps {
    onClose: () => void;
    room_id: number | undefined;
}

export default function SetPriceModal({ onClose, room_id }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        room_id: room_id,
    });

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>가격설정</tw.Title>
                </tw.TitleWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
