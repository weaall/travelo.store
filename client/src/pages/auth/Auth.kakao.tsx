import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { axiosInstance } from "../../utils/axios.utils"
import Cookies from "js-cookie"

import * as styled from "./Auth.styles"
import { useSetRecoilState } from "recoil"
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"

function AuthKaKao() {
    const navigate = useNavigate()

    const setHeaderRender = useSetRecoilState(HeaderRenderAtom);

    const headerRender = () => {
        setHeaderRender((prevCount) => prevCount + 1);
      };

    const params = new URL(document.location.toString()).searchParams
    const code = params.get("code")

    const getToken = async () => {
        try {
            const grant_type = "authorization_code"
            const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
            const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
            const AUTHORIZE_CODE = code

            const res = await axios.post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                },
            )

            const token = res.data.access_token

            getKaKaoUserData(token)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 500) {
                    window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
                }
            }
        }
    }

    const getKaKaoUserData = async (token: string) => {
        try {
            const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const userData = kakaoUser.data
            postUserInfo(userData)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    window.alert("아이디와 비밀번호를 확인해주세요")
                } else if (error.response && error.response.status === 500) {
                    window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
                } else {
                }
            }
        }
    }

    const postUserInfo = async (data: string) => {
        try {
            const response = await axiosInstance.post("/auth/kakao", data)
            const receivedToken = response.data.data
            if (response.status === 201) {
                Cookies.set("jwt", receivedToken, { expires: 1 })
                window.alert("성공적으로 로그인되었습니다.")
                headerRender();
                navigate("/main")
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                window.alert("올바른 접근이 아닙니다.")
            }
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <styled.Container>
            <styled.LoadingSvg alt="" src={require("../../assets/svg/loading.svg").default}></styled.LoadingSvg>
        </styled.Container>
    )
}

export default AuthKaKao
