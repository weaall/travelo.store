import { useEffect, useState } from "react"
import * as tw from "./HotelMe.styles"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { HotelDataProps } from "../../interface/interfaces"

export default function HotelMe() {
    const navigate = useNavigate()

    const [hotelInfo, setHotelInfo] = useState<HotelDataProps[]>([])

    const fetchUser = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/me",
            })

            const response = await axiosInstance.request(config)
            setHotelInfo(response.data.data)
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
        fetchUser()
    }, [])

    return (
        <tw.Container>
            <tw.HotelList>
                {hotelInfo.map((hotel, index) => (
                    <tw.HotelWrap key={index}  onClick={() => navigate("/hotel/mgmt", { state: hotel.id })}>
                        <tw.HotelName>{hotel.name}</tw.HotelName>
                        <tw.HotelText>우편번호: {hotel.postcode}</tw.HotelText>
                        <tw.HotelText>주소: {hotel.address}</tw.HotelText>
                        <tw.HotelText>상세주소: {hotel.address_detail}</tw.HotelText>
                        <tw.HotelText>상태: {hotel.permission === 0 ? "심사중" : "사용중"}</tw.HotelText>
                    </tw.HotelWrap>
                ))}
            </tw.HotelList>
        </tw.Container>
    )
}
