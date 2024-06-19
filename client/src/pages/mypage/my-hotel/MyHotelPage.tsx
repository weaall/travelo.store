import { useEffect, useState } from "react";
import * as tw from "./MyHotel.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import ImgLoader from "../../../utils/imgLoader";
import Loading from "../../../components/loading/Loading";

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
            img: [
                {
                    url: "",
                },
            ],
        },
    ]);

    const fetchHotelList = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/me",
            });

            const response = await axiosInstance.request(config);
            const hotels = response.data.data;

            for (let hotel of hotels) {
                const roomImgResponse = await axiosInstance.get(`/hotel/img/${hotel.id}`);
                hotel.img = roomImgResponse.data.data;
            }

            setHotelList(hotels);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                } else if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotelList();
    }, []);

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
                    {hotelList.map((hotel, index) => (
                        <tw.BookingWrap key={index}>
                            <tw.UpperWrap>
                                <tw.HotelName>{hotel.name}</tw.HotelName>
                                <tw.HotelStatus>{hotel.permission === 0 ? "심사중" : "판매가능"}</tw.HotelStatus>
                            </tw.UpperWrap>
                            <tw.MiddleWrap>
                                <tw.Pic>
                                    {hotel?.img?.[0]?.url ? (
                                        <ImgLoader imageUrl={hotel.img[0].url} altText="" rounded="es-xl" />
                                    ) : (
                                        <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                    )}
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
                                <tw.MgmtBtn onClick={() => navigate("/hotel/mgmt/" + hotel.id)}>숙소 관리하기</tw.MgmtBtn>
                            </tw.MgmtBtnWrap>
                        </tw.BookingWrap>
                    ))}
                </tw.HotelList>
            </tw.MobileWrap>
        </tw.Container>
    );
}
