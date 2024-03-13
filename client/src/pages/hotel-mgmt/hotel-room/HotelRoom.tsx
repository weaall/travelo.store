import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"

import * as tw from "./HotelRoom.styles";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import RegRoomModal from "../../../hook/modal/RegRoom/RegRoom.modal";


export default function HotelRoom({ hotel_id }: { hotel_id: string | undefined }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const [roomData, setRoomData] = useState([
        {
            id: 0,
            name: "",
            bed_type_id: 0,
        },
    ]);

    const navigate = useNavigate();

    const fetchRoom = async () => {
        try {

            const response = await axiosInstance.get("/room/hotel/" + hotel_id)

            console.log(response.data.data)
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
        fetchRoom()
    }, [])

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsFlex>
                    <tw.Title>객실관리</tw.Title>
                    <tw.HalfFlex>
                        <tw.AddBtn onClick={openModal}>추가</tw.AddBtn>
                    </tw.HalfFlex>
                </tw.ContentsFlex>
                <tw.RoomList>
                {roomData.map((room, index) => (
                    <tw.RoomWrap key={index}>
                        <tw.RoomName>{room.name}</tw.RoomName>
                    </tw.RoomWrap>
                ))}
                </tw.RoomList>
            </tw.ContentsWrap>

            {isModalOpen && (
                <ModalPortal>
                    <RegRoomModal onClose={closeModal} hotel_id={hotel_id} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
