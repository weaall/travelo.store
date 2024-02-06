import * as tw from "./SignIn.styles"

export default function KaKao() {
    const REST_API_KEY = "b517102fd48b9146ce57e06961774d4d"
    const REDIRECT_URI = "http://localhost:3000/auth/kakao"
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const loginHandler = () => {
        window.location.href = link
    }

    return (
        <tw.SocialButton onClick={loginHandler}>
            <tw.SocialSVG alt="" src={require("../../assets/svg/btn_kakao.svg").default}></tw.SocialSVG>
        </tw.SocialButton>
    )
}
