import { useNavigate } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";

import * as tw from "./SearchResultstyles"
import Loading from "../../components/loading/Loading";

export default function SearchResult() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

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
        },
    ]);

    const servItems = [
        { comp: "wifi", label: "Wifi"},
        { comp: "always_check_in", label: "24시 체크인"},
        { comp: "breakfast", label: "조식"},
        { comp: "barbecue", label: "바베큐"},
    ]

    const facilItems = [
        { comp: "carpark", label: "주차장"},
        { comp: "restaurnat", label: "식당"},
        { comp: "cafe", label: "카페"},
        { comp: "swimming_pool", label: "수영장"},
        { comp: "spa", label: "스파"},
        { comp: "fitness", label: "피트니스"},
        { comp: "convenience_store", label: "편의점"},
    ]

    const fetchSearch = async () => {
        try {
            const response = await axiosInstance.get("/search", {
                params: {
                    searchValue: encodeURIComponent("우리집"),
                    startDate: "2024-05-16",
                    endDate: "2024-05-18",
                    adult: 2,
                    child: 0,
                },
            });

            setHotelList(response.data.data)

            console.log(response.data.data)
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

    useEffect(()=>{
        fetchSearch();
    },[])

    if (loading) {
        return <Loading />
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
                                <tw.HotelInfo>
                                    <tw.HotelName>{hotel.name}</tw.HotelName>
                                    <tw.ContentsFlex>
                                        <tw.AddressSVG alt="" src={require("../../assets/svg/location_icon.svg").default}></tw.AddressSVG>
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
                                </tw.HotelInfo>
                            </tw.ContentsFlex>
                            <tw.HotelRoom></tw.HotelRoom>
                        </tw.HotelWrap>
                    ))}
                </tw.HotelList>
            </tw.MainContainer>
        </tw.Container>
    );
}
