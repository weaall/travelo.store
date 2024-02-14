import { useEffect, useState } from "react"
import * as tw from "./HotelReg.styles"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { RegHotelProps } from "../../interface/interfaces"

export default function HotelReg() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<RegHotelProps>({
        user_id: 0,
        name: "",
        region_id: 0,
        address: "",
        address_detail: "",
        postcode: 0,
        reg_num: 0,
        bank: "",
        account: 0,
        account_owner: "",
    })

    const onClickRegister = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/hotel/register",
                data: formData
            })

            const response = await axiosInstance.request(config)
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
    }, [])
    return (
        <tw.Container>
            <tw.InputWrap>
                <tw.UpperTag>Email</tw.UpperTag>
                <tw.Input />
                <tw.UpperTag>Name</tw.UpperTag>
                <tw.Input />
                <tw.UpperTag></tw.UpperTag>
                <tw.Input />
                <tw.UpperTag></tw.UpperTag>
                <tw.Input />
                <tw.UpperTag></tw.UpperTag>
                <tw.Input />
                <tw.UpperTag></tw.UpperTag>
                <tw.Input />
            </tw.InputWrap>
        </tw.Container>
    )
}
