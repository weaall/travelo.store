import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import ImgLoader from "../../../utils/imgLoader";
import { encrypt } from "../../../utils/cryptoJs";
import { getThumbnailCFUrl } from "../../../utils/s3UrlToCFD.utils";

import Loading from "../../../components/loading/Loading";

import * as tw from "./MyHotel.styles";

export default function MyHotelPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [hotelList, setHotelList] = useState([
        {
            id: 0,
            name: "",
            address: "",
            address_detail: "",
            postcode: "",
            check_in: "",
            check_out: "",
            tel_num: "",
            permission: 0,
        },
    ]);

    const fetchHotelList = useCallback(async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/me",
            });
    
            const response = await axiosInstance.request(config);
            const hotels = response.data.data;
            setHotelList(hotels);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    }, [navigate]);
    
    useEffect(() => {
        fetchHotelList();
    }, [fetchHotelList]);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>숙소관리</tw.Title>
                </tw.TitleWrap>
                <tw.HotelList>
                    {hotelList.length === 0 ? (
                        <tw.NoHotelWrap>
                            <tw.NoHotelText>등록된 숙소가 없어요!</tw.NoHotelText>
                            <tw.AddHotelBtn onClick={() => navigate("/me/hotelreg")}>숙소추가하기</tw.AddHotelBtn>
                        </tw.NoHotelWrap>
                    ) : (
                        hotelList.map((hotel, index) => (
                            <tw.BookingWrap key={index}>
                                <tw.UpperWrap>
                                    <tw.HotelName>{hotel.name}</tw.HotelName>
                                    <tw.HotelStatus $color={hotel.permission === 0}>{hotel.permission === 0 ? "심사중" : "판매중"}</tw.HotelStatus>
                                </tw.UpperWrap>
                                <tw.MiddleWrap>
                                    <tw.Pic>
                                        <ImgLoader imageUrl={getThumbnailCFUrl(`/hotel_img/${hotel.id}`)} altText={hotel.name} rounded="" />
                                    </tw.Pic>
                                    <tw.HotelInfoWrap>
                                        <tw.HotelAddress>
                                            {hotel.address} {hotel.address_detail}, {hotel.postcode}
                                        </tw.HotelAddress>
                                        <tw.HotelTel>연락처 - {hotel.tel_num}</tw.HotelTel>
                                        <tw.CheckWrap>
                                            <tw.CheckInWrap>
                                                <tw.CheckLabel>체크인</tw.CheckLabel>
                                                <tw.CheckText>{hotel.check_in === null ? "미등록" : hotel.check_in}</tw.CheckText>
                                            </tw.CheckInWrap>
                                            <tw.CheckOutWrap>
                                                <tw.CheckLabel>체크아웃</tw.CheckLabel>
                                                <tw.CheckText>{hotel.check_out === null ? "미등록" : hotel.check_out}</tw.CheckText>
                                            </tw.CheckOutWrap>
                                        </tw.CheckWrap>
                                    </tw.HotelInfoWrap>
                                </tw.MiddleWrap>
                                <tw.MgmtBtnWrap>
                                    <tw.MgmtBtn onClick={() => navigate("/hotel/mgmt/" + encrypt(hotel.id.toString()))}>숙소 관리하기</tw.MgmtBtn>
                                </tw.MgmtBtnWrap>
                            </tw.BookingWrap>
                        ))
                    )}
                </tw.HotelList>
            </tw.MobileWrap>
        </tw.Container>
    );
}
