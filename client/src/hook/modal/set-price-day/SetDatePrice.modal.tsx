import React, { DragEvent, useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./SetDatePrice.modal.styles"

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
    room_id: number | undefined;
    year: number;
    month: number;
    date : number;

}

export default function SetPriceByDateModal({ onClose, hotel_id, room_id, year, month, date }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        room_id: room_id,
    });

    const [priceData, setPriceData] = useState({
        hotel_id: hotel_id,
        room_id: room_id,
        year: year,
        month: month,
        date: date,
        price: 0,
        room_limit: 0,
    });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceData({ ...priceData, [name]: value.replace(/[^0-9]/g, "") });
    };
    

    const onClickSave= async () => {
        if (window.confirm("저장하시겠습니까?")) {
            try {
                const config = await sendJWT({
                    method: "post",
                    url: "/room/price/date",
                    data: priceData,
                });
                const response = await axiosInstance.request(config);
                window.alert("저장완료");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status === 409) {
                        window.alert("올바른 접근이 아닙니다.");
                    } else if (error.response.status === 401) {
                        window.alert("올바른 접근이 아닙니다.");
                    } 
                }
            }
        }
    };

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>가격설정</tw.Title>
                </tw.TitleWrap>
                <tw.UpperTag>
                    {year}년 {month}월 {date}일
                </tw.UpperTag>
                <tw.InputWrap>
                    <tw.UpperTag>금액</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={priceData.price} name="price" maxLength={7} />
                    <tw.UpperTag>방갯수</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={priceData.room_limit} name="room_limit" maxLength={2} />
                </tw.InputWrap>
                <tw.RegBtn
                    $validator={false}
                    onClick={() => {
                        onClickSave();
                        onClose();
                    }}
                >
                    설정
                </tw.RegBtn>
            </tw.ModalWrap>
        </tw.Container>
    );
}
