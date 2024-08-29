import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import SearchBox from "../../components/searchBox/SearchBox";

import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { encrypt } from "../../utils/cryptoJs";
import ImgLoader from "../../utils/imgLoader";
import { getThumbnailCFUrl } from "../../utils/s3UrlToCFD.utils";
import { facilItems, servItems } from "../../data/hotelData";

import * as tw from "./SearchResult.styles";

export default function SearchResult() {
    const navigate = useNavigate();
    const { searchValue, checkInDate, checkOutDate, adult, child } = useParams();

    const [loading, setLoading] = useState(true);
    const [sortMethod, setSortMethod] = useState<string>("정확도순");
    const [hotelList, setHotelList] = useState([
        {
            hotel_id: 0,
            name: "",
            address: "",
            address_detail: "",
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
            room_id: 0,
            room_name: "",
            room_num: 0,
            discount: 0,
            rating: 0,
            room_price: [
                {
                    room_id: 0,
                    date: "",
                    price: 0,
                    room_current: 0,
                    room_limit: 0,
                },
            ],
        },
    ]);
    const [visibleHotels, setVisibleHotels] = useState(3);

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchSearch = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/search", {
                params: {
                    searchValue: encodeURIComponent(`${searchValue}`),
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    adult: adult,
                    child: child,
                },
            });
            const hotels = response.data.data;

            for (let hotel of hotels) {
                const ratingResponse = await axiosInstance.get(`/hotel/rating/${hotel.hotel_id}`);
                hotel.rating = ratingResponse.data.data[0].rating;
            }

            setHotelList(hotels);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    }, [navigate, searchValue, checkInDate, checkOutDate, adult, child]);

    const clickHotel = (hotelId: number) => {
        const encryptedId = encrypt(`${hotelId}`);
        navigate(`/hotel/${encryptedId}/${checkInDate}/${checkOutDate}/${adult}/${child}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSearch();
    }, [searchValue, checkInDate, checkOutDate, adult, child, fetchSearch]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting) {
                setVisibleHotels((prev) => prev + 3);
            }
        };

        observer.current = new IntersectionObserver(handleObserver);
        const lastHotelElement = document.querySelector(".last-hotel");
        if (lastHotelElement) observer.current.observe(lastHotelElement);
    }, [loading, visibleHotels]);

    const handleSort = (method: string) => {
        setSortMethod(method);
    };

    const sortedHotelList = [...hotelList].sort((a, b) => {
        if (sortMethod === "정확도순") {
            return 0; // 기본적으로 검색 결과 순서로 유지 (정확도순)
        } else if (sortMethod === "낮은 요금순") {
            return a.room_price.reduce((total, room) => total + room.price, 0) - b.room_price.reduce((total, room) => total + room.price, 0);
        } else if (sortMethod === "높은 요금순") {
            return b.room_price.reduce((total, room) => total + room.price, 0) - a.room_price.reduce((total, room) => total + room.price, 0);
        } else if (sortMethod === "인기순") {
            return 0; // 예시: 리뷰 수 또는 예약 수로 정렬하는 로직 추가 가능
        } else if (sortMethod === "평점순") {
            return b.rating - a.rating;
        }
        return 0;
    });

    const currentHotels = sortedHotelList.slice(0, visibleHotels);

    return (
        <tw.Container>
            <tw.MainContainer>
                <SearchBox
                    defaultSearchValue={searchValue}
                    defaultStartDate={checkInDate}
                    defaultEndDate={checkOutDate}
                    defaultAdult={parseInt(adult || "2")}
                    defaultChild={parseInt(child || "0")}
                />

                <tw.SortWrap>
                    <tw.SortBtn className="rounded-l-2xl" $active={sortMethod === "정확도순"} onClick={() => handleSort("정확도순")}>
                        정확도순
                    </tw.SortBtn>
                    <tw.SortBtn $active={sortMethod === "낮은 요금순"} onClick={() => handleSort("낮은 요금순")}>
                        낮은 요금순
                    </tw.SortBtn>
                    <tw.SortBtn $active={sortMethod === "높은 요금순"} onClick={() => handleSort("높은 요금순")}>
                        높은 요금순
                    </tw.SortBtn>
                    <tw.SortBtn $active={sortMethod === "인기순"} onClick={() => handleSort("인기순")}>
                        인기순
                    </tw.SortBtn>
                    <tw.SortBtn className="rounded-r-2xl" $active={sortMethod === "평점순"} onClick={() => handleSort("평점순")}>
                        평점순
                    </tw.SortBtn>
                </tw.SortWrap>

                {loading ? (
                    <tw.HotelList>
                        <tw.HotelWrapLoading />
                        <tw.HotelWrapLoading />
                        <tw.HotelWrapLoading />
                    </tw.HotelList>
                ) : (
                    <tw.HotelList>
                        {currentHotels.length === 0 ? (
                            <tw.NoHotelWrap>
                                <tw.NoHotelText>검색결과가 없어요!</tw.NoHotelText>
                                <tw.AddHotelBtn onClick={() => navigate("/")}>숙소검색하기</tw.AddHotelBtn>
                            </tw.NoHotelWrap>
                        ) : (
                            currentHotels.map((hotel, index) => (
                                <tw.HotelWrap key={hotel.hotel_id} className={currentHotels.length === index + 1 ? "last-hotel" : ""}>
                                    <tw.HotelPic>
                                        <ImgLoader
                                            imageUrl={getThumbnailCFUrl(`/hotel_img/${hotel.hotel_id}`)}
                                            altText=""
                                            rounded="l-2xl mobile:rounded-none mobile:rounded-t-2xl"
                                        />
                                    </tw.HotelPic>
                                    <tw.HotelInfoWrap onClick={() => clickHotel(hotel.hotel_id)}>
                                        <tw.HotelInfo>
                                            <tw.HotelTitleWrap>
                                                <tw.HotelNameWrap>
                                                    <tw.HotelName>{hotel.name}</tw.HotelName>
                                                    <tw.ContentsFlex>
                                                        <tw.AddressSVG alt="" src={require("../../assets/svg/location_icon.svg").default}></tw.AddressSVG>
                                                        <tw.HotelAddress>
                                                            {hotel.address} {hotel.address_detail}
                                                        </tw.HotelAddress>
                                                    </tw.ContentsFlex>
                                                </tw.HotelNameWrap>
                                                <tw.RatingWrap>
                                                    <tw.RatingLabel>{hotel.rating === null ? "-" : `${hotel.rating}`}</tw.RatingLabel>
                                                </tw.RatingWrap>
                                            </tw.HotelTitleWrap>

                                            <tw.HotelServWrap>
                                                <tw.HotelP>서비스</tw.HotelP>
                                                <tw.HotelServList>
                                                    {servItems.map((item) =>
                                                        (hotel as any)[item.comp] === 1 ? <tw.HotelComp key={item.comp}>{item.label}</tw.HotelComp> : null,
                                                    )}
                                                </tw.HotelServList>
                                            </tw.HotelServWrap>

                                            <tw.HotelFacilWrap>
                                                <tw.HotelP>편의시설</tw.HotelP>
                                                <tw.HotelFacilList>
                                                    {facilItems.map((item) =>
                                                        (hotel as any)[item.comp] === 1 ? <tw.HotelComp key={item.comp}>{item.label}</tw.HotelComp> : null,
                                                    )}
                                                </tw.HotelFacilList>
                                            </tw.HotelFacilWrap>

                                            <tw.TooltipServ>
                                                {servItems.map((item) =>
                                                    (hotel as any)[item.comp] === 1 ? <tw.ToolTipText key={item.comp}>{item.label}</tw.ToolTipText> : null,
                                                )}
                                            </tw.TooltipServ>
                                            <tw.TooltipFacil>
                                                {facilItems.map((item) =>
                                                    (hotel as any)[item.comp] === 1 ? <tw.ToolTipText key={item.comp}>{item.label}</tw.ToolTipText> : null,
                                                )}
                                            </tw.TooltipFacil>

                                            <tw.PriceWrap>
                                                <tw.TotalLabel>{dayjs(checkOutDate).diff(dayjs(checkInDate), "day")}박 총 요금</tw.TotalLabel>
                                                <tw.TotalPrice>
                                                    {hotel.room_price.reduce((total, room) => total + room.price, 0).toLocaleString()}
                                                    원~
                                                </tw.TotalPrice>
                                            </tw.PriceWrap>
                                        </tw.HotelInfo>
                                    </tw.HotelInfoWrap>
                                </tw.HotelWrap>
                            ))
                        )}
                    </tw.HotelList>
                )}
            </tw.MainContainer>
        </tw.Container>
    );
}
