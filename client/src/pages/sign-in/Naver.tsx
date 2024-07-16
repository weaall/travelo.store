import * as tw from "./SignIn.styles"

export default function Naver() {
    
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
    const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI
    const STATE = "false"
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`

    const loginHandler = () => {
        window.location.href = NAVER_AUTH_URL
    }

    return (
        <tw.SocialButton onClick={loginHandler}>
            <tw.SocialSVG alt="" src={require("../../assets/svg/btn_naver.svg").default}></tw.SocialSVG>
            <tw.SocailLabel>네이버 로그인</tw.SocailLabel>
        </tw.SocialButton>
    )
}
