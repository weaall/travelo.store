import React, { DragEvent, useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./SetPrice.modal.styles"

interface ModalProps {
    onClose: () => void;
    room_id: number | undefined;
    year: number;
    month: number;
}

export default function SetPriceModal({ onClose, room_id, year, month }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        room_id: room_id,
    });

    const [priceData, setPriceData] = useState({
        year: year,
        month: month,
        days: 0,
        friday: 0,
        saturday: 0,
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
                    url: "/room/price",
                    data: priceData,
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
                    {year}년 {month}월
                </tw.UpperTag>
                <tw.InputWrap>
                    <tw.UpperTag>평일</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={priceData.days} name="days" maxLength={7} />
                    <tw.ContentsFlex>
                        <tw.HalfCol>
                            <tw.UpperTag>금요일</tw.UpperTag>
                            <tw.Input onChange={onChangeInput} value={priceData.friday} name="friday" maxLength={7}/>
                        </tw.HalfCol>
                        <tw.HalfCol>
                            <tw.UpperTag>토요일</tw.UpperTag>
                            <tw.Input onChange={onChangeInput} value={priceData.saturday} name="saturday" maxLength={7}/>
                        </tw.HalfCol>
                    </tw.ContentsFlex>
                    <tw.UpperTag>방갯수</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={priceData.room_limit} name="room_limit" maxLength={2}/>
                </tw.InputWrap>
                <tw.RegBtn $validator={false}>설정</tw.RegBtn>
            </tw.ModalWrap>
        </tw.Container>
    );
}
