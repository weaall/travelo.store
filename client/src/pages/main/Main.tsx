import { useNavigate } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";


import * as tw from "./Main.styles"

export default function Main() {
    const navigate = useNavigate();

    const [hotelList, setHotelList] = useState([{
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
        swimming_pool:0, 
        spa: 0,
        fitness: 0,
        convenience_store: 0,

    }])
    
    const fetchHotel = async () => {
        try {
            const response = await axiosInstance .get("/hotel");
            setHotelList(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    useEffect(()=>{
        fetchHotel();
    })


    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SelectContainer>
                    <tw.SelectContainerCell1>
                        <tw.SelectRegion>🔍</tw.SelectRegion>
                    </tw.SelectContainerCell1>
                    <tw.SelectContainerCell2>
                        <tw.SelectStartDate>📅</tw.SelectStartDate>
                        <tw.SelectEndDate>📅</tw.SelectEndDate>
                    </tw.SelectContainerCell2>
                </tw.SelectContainer>

                <tw.SortContainer>
                    <tw.SortBtn>정렬</tw.SortBtn>
                    <tw.FilterBtn>필터</tw.FilterBtn>
                </tw.SortContainer>

                <tw.HotelList>
                    {hotelList.map((hotel) => (
                        <tw.HotelWrap key={hotel.hotel_id}>
                            <tw.HotelPic></tw.HotelPic>
                            <tw.HotelInfo>
                                <tw.HotelName>{hotel.name}</tw.HotelName>
                                <tw.HotelAddress>
                                    {hotel.address} {hotel.address_detail}
                                </tw.HotelAddress>
                                <tw.HotelText>서비스</tw.HotelText>
                                <tw.HotelServWrap>
                                    {hotel.wifi === 1 && <tw.HotelText>Wifi</tw.HotelText>}
                                    {hotel.always_check_in === 1 && <tw.HotelText>24시 체크인</tw.HotelText>}
                                    {hotel.breakfast === 1 && <tw.HotelText>조식 제공</tw.HotelText>}
                                    {hotel.barbecue === 1 && <tw.HotelText>바베큐 시설</tw.HotelText>}
                                </tw.HotelServWrap>
                                <tw.HotelText>편의시설</tw.HotelText>
                                <tw.HotelFacilWrap>
                                    {hotel.carpark === 1 && <tw.HotelText>주차장</tw.HotelText>}
                                    {hotel.restaurnat === 1 && <tw.HotelText>레스토랑</tw.HotelText>}
                                    {hotel.cafe === 1 && <tw.HotelText>카페</tw.HotelText>}
                                    {hotel.swimming_pool === 1 && <tw.HotelText>수영장</tw.HotelText>}
                                    {hotel.spa === 1 && <tw.HotelText>스파</tw.HotelText>}
                                    {hotel.fitness === 1 && <tw.HotelText>피트니스</tw.HotelText>}
                                    {hotel.convenience_store === 1 && <tw.HotelText>편의점</tw.HotelText>}
                                </tw.HotelFacilWrap>
                            </tw.HotelInfo>
                        </tw.HotelWrap>
                    ))}
                </tw.HotelList>
            </tw.MainContainer>
        </tw.Container>
    );
}
