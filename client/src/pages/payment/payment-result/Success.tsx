import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import Loading from "../../../components/loading/Loading";

import ImgLoader from "../../../utils/imgLoader";

import * as tw from "./Success.styles";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import KakaoMapModal from "../../../hook/modal/kakao-map/KakaMap.modal";

export function SuccessPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const [isKakaoMapModalOpen, setIsKakaoMapModalOpen] = useState(false);

    const openKakaoMapModal = () => {
        setIsKakaoMapModalOpen(true);
    };

    const closeKakaoMapModal = () => {
        setIsKakaoMapModalOpen(false);
    };

    const [bookingData, setBookingData] = useState({
        booking_id: "",
        hotel_id: 0,
        room_id: 0,
        total_price: 0,
        check_in: "",
        check_out: "",
        name: "",
        phone_num: 0,
        emial: "",
    });

    const [hotelData, setHotelData] = useState({
        id: "",
        name: "",
        address: "",
        address_detail: "",
        postcode: "",
        description: "",
        check_in: 0,
        check_out: 0,

        wifi: 0,
        always_check_in: 0,
        breakfast: 0,
        barbecue: 0,

        carpark: 0,
        restaurnat: 0,
        cafe: 0,
        swimming_pool: 0,
        spa: 0,
        fitness: 0,
        convenience_store: 0,

        img: [
            {
                url: "",
            },
        ],
    });

    const [roomData, setRoomData] = useState({
        id: 0,
        name: "",
        num: 0,
        view_type: "",
        bed_type: "",
        discount: 0,

        img: [
            {
                url: "",
            },
        ],
    });

    const fetchBooking = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/booking/" + id,
            });

            const response = await axiosInstance.request(config);
            const bookingData = response.data.data[0];
            setBookingData(bookingData);
            fetchHotel(bookingData.hotel_id);
            fetchRoom(bookingData.room_id);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchHotel = async (hotelId: number) => {
        try {
            const hotelResponse = await axiosInstance.get("/hotel/" + hotelId);
            let hotelData = hotelResponse.data.data[0];

            const hotelImgResponse = await axiosInstance.get("/hotel/img/" + hotelId);
            hotelData.img = hotelImgResponse.data.data;

            setHotelData(hotelData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    const fetchRoom = async (roomId: number) => {
        try {
            const roomResponse = await axiosInstance.get("/room/" + roomId);
            const room = roomResponse.data.data[0];

            const roomImgResponse = await axiosInstance.get("/room/img/" + roomId);
            room.img = roomImgResponse.data.data;

            setRoomData(room);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.BookingWrap>
                <tw.BookingLabel>고객님의 예약이 확정되었습니다.</tw.BookingLabel>
                <tw.BookingText>
                    고객님, 안녕하세요.
                    <br />
                    <br />
                    예약 번호는 <tw.BookingSpan>{bookingData.booking_id}</tw.BookingSpan>이며, 아래 버튼으로 연결되는 셀프서비스 예약 관리 기능을 이용해 예약
                    정보 확인, 예약 취소, 예약 변경을 하실 수 있습니다.
                </tw.BookingText>
                <tw.BookingBtn>예약 관리하기</tw.BookingBtn>
            </tw.BookingWrap>
            <tw.OuterWrap>
                <tw.RoomWrap>
                    <tw.ContentsFlex>
                        <tw.Pic>
                            {hotelData?.img?.[0]?.url ? (
                                <ImgLoader imageUrl={hotelData.img[0].url} altText="" rounded="l-xl mobile:rounded-none mobile:rounded-t-xl" />
                            ) : (
                                <tw.UnRegWrap>미등록</tw.UnRegWrap>
                            )}
                        </tw.Pic>
                        <tw.OuterInfoWrap>
                            <tw.RoomInfo>
                                <tw.InfoWrap>
                                    <tw.HotelTitle>{hotelData.name}</tw.HotelTitle>
                                    <tw.HotelAddress onClick={openKakaoMapModal}>
                                        {hotelData.address} {hotelData.address_detail}, {hotelData.postcode}
                                    </tw.HotelAddress>
                                </tw.InfoWrap>
                            </tw.RoomInfo>
                        </tw.OuterInfoWrap>
                    </tw.ContentsFlex>
                </tw.RoomWrap>
                <tw.RoomWrap>
                    <tw.ContentsFlex>
                        <tw.Pic>
                            {roomData?.img?.[0]?.url ? (
                                <ImgLoader imageUrl={roomData.img[0].url} altText="" rounded="l-xl mobile:rounded-none mobile:rounded-t-xl" />
                            ) : (
                                <tw.UnRegWrap>미등록</tw.UnRegWrap>
                            )}
                        </tw.Pic>
                        <tw.OuterInfoWrap>
                            <tw.RoomInfo>
                                <tw.InfoWrap>
                                    <tw.RoomName>{roomData.name}</tw.RoomName>
                                    <tw.RoomText>{roomData.view_type}</tw.RoomText>
                                    <tw.RoomText>
                                        {roomData.bed_type} / 최대인원: {roomData.num}명
                                    </tw.RoomText>
                                </tw.InfoWrap>
                            </tw.RoomInfo>
                        </tw.OuterInfoWrap>
                    </tw.ContentsFlex>
                </tw.RoomWrap>
                <tw.CheckWrap>
                    <tw.CheckInWrap>
                        <tw.CheckLabel>체크인</tw.CheckLabel>
                        <tw.CheckText>{bookingData.check_in}</tw.CheckText>
                        <tw.CheckText>{hotelData.check_in}</tw.CheckText>
                    </tw.CheckInWrap>
                    <tw.CheckOutWrap>
                        <tw.CheckLabel>체크아웃</tw.CheckLabel>
                        <tw.CheckText>{bookingData.check_out}</tw.CheckText>
                        <tw.CheckText>{hotelData.check_out}</tw.CheckText>
                    </tw.CheckOutWrap>
                </tw.CheckWrap>
            </tw.OuterWrap>

            {isKakaoMapModalOpen && (
                <ModalPortal>
                    <KakaoMapModal
                        hotelName={hotelData.name}
                        address={`${hotelData.address} ${hotelData.address_detail}`}
                        imgUrl={hotelData.img[0].url}
                        onClose={closeKakaoMapModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
