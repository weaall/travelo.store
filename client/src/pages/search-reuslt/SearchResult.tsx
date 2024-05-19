import { useNavigate, useParams } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./SearchResultstyles";
import Loading from "../../components/loading/Loading";
import { facilItems, servItems } from "../../data/hotelData";

export default function SearchResult() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { searchValue, startDate, endDate, adult, child } = useParams();

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

            room_price: [
                {
                    room_id: 0,
                    date: "",
                    price: 0,
                    room_current: 0,
                    room_limit: 0,
                },
            ],

            hotel_img: [
                {
                    url: "",
                },
            ],
        },
    ]);

    const fetchSearch = async () => {
        try {
            const response = await axiosInstance.get("/search", {
                params: {
                    searchValue: encodeURIComponent(`${searchValue}`),
                    startDate: startDate,
                    endDate: endDate,
                    adult: adult,
                    child: child,
                },
            });
            setHotelList(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearch();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SortContainer>
                    <tw.SortBtn>정렬</tw.SortBtn>
                    <tw.FilterBtn>필터</tw.FilterBtn>
                </tw.SortContainer>

                <tw.HotelList>
                    {hotelList.map((hotel) => (
                        <tw.HotelWrap key={hotel.hotel_id}>
                            <tw.ContentsFlex>
                                <tw.HotelPic></tw.HotelPic>
                                <tw.HotelInfoWrap>
                                    <tw.HotelInfo>
                                        <tw.HotelName>{hotel.name}</tw.HotelName>
                                        <tw.ContentsFlex>
                                            <tw.AddressSVG
                                                alt=""
                                                src={require("../../assets/svg/location_icon.svg").default}
                                            ></tw.AddressSVG>
                                            <tw.HotelAddress>
                                                {hotel.address} {hotel.address_detail}
                                            </tw.HotelAddress>
                                        </tw.ContentsFlex>

                                        <tw.HotelServWrap>
                                            <tw.HotelP>서비스</tw.HotelP>
                                            <tw.HotelServList>
                                                {servItems.map((item) =>
                                                    (hotel as any)[item.comp] === 1 ? (
                                                        <tw.HotelComp key={item.comp}>{item.label}</tw.HotelComp>
                                                    ) : null,
                                                )}
                                            </tw.HotelServList>
                                        </tw.HotelServWrap>

                                        <tw.HotelFacilWrap>
                                            <tw.HotelP>편의시설</tw.HotelP>
                                            <tw.HotelFacilList>
                                                {facilItems.map((item) =>
                                                    (hotel as any)[item.comp] === 1 ? (
                                                        <tw.HotelComp key={item.comp}>{item.label}</tw.HotelComp>
                                                    ) : null,
                                                )}
                                            </tw.HotelFacilList>
                                        </tw.HotelFacilWrap>

                                        <tw.TooltipServ>
                                            {servItems.map((item) =>
                                                (hotel as any)[item.comp] === 1 ? (
                                                    <tw.ToolTipText key={item.comp}>{item.label}</tw.ToolTipText>
                                                ) : null,
                                            )}
                                        </tw.TooltipServ>
                                        <tw.TooltipFacil>
                                            {facilItems.map((item) =>
                                                (hotel as any)[item.comp] === 1 ? (
                                                    <tw.ToolTipText key={item.comp}>{item.label}</tw.ToolTipText>
                                                ) : null,
                                            )}
                                        </tw.TooltipFacil>

                                        <tw.PriceWrap>
                                            <tw.TotalLabel>{dayjs(endDate).diff(dayjs(startDate), "day")}박 총 요금</tw.TotalLabel>
                                            <tw.TotalPrice>
                                                {hotel.room_price.reduce((total, room) => total + room.price, 0).toLocaleString()}원~
                                            </tw.TotalPrice>
                                        </tw.PriceWrap>

                                    </tw.HotelInfo>
                                </tw.HotelInfoWrap>
                            </tw.ContentsFlex>
                        </tw.HotelWrap>
                    ))}
                </tw.HotelList>
            </tw.MainContainer>
        </tw.Container>
    );
}
