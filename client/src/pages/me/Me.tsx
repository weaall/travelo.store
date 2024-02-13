import { useEffect, useState } from "react"
import * as tw from "./Me.styles"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { userDataProps } from "../../interface/interfaces"

export default function Me() {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState<userDataProps>({
        id: 0,
        email: "",
        name: "",
        phone_num: "",
        social: "",
    })

    const fetchUser = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/user/me",
            })

            const response = await axiosInstance.request(config)
            setUserInfo(response.data.data)
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
