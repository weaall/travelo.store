import { useEffect, useState } from "react"
import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { HotelDataInInfo } from "../../../interface/interfaces"

import * as tw from "./HotelInfo.styles"

export default function HotelInfo({ hotelId }: { hotelId: string | undefined }) {
    const navigate = useNavigate()

    const [hotelData, setHotelData] = useState<HotelDataInInfo>()

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/info/" + hotelId,
            })

            const response = await axiosInstance.request(config)
            setHotelData(response.data.data[0])
            console.log(response.data.data)
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

    return <tw.Container>
        
    </tw.Container>
}
