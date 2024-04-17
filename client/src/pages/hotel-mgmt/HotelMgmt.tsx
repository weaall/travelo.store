import { useEffect, useState } from "react"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { Routes, Route, useParams,  useNavigate, useLocation } from "react-router-dom"
import { HotelDataProps } from "../../interface/interfaces"
import * as tw from "./HotelMgmt.styles"
import HotelInfo from "./hotel-info/HotelInfo"
import HotelRoom from "./hotel-room/HotelRoom"
import HotelPrice from "./hotel-price/HotelPrice"
import Calendar from "./hotel-msg/Calendar"

export default function HotelMgmt() {
    const navigate = useNavigate()
    const { hotelId } = useParams();

    const [hotelData, setHotelData] = useState<HotelDataProps>()

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/" + hotelId,
            })

            const response = await axiosInstance.request(config)
            setHotelData(response.data.data[0])
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.")
                    navigate("/")
                } else if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.")
                    navigate("/main")
                }
            }
        }
    }

    useEffect(() => {
        fetchHotel()
    }, [hotelId])

    return (
        <tw.Container>
            <tw.HotelStateWrap>
                <tw.UpperWrap>
                    <tw.HotelName>{hotelData?.name}</tw.HotelName>
                    <tw.HotelText>{hotelData?.permission === 0 ? "심사중" : "활성화"}</tw.HotelText>
                </tw.UpperWrap>
                <tw.LowerWrap>
                    <tw.HotelText>{hotelData?.postcode}</tw.HotelText>
                    <tw.HotelText>{hotelData?.address}</tw.HotelText>
                    <tw.HotelText>{hotelData?.address_detail}</tw.HotelText>
                </tw.LowerWrap>
            </tw.HotelStateWrap>
            <tw.NavWrap>
                <tw.NavBtn onClick={() => navigate("./")}>숙소정보</tw.NavBtn>
                <tw.NavBtn onClick={() => navigate("./room")}>객실관리</tw.NavBtn>
                <tw.NavBtn onClick={() => navigate("./price")}>가격관리</tw.NavBtn>
                <tw.NavBtn onClick={() => navigate("./msg")}>메세지</tw.NavBtn>
            </tw.NavWrap>
            <tw.ContentsWrap>
                <Routes>
                    <Route path="" element={<HotelInfo hotel_id={hotelId}/>}/>
                    <Route path="/room" element={<HotelRoom hotel_id={hotelId}/>}/>
                    <Route path="/price" element={<HotelPrice hotel_id={hotelId}/>}/>
                    <Route path="/msg" element={<Calendar hotel_id={hotelId}/>}/>
                </Routes>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
