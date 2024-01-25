import KaKao from "./Kakao"
import Naver from "./Naver"
import * as tw from "./SignIn.styles"

export default function SignIn() {
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

                <tw.RegBtn>Sign in</tw.RegBtn>
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
