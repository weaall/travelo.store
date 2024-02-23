import { useEffect, useState } from "react"
import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { HotelDataInInfo } from "../../../interface/interfaces"

import * as tw from "./HotelInfo.styles"

export default function HotelInfo({ hotelId }: { hotelId: string | undefined }) {
    const navigate = useNavigate()

    const [hotelData, setHotelData] = useState<HotelDataInInfo>()

    const [servData, setServData] = useState({
        wifi: hotelData?.wifi === 1,
        always_check_in: hotelData?.always_check_in === 1,
        breakfast: hotelData?.breakfast === 1,
        breakfast_price: hotelData?.breakfast_price,
        barbecue: hotelData?.barbecue === 1,
    })

    const handleWifiChange = () => {
        setServData((prevData) => ({
          ...prevData,
          wifi: !prevData.wifi,
        }));
      };

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/info/" + hotelId,
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
            <tw.ContentsWrap>
                <tw.Title>숙소정보</tw.Title>
                <tw.Label>체크인</tw.Label>
                <select value={hotelData?.check_in}>
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                <tw.Label>체크아웃</tw.Label>
                <select value={hotelData?.check_out}>
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                <tw.Label>설명</tw.Label>
                <tw.Text>{hotelData?.description}</tw.Text>
            </tw.ContentsWrap>
            <tw.ContentsWrap>
                <tw.Title>숙소서비스</tw.Title>
                <tw.ContentsFlex>
                    <tw.ContentsHalf>
                        <tw.Label>와이파이</tw.Label>
                        <tw.CheckBox type="checkbox" checked={servData?.wifi} onChange={handleWifiChange}></tw.CheckBox>
                        <tw.Label>조식</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>조식가격</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                    </tw.ContentsHalf>
                    <tw.ContentsHalf>
                        <tw.Label>24시 체크인</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>바베큐</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                    </tw.ContentsHalf>
                </tw.ContentsFlex>
            </tw.ContentsWrap>
            <tw.ContentsWrap>
                <tw.Title>편의시설</tw.Title>
                <tw.ContentsFlex>
                    <tw.ContentsHalf>
                        <tw.Label>주차장</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>식당</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>카페</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>편의점</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                    </tw.ContentsHalf>
                    <tw.ContentsHalf>
                        <tw.Label>수영장</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>스파</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                        <tw.Label>헬스장</tw.Label>
                        <tw.CheckBox type="checkbox"></tw.CheckBox>
                    </tw.ContentsHalf>
                </tw.ContentsFlex>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
