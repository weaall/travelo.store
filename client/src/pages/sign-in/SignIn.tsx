import { useEffect, useState } from "react"
import { axios, axiosInstance } from "../../utils/axios.utils"
import KaKao from "./Kakao"
import Naver from "./Naver"
import * as tw from "./SignIn.styles"

export default function SignIn() {
    const [tables, setTables] = useState()

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/")
            setTables(response.data)
            console.log(response.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                window.alert("올바른 접근이 아닙니다.")
            }
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    return (
        <tw.Container>
            <tw.BannerWrap>
                <tw.BannerLabel>Weaall</tw.BannerLabel>
            </tw.BannerWrap>

            <tw.ContentsBg />
            <tw.ContentsWrap>

                <tw.ContentsLabel>Welcome Back</tw.ContentsLabel>
                <tw.ContentsText>Enter your details below</tw.ContentsText>
                <tw.Input></tw.Input>
                <tw.Input></tw.Input>

                <tw.RegBtn onClick={()=>fetchData()}>Sign in</tw.RegBtn>
                <tw.PwLabel>Forgot your password?</tw.PwLabel>

                <tw.SocialWrap>
                    <tw.SocialLabel>Or sign in with</tw.SocialLabel>

                    <tw.SocialButtonWrap>
                        <KaKao />
                        <Naver />
                    </tw.SocialButtonWrap>
                    
                </tw.SocialWrap>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
