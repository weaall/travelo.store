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
                } else {
                    window.alert("올바른 접근이 아닙니다.")
                    navigate("/")
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
                    <tw.HotelWrap key={index}>
                        <h3>{hotel.name}</h3>
                        <p>주소: {hotel.address}</p>
                        <p>상세주소: {hotel.address_detail}</p>
                        <p>우편번호: {hotel.postcode}</p>
                        <p>사업자등록번호: {hotel.reg_num}</p>
                        <p>은행: {hotel.bank}</p>
                        <p>계좌번호: {hotel.account}</p>
                        <p>소유자: {hotel.owner}</p>
                        상태: {hotel.per === 0 ? "심사중" : "사용중"}
                    </tw.HotelWrap>
                ))}
            </tw.HotelList>
        </tw.Container>
    )
}
