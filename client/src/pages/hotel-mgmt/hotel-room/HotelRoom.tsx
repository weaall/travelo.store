import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";

import * as tw from "./HotelRoom.styles";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import RegRoomModal from "../../../hook/modal/reg-room/RegRoom.modal";
import SetRoomModal from "../../../hook/modal/set-room/SetRoom.modal";

export default function HotelRoom({ hotel_id }: { hotel_id: string | undefined }) {
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    const openRegModal = () => {
        setIsRegModalOpen(true);
    };

    const closeRegModal = () => {
        setIsRegModalOpen(false);
    };

    const [isSetModalOpen, setIsSetModalOpen] = useState(false);
    const [roomId, setRoomId] = useState(0);

    const openSetModal = (id: number) => {
        setRoomId(id);
        setIsSetModalOpen(true);
      };

    const closeSetModal = () => {
        setIsSetModalOpen(false);
        fetchRoom();
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
    }, [roomData]);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsFlex>
                    <tw.Title>객실관리</tw.Title>
                    <tw.HalfFlex>
                        <tw.AddBtn onClick={openRegModal}>추가</tw.AddBtn>
                    </tw.HalfFlex>
                </tw.ContentsFlex>
                <tw.RoomList>
                    {roomData.map((room, index) => (
                        <tw.RoomWrap key={index}>
                            <tw.ContentsFlex>
                                <tw.RoomName>{room.name}</tw.RoomName>
                                <tw.HalfFlex>
                                    <tw.AddBtn onClick={() => navigate("../cal/" + room.id)}>가격설정</tw.AddBtn>
                                    <tw.AddBtn onClick={() => openSetModal(room.id)}>정보수정</tw.AddBtn>
                                    <tw.AddBtn>삭제</tw.AddBtn>
                                </tw.HalfFlex>
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

            {isRegModalOpen && (
                <ModalPortal>
                    <RegRoomModal onClose={closeRegModal} hotel_id={hotel_id} />
                </ModalPortal>
            )}

            {isSetModalOpen && (
                <ModalPortal>
                    <SetRoomModal onClose={closeSetModal} hotel_id={hotel_id} room_id={roomId} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
