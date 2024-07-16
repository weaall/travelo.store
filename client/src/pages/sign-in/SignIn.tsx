import { useEffect, useState } from "react"
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils"
import KaKao from "./Kakao"
import Naver from "./Naver"
import { useNavigate } from "react-router-dom"
import { checkValidEmail, checkValidPassword } from "../../utils/regExp.utils"
import Cookies from "js-cookie"
import * as tw from "./SignIn.styles"
import { useSetRecoilState } from "recoil"
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"

export default function SignIn() {
    const navigate = useNavigate()
    const setHeaderRender = useSetRecoilState(HeaderRenderAtom);

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
            window.alert("올바른 접근이 아닙니다.")
            navigate("/")
        } else {
        }
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [formValid, setFormValid] = useState({
        isEmail: false,
        isPassword: false,
    })

    const isFormValid = () => {
        return formValid.isEmail && formValid.isPassword && formData.email.length !==0 && formData.password.length !==0
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>, validationFunction: (value: string) => boolean, validationKey: string) => {
        const { value } = (e as React.ChangeEvent<HTMLInputElement>).target
        setFormValid({
            ...formValid,
            [validationKey]: validationFunction(value),
        })
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const headerRender = () => {
        setHeaderRender((prevCount) => prevCount + 1);
      };

      const onClickSignIn = async () => {
        try {
            const response = await axiosInstance.post("/auth/sign-in", formData);
            const receivedToken = response.data.data;
            if (response.status === 201) {
                Cookies.set("jwt", receivedToken, { expires: 1 });
                window.alert("성공적으로 로그인되었습니다.");
                headerRender();
                navigate("/");
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    useEffect(() => {
        checkSignInState();
        setFormValid({
            isEmail: true,
            isPassword: true,
        })
    }, []);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsLabel>
                    Travel.io
                </tw.ContentsLabel>

                <tw.InputWrap>
                    <tw.UpperTag $validator={formValid.isEmail}>이메일 주소</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                        value={formData.email}
                        name="email"
                        placeholder="예) travel@travel.co.kr"
                        maxLength={30}
                        $validator={formValid.isEmail}
                    />

                    <tw.UnderTag draggable="true" $validator={formValid.isEmail}>
                        {formData.email === "" ? "" : formValid.isEmail === false ? "이메일 주소를 정확히 입력해주세요." : ""}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isPassword}>비밀번호</tw.UpperTag>
                    <tw.Input
                        type="password"
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidPassword, "isPassword")}
                        value={formData.password}
                        name="password"
                        maxLength={16}
                        $validator={formValid.isPassword}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isPassword}>
                        {formData.password === "" ? "" : formValid.isPassword === false ? "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)" : ""}
                    </tw.UnderTag>
                </tw.InputWrap>

                <tw.SignInBtn onClick={onClickSignIn} $validator={isFormValid()} disabled={!isFormValid()}>
                    로그인
                </tw.SignInBtn>

                <tw.SignUpWrap>
                    <tw.SignUpBtn onClick={()=>navigate("/signup")}>이메일 가입</tw.SignUpBtn>
                    <tw.SignUpCenter>
                        <tw.SignUpBtn>이메일 찾기</tw.SignUpBtn>
                    </tw.SignUpCenter>
                    <tw.SignUpBtn>비밀번호 찾기</tw.SignUpBtn>
                </tw.SignUpWrap>

                <tw.SocialWrap>
                    <tw.SocialButtonWrap>
                        <KaKao />
                        <Naver />
                    </tw.SocialButtonWrap>
                </tw.SocialWrap>
            </tw.ContentsWrap>
        </tw.Container>
    );
}
