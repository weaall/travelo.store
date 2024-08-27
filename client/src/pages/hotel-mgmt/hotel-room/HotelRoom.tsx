import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ModalPortal } from "../../../hook/modal/ModalPortal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";
import RegRoomModal from "../../../hook/modal/reg-room/RegRoom.modal";
import SetRoomModal from "../../../hook/modal/set-room/SetRoom.modal";

import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import ImgLoader from "../../../utils/imgLoader";
import { getThumbnailCFUrl } from "../../../utils/s3UrlToCFD.utils";

import * as tw from "./HotelRoom.styles";

export default function HotelRoom({ hotel_id }: { hotel_id: string | undefined }) {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    const openRegModal = () => {
        setIsRegModalOpen(true);
    };

    const closeRegModal = () => {
        setIsRegModalOpen(false);
        fetchRooms();
    };

    const [isSetModalOpen, setIsSetModalOpen] = useState(false);
    const [roomId, setRoomId] = useState(0);

    const openSetModal = (id: number) => {
        setRoomId(id);
        setIsSetModalOpen(true);
    };

    const closeSetModal = () => {
        setIsSetModalOpen(false);
        fetchRooms();
    };

    const [roomList, setRoomList] = useState([
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

    const fetchRooms = useCallback(async () => {
        openLoadingModal();
        try {
            const response = await axiosInstance.get("/room/hotel/" + hotel_id);
            const rooms = response.data.data;
            setRoomList(rooms);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    }, [hotel_id, navigate]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.ContentsWrap>
                    <tw.ContentsFlex>
                        <tw.TitleWrap>
                            <tw.Title>객실관리</tw.Title>
                        </tw.TitleWrap>
                        <tw.HalfFlex>
                            <tw.Btn onClick={openRegModal}>추가</tw.Btn>
                        </tw.HalfFlex>
                    </tw.ContentsFlex>

                    <tw.RoomList>
                        {roomList.length === 0 ? (
                            <tw.NoRoomWrap>
                                <tw.NoRoomText>등록된 객실이 없어요!</tw.NoRoomText>
                                <tw.AddRoomBtn onClick={openRegModal}>객실추가하기</tw.AddRoomBtn>
                            </tw.NoRoomWrap>
                        ) : (
                            roomList.map((room, index) => (
                                <tw.RoomWrap key={index}>
                                    <tw.UpperWrap>
                                        <tw.RoomName>{room.name}</tw.RoomName>
                                        <tw.Btn>삭제</tw.Btn>
                                    </tw.UpperWrap>
                                    <tw.MiddleWrap>
                                        <tw.Pic>
                                            <ImgLoader imageUrl={getThumbnailCFUrl(`/room_img/${hotel_id}/${room.id}`)} altText="" rounded="es-xl" />
                                        </tw.Pic>
                                        <tw.HotelInfoWrap>
                                            <tw.RoomText>
                                                {room.bed_type} ({room.view_type})
                                            </tw.RoomText>
                                            <tw.RoomText>기준인원 : {room.num}</tw.RoomText>
                                        </tw.HotelInfoWrap>
                                    </tw.MiddleWrap>
                                    <tw.MgmtBtnWrap>
                                        <tw.MgmtBtn onClick={() => navigate("../cal/" + room.id)}>가격설정</tw.MgmtBtn>
                                        <tw.MgmtBtn onClick={() => openSetModal(room.id)}>정보수정</tw.MgmtBtn>
                                    </tw.MgmtBtnWrap>
                                </tw.RoomWrap>
                            ))
                        )}
                    </tw.RoomList>
                </tw.ContentsWrap>
            </tw.MobileWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

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
