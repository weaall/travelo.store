import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";

import dayjs from 'dayjs'

import * as tw from "./HotelPrice.styles";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import SetRoomModal from "../../../hook/modal/set-room/SetRoom.modal";

export default function HotelPrice({ hotel_id }: { hotel_id: string | undefined }) {

    const [isSetModalOpen, setIsSetModalOpen] = useState(false);
    const [roomId, setRoomId] = useState(0);

    const openSetModal = (id: number) => {
        setRoomId(id);
        setIsSetModalOpen(true);
      };

    const closeSetModal = () => {
        setIsSetModalOpen(false);
    };

    const [roomData, setRoomData] = useState([
        {
            id: 0,
            name: "",
            num: 0,
            bed_type_id: 0,
            bed_type: "",
            view_type_id: 0,
            view_type: "",
            discount: 0,
        },
    ]);

    const navigate = useNavigate();

    const fetchRoom = async () => {
        try {
            const response = await axiosInstance.get("/room/hotel/" + hotel_id);
            setRoomData(response.data.data);
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

    useEffect(() => {
        fetchRoom();
    }, []);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsFlex>
                    <tw.Title>가격관리</tw.Title>
                </tw.ContentsFlex>
                <tw.RoomList>
                    {roomData.map((room, index) => (
                        <tw.RoomWrap key={index}>
                            <tw.ContentsFlex>
                                <tw.RoomName>{room.name}</tw.RoomName>
                                <p>{dayjs(new Date()).format('YYYY-MM-DD')}</p> {/* 2022-05-16 */}
                            </tw.ContentsFlex>
                            <tw.ContentsFlex>
                                <tw.RoomText>숙박인원 : {room.num}인</tw.RoomText>
                                <tw.RoomText>{room.bed_type}</tw.RoomText>
                                <tw.RoomText>({room.view_type})</tw.RoomText>
                            </tw.ContentsFlex>
                        </tw.RoomWrap>
                    ))}
                </tw.RoomList>
            </tw.ContentsWrap>

            {isSetModalOpen && (
                <ModalPortal>
                    <SetRoomModal onClose={closeSetModal} hotel_id={hotel_id} room_id={roomId} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
