import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";

import { decrypt, encrypt } from "../../utils/cryptoJs";
import { facilItems, servItems } from "../../data/hotelData";

import SearchBox from "../../components/searchBox/SearchBox";
import SearchBoxSlim from "../../components/searchBoxSlim/SearchBoxSlim";
import ImgSlider from "../../components/imgSlider/imgSlider";
import ImgSliderMain from "../../components/imgSliderMain/imgSliderMain";

import { ModalPortal } from "../../hook/modal/ModalPortal";
import KakaoMapModal from "../../hook/modal/kakao-map/KakaMap.modal";
import ReviewListModal from "../../hook/modal/review-list/ReviewList.modal";

import * as tw from "./Hotel.styles";
import AlertModal from "../../hook/modal/alert/Alert.modal";
import recentViewHotels from "../../utils/recentView.util";

export default function Hotel() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [onCloseCallback, setOnCloseCallback] = useState<() => void>(() => {});
    const openAlertModal = (callback: () => void) => {
        setOnCloseCallback(() => callback);
        setIsAlertModalOpen(true);
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        onCloseCallback();
    };

    const [isKakaoMapModalOpen, setIsKakaoMapModalOpen] = useState(false);
    const openKakaoMapModal = () => {
        setIsKakaoMapModalOpen(true);
    };
    const closeKakaoMapModal = () => {
        setIsKakaoMapModalOpen(false);
    };

    const [isReviewListModalOpen, setIsReviewListModalOpen] = useState(false);
    const openReviewListModal = () => {
        setIsReviewListModalOpen(true);
    };
    const closeReviewListModal = () => {
        setIsReviewListModalOpen(false);
    };

    const { encryptedId, checkInDate, checkOutDate, adult, child } = useParams();

    const id = decrypt(encryptedId || "");

    const [hotelData, setHotelData] = useState({
        id: id,
        name: "",
        address: "",
        address_detail: "",
        description: "",

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

    const [ratingData, setRatingData] = useState<number>();

    const [roomList, setRoomList] = useState([
        {
            id: 0,
            name: "",
            num: 0,
            view_type: "",
            bed_type: "",
            discount: 0,

            room_price: [
                {
                    date: "",
                    price: 0,
                    room_current: 0,
                    room_limit: 0,
                },
            ],

            img: [
                {
                    url: "",
                },
            ],
        },
    ]);

    const [reviewList, setReviewList] = useState([
        {
            hotel_id: "",
            booking_id: "",
            rating: 0,
            review: "",
            name: "",
            check_in: "",
        },
    ]);

    useEffect(() => {
        recentViewHotels(id);
    }, [id]);

    const fetchHotelImg = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/hotel/img/" + id);
            setHotelData((prevState) => ({
                ...prevState,
                img: response.data.data,
            }));
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    },[navigate, id]);

    const fetchRoom = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/room/hotel/" + id);
            const rooms = response.data.data;

            for (let room of rooms) {
                const roomImgResponse = await axiosInstance.get(`/room/img/${room.id}`);
                room.img = roomImgResponse.data.data;

                const roomPriceresponse = await axiosInstance.get(`/room/price/${room.id}`, {
                    params: {
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                    },
                });
                room.room_price = roomPriceresponse.data.data;
            }
            setRoomList(rooms);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    }, [navigate, id, checkInDate, checkOutDate]);

    const fetchReview = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/booking/review/hotel/" + id);
            setReviewList(response.data.data);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    },[navigate, id]);

    const fetchHotel = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/hotel/" + id);
            setHotelData(response.data.data[0]);
            const ratingResponse = await axiosInstance.get(`/hotel/rating/${id}`);
            setRatingData(ratingResponse.data.data[0].rating);
            await fetchHotelImg();
            await fetchRoom();
            await fetchReview();
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    },[navigate, id, fetchHotelImg, fetchRoom, fetchReview]);

    const clickRoom = (hotelId: number, roomId: number) => {
        const jwtToken = Cookies.get("jwt");
        if (!jwtToken) {
            const handleModalClose = () => {
                navigate("/signin");
            };

            openAlertModal(handleModalClose);
            return;
        }
        const encryptedHotelId = encrypt(`${hotelId}`);
        const encryptedRoomId = encrypt(`${roomId}`);
        navigate(`/payment/${encryptedHotelId}/${encryptedRoomId}/${checkInDate}/${checkOutDate}`);
    };

    useEffect(() => {
        fetchHotel();
    }, [checkInDate, checkOutDate ,fetchHotel]);

    const getInitialAndLastChar = (name: string) => {
        if (name.length === 0) return "";
        if (name.length === 1) return name;
        if (name.length === 2) return `${name.charAt(0)}*`;
        return `${name.charAt(0)}${" * ".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
    };

    const sortedRoomList = [...roomList].sort((a, b) => {
        const totalPriceA = a.room_price.reduce((total, room) => total + room.price, 0);
        const totalPriceB = b.room_price.reduce((total, room) => total + room.price, 0);

        if (totalPriceA === 0 && totalPriceB !== 0) {
            return 1;
        } else if (totalPriceA !== 0 && totalPriceB === 0) {
            return -1;
        } else {
            return totalPriceA - totalPriceB;
        }
    });

    return (
        <tw.Container>
            <tw.MainContainer>
            <tw.SearchWrap>
    <SearchBoxSlim
        defaultSearchValue={loading ? "" : hotelData.name}
        defaultStartDate={loading ? "" : checkInDate}
        defaultEndDate={loading ? "" : checkOutDate}
        defaultAdult={loading ? 2 : parseInt(adult || "2")}
        defaultChild={loading ? 0 : parseInt(child || "0")}
        currentHotelId={loading ? "" : id}
        currentHotelName={loading ? "" : hotelData.name}
    />
</tw.SearchWrap>
<tw.SearchWrapMobile>
    <SearchBox
        defaultSearchValue={loading ? "" : hotelData.name}
        defaultStartDate={loading ? "" : checkInDate}
        defaultEndDate={loading ? "" : checkOutDate}
        defaultAdult={loading ? 2 : parseInt(adult || "2")}
        defaultChild={loading ? 0 : parseInt(child || "0")}
        currentHotelId={loading ? "" : id}
        currentHotelName={loading ? "" : hotelData.name}
    />
</tw.SearchWrapMobile>

                {loading ? (
                    <tw.ContentsWrap>
                        <tw.HotelWrap>
                            <tw.HotelPicLoading />
                            <tw.HotelInfoWrap>
                                <tw.HotelFlexWrapLoading />
                                <tw.HotelFlexWrapLoading />
                            </tw.HotelInfoWrap>
                        </tw.HotelWrap>
                    </tw.ContentsWrap>
                ) : (
                    <tw.ContentsWrap>
                        <tw.HotelWrap>
                            <tw.HotelPic>
                                <ImgSliderMain images={hotelData.img} />
                            </tw.HotelPic>
                            <tw.HotelInfoWrap>
                                <tw.HotelFlexWrap>
                                    <tw.HotelInnerWrap>
                                        <tw.HotelTitle>{hotelData.name}</tw.HotelTitle>
                                        <tw.HotelRating>{ratingData === null ? "-" : `${ratingData}`}</tw.HotelRating>
                                    </tw.HotelInnerWrap>
                                    <tw.HotelAddressWrap>
                                        <tw.AddressSVG alt="" src={require("../../assets/svg/location_icon.svg").default} />
                                        <tw.HotelAddress onClick={openKakaoMapModal}>
                                            {hotelData.address} {hotelData.address_detail}
                                        </tw.HotelAddress>
                                    </tw.HotelAddressWrap>
                                    <tw.HotelDesc>{hotelData.description}</tw.HotelDesc>
                                </tw.HotelFlexWrap>
                                <tw.HotelFlexWrap>
                                    <tw.Label>서비스 / 편의시설</tw.Label>
                                    <tw.HotelServ>
                                        {servItems.map((item) =>
                                            (hotelData as any)[item.comp] === 1 ? (
                                                <tw.HotelTextWrap key={item.comp}>
                                                    <tw.HotelSvg alt="" src={require("../../assets/svg/check_icon.svg").default} />
                                                    <tw.HotelText key={item.comp}>{item.label}</tw.HotelText>
                                                </tw.HotelTextWrap>
                                            ) : null,
                                        )}
                                        {facilItems.map((item) =>
                                            (hotelData as any)[item.comp] === 1 ? (
                                                <tw.HotelTextWrap key={item.comp}>
                                                    <tw.HotelSvg alt="" src={require("../../assets/svg/check_icon.svg").default} />
                                                    <tw.HotelText key={item.comp}>{item.label}</tw.HotelText>
                                                </tw.HotelTextWrap>
                                            ) : null,
                                        )}
                                    </tw.HotelServ>
                                </tw.HotelFlexWrap>
                            </tw.HotelInfoWrap>
                        </tw.HotelWrap>

                        <tw.RoomList>
                            <tw.Label>객실정보</tw.Label>
                            {sortedRoomList.map((room) => (
                                <tw.RoomWrap key={room.id}>
                                    <tw.ContentsFlex>
                                        <tw.RoomPic>
                                            <ImgSlider images={room.img} />
                                        </tw.RoomPic>
                                        <tw.RoomInfoWrap>
                                            <tw.RoomInfo>
                                                <tw.InfoWrap>
                                                    <tw.RoomName>{room.name}</tw.RoomName>
                                                    <tw.RoomDetailWrap>
                                                        <tw.RoomDetail>
                                                            <tw.RoomSvg alt="" src={require("../../assets/svg/view_icon.svg").default} />
                                                            <tw.RoomText>{room.view_type}</tw.RoomText>
                                                        </tw.RoomDetail>
                                                        <tw.RoomDetail>
                                                            <tw.RoomSvg alt="" src={require("../../assets/svg/room.svg").default} />
                                                            <tw.RoomText>{room.bed_type}</tw.RoomText>
                                                        </tw.RoomDetail>
                                                        <tw.RoomDetail>
                                                            <tw.RoomSvg alt="" src={require("../../assets/svg/person_icon.svg").default} />
                                                            <tw.RoomText>{room.num}인</tw.RoomText>
                                                        </tw.RoomDetail>
                                                    </tw.RoomDetailWrap>
                                                </tw.InfoWrap>
                                                <tw.PriceWrap>
                                                    <tw.TotalLabel>{checkInDate}~</tw.TotalLabel>
                                                    <tw.TotalLabel>{dayjs(checkOutDate).diff(dayjs(checkInDate), "day")}박 총 요금</tw.TotalLabel>
                                                    <tw.TotalPrice>
                                                        {room.room_price.reduce((total, room) => total + room.price, 0).toLocaleString()}원
                                                    </tw.TotalPrice>
                                                    {room.room_price.length === 0 ||
                                                    room.room_price.some(
                                                        (priceData) => priceData.room_limit === priceData.room_current || priceData.price === 0,
                                                    ) ? (
                                                        <tw.BookBtnWrap>
                                                            <tw.BookBtn>객실소진</tw.BookBtn>
                                                        </tw.BookBtnWrap>
                                                    ) : (
                                                        <tw.BookBtnWrap>
                                                            <tw.BookBtn onClick={() => clickRoom(parseInt(hotelData.id), room.id)}>예약하기</tw.BookBtn>
                                                        </tw.BookBtnWrap>
                                                    )}
                                                </tw.PriceWrap>
                                            </tw.RoomInfo>
                                        </tw.RoomInfoWrap>
                                    </tw.ContentsFlex>
                                </tw.RoomWrap>
                            ))}
                        </tw.RoomList>

                        <tw.ReviewContainer>
                            <tw.FlexWrap>
                                <tw.Label>후기</tw.Label>
                                <tw.MoreReviewBtn onClick={openReviewListModal} disabled={reviewList.length === 0}>
                                    더보기
                                </tw.MoreReviewBtn>
                            </tw.FlexWrap>
                            <tw.ReviewList>
                                {reviewList.length === 0 ? (
                                    <tw.NoReview>리뷰가 없습니다.</tw.NoReview>
                                ) : (
                                    reviewList.slice(0, 3).map((review) => (
                                        <tw.ReviewWrap key={review.check_in}>
                                            <tw.Date>{dayjs(review.check_in).format("YYYY년 MM월 DD일")}</tw.Date>
                                            <tw.TextWrap>
                                                <tw.Review
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 6,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    <tw.Rating>{review.rating}</tw.Rating>
                                                    {review.review}
                                                </tw.Review>
                                            </tw.TextWrap>
                                            <tw.Name>{getInitialAndLastChar(review.name)}</tw.Name>
                                        </tw.ReviewWrap>
                                    ))
                                )}
                            </tw.ReviewList>
                        </tw.ReviewContainer>
                    </tw.ContentsWrap>
                )}
            </tw.MainContainer>

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message="로그인이 필요합니다." onClose={closeAlertModal} />
                </ModalPortal>
            )}

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

            {isReviewListModalOpen && (
                <ModalPortal>
                    <ReviewListModal reviewList={reviewList} onClose={closeReviewListModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
