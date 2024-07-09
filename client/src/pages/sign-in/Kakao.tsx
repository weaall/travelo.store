import * as tw from "./SignIn.styles"

export default function KaKao() {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
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
