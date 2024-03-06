import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"

import * as tw from "./HotelRoom.styles";


export default function HotelRoom({ hotel_id }: { hotel_id: string | undefined }) {
    const [roomData, setRoomData] = useState();

    const navigate = useNavigate();

    const fetchRoom = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/" + hotel_id,
            });

            const response = await axiosInstance.request(config);
            setRoomData(response.data.data[0]);
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
    };

    return (
        <tw.Container>
            <tw.ContentsWrap>
            <tw.ContentsFlex>
                    <tw.Title>객실관리</tw.Title>
                    <tw.HalfFlex>
                        <tw.SetBtn>추가</tw.SetBtn>
                    </tw.HalfFlex>
                </tw.ContentsFlex>
            </tw.ContentsWrap>
        </tw.Container>
    );
}
