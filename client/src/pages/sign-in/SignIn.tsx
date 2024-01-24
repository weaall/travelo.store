import KaKao from "./Kakao"
import Naver from "./Naver"
import * as tw from "./SignIn.styles"

export default function SignIn() {
    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.Input></tw.Input>
                <tw.Input></tw.Input>
                <tw.PwLabelWrap>
                    <tw.PwLabel>Forgot Password</tw.PwLabel>
                </tw.PwLabelWrap>
                <tw.RegBtn>Sign in</tw.RegBtn>

                <tw.SocialWrap>
                    <tw.SocialLabel>Or continue with</tw.SocialLabel>

                    <tw.SocialButtonWrap>
                        <KaKao />
                        <Naver />
                        <tw.SocialButton>
                            <tw.SocialSVG alt="" src={require("../../asset/svg/btn_google.svg").default}></tw.SocialSVG>
                        </tw.SocialButton>
                    </tw.SocialButtonWrap>
                </tw.SocialWrap>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
