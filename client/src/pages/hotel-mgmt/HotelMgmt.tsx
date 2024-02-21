import { useEffect, useState } from "react"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { useNavigate, useLocation } from "react-router-dom"
import { HotelDataProps } from "../../interface/interfaces"
import * as tw from "./HotelMgmt.styles"

export default function HotelMgmt() {
    const navigate = useNavigate()
    const state = useLocation().state
    const hotelId = state

    const [hotelInfo, setHotelInfo] = useState<HotelDataProps>()

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/" + hotelId,
            })

            const response = await axiosInstance.request(config)
            setHotelInfo(response.data.data[0])
            console.log(hotelInfo)
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
    }, [])

    return (
        <tw.Container>
            <tw.HotelStateWrap>
                <tw.UpperWrap>
                    <tw.HotelName>{hotelInfo?.name}</tw.HotelName>
                    <tw.HotelText>{hotelInfo?.permission === 0 ? "심사중" : "활성화"}</tw.HotelText>
                </tw.UpperWrap>
                <tw.LowerWrap>
                    <tw.HotelText>{hotelInfo?.postcode}</tw.HotelText>
                    <tw.HotelText>{hotelInfo?.address}</tw.HotelText>
                    <tw.HotelText>{hotelInfo?.address_detail}</tw.HotelText>
                </tw.LowerWrap>
            </tw.HotelStateWrap>
            <tw.NavWrap>
                <tw.NavBtn>숙소정보</tw.NavBtn>
                <tw.NavBtn>객실관리</tw.NavBtn>
                <tw.NavBtn>가격설정</tw.NavBtn>
                <tw.NavBtn>메세지</tw.NavBtn>
            </tw.NavWrap>
        </tw.Container>
    )
}
