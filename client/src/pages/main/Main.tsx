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
                                <tw.ContentsFlex>
                                <tw.AddressSVG
                                            alt=""
                                            src={require("../../assets/svg/location_icon.svg").default}
                                        ></tw.AddressSVG>
                                    <tw.HotelAddress>
                                        {hotel.address} {hotel.address_detail}
                                    </tw.HotelAddress>
                                </tw.ContentsFlex>
                                <tw.HotelP>서비스</tw.HotelP>
                                <tw.HotelServWrap>
                                    {hotel.wifi === 1 && <tw.HotelComp>Wifi</tw.HotelComp>}
                                    {hotel.always_check_in === 1 && <tw.HotelComp>24시 체크인</tw.HotelComp>}
                                    {hotel.breakfast === 1 && <tw.HotelComp>조식 제공</tw.HotelComp>}
                                    {hotel.barbecue === 1 && <tw.HotelComp>바베큐 시설</tw.HotelComp>}
                                </tw.HotelServWrap>
                                <tw.HotelP>편의시설</tw.HotelP>
                                <tw.HotelFacilWrap>
                                    {hotel.carpark === 1 && <tw.HotelComp>주차장</tw.HotelComp>}
                                    {hotel.restaurnat === 1 && <tw.HotelComp>레스토랑</tw.HotelComp>}
                                    {hotel.cafe === 1 && <tw.HotelComp>카페</tw.HotelComp>}
                                    {hotel.swimming_pool === 1 && <tw.HotelComp>수영장</tw.HotelComp>}
                                    {hotel.spa === 1 && <tw.HotelComp>스파</tw.HotelComp>}
                                    {hotel.fitness === 1 && <tw.HotelComp>피트니스</tw.HotelComp>}
                                    {hotel.convenience_store === 1 && <tw.HotelComp>편의점</tw.HotelComp>}
                                </tw.HotelFacilWrap>
                            </tw.HotelInfo>
                        </tw.HotelWrap>
                    ))}
                </tw.HotelList>
            </tw.MainContainer>
        </tw.Container>
    );
}
