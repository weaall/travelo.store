import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import Loading from "../../../components/loading/Loading";

import ImgLoader from "../../../utils/imgLoader";

import * as tw from "./Success.styles";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import KakaoMapModal from "../../../hook/modal/kakao-map/KakaMap.modal";
import dayjs from "dayjs";

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
            handleAxiosError(error, navigate);
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
            handleAxiosError(error, navigate);
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
            handleAxiosError(error, navigate);
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
                                <ImgLoader imageUrl={hotelData.img[0].url} altText="" rounded="xl mobile:rounded-none mobile:rounded-xl" />
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
                        <tw.CheckText>{dayjs(bookingData.check_in).format("YYYY. MM. DD (dddd)")}</tw.CheckText>
                        <tw.CheckText>({hotelData.check_in}:00 시 이후)</tw.CheckText>
                    </tw.CheckInWrap>
                    <tw.CheckOutWrap>
                        <tw.CheckLabel>체크아웃</tw.CheckLabel>
                        <tw.CheckText>{dayjs(bookingData.check_out).format("YYYY. MM. DD (dddd)")}</tw.CheckText>
                        <tw.CheckText>({hotelData.check_out}:00 시 이전)</tw.CheckText>
                    </tw.CheckOutWrap>
                </tw.CheckWrap>
                <tw.GuideText>예약 관리하기 페이지에서 숙소 정책과 편의 시설/서비스에 관해서도 쉽게 확인할 수 있습니다.</tw.GuideText>
            </tw.OuterWrap>
            <tw.DetailWrap>
                <tw.Label>예약 세부 사항</tw.Label>
                <tw.DetailRow>
                    <tw.DetailLabelWrap>
                        <tw.DetailLabel>객실 수 및 숙박 수</tw.DetailLabel>
                    </tw.DetailLabelWrap>
                    <tw.DetailTextWrap>
                        <tw.DetailText>객실 1개 / {dayjs(bookingData.check_out).diff(dayjs(bookingData.check_in), "day")}박</tw.DetailText>
                    </tw.DetailTextWrap>
                </tw.DetailRow>
                <tw.DetailRow>
                    <tw.DetailLabelWrap>
                        <tw.DetailLabel>객실종류</tw.DetailLabel>
                    </tw.DetailLabelWrap>
                    <tw.DetailTextWrap>
                        <tw.DetailText>
                            {roomData.name}({roomData.view_type}) / {roomData.bed_type}
                        </tw.DetailText>
                    </tw.DetailTextWrap>
                </tw.DetailRow>
                <tw.DetailRow>
                    <tw.DetailLabelWrap>
                        <tw.DetailLabel>대표 투숙객</tw.DetailLabel>
                    </tw.DetailLabelWrap>
                    <tw.DetailTextWrap>
                        <tw.DetailText>{bookingData.name}</tw.DetailText>
                    </tw.DetailTextWrap>
                </tw.DetailRow>
                <tw.DetailRow>
                    <tw.DetailLabelWrap>
                        <tw.DetailLabel>대표 전화번호</tw.DetailLabel>
                    </tw.DetailLabelWrap>
                    <tw.DetailTextWrap>
                        <tw.DetailText>{bookingData.phone_num}</tw.DetailText>
                    </tw.DetailTextWrap>
                </tw.DetailRow>
                <tw.DetailRow>
                    <tw.DetailLabelWrap>
                        <tw.DetailLabel>결제금액</tw.DetailLabel>
                    </tw.DetailLabelWrap>
                    <tw.DetailTextWrap>
                        <tw.DetailText>{bookingData.total_price.toLocaleString()}원</tw.DetailText>
                    </tw.DetailTextWrap>
                </tw.DetailRow>
            </tw.DetailWrap>

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
