import { useEffect, useState } from "react"
import { axios, axiosInstance } from "../../utils/axios.utils"
import KaKao from "./Kakao"
import Naver from "./Naver"
import { ModalPortal } from "../../hook/modal/ModalPortal"
import LoginModal from "../../hook/modal/ModalLayout"
import { useNavigate } from "react-router-dom"
import { checkValidEmail, checkValidPassword } from "../../utils/regExp.utils"
import Cookies from "js-cookie"
import * as tw from "./SignIn.styles"
import { useSetRecoilState } from "recoil"
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"

export default function SignIn() {
    const navigate = useNavigate()
    const setHeaderRender = useSetRecoilState(HeaderRenderAtom);
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
            window.alert("올바른 접근이 아닙니다.")
            navigate("/main")
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
        return formValid.isEmail && formValid.isPassword
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
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    window.alert("요청 시간이 초과되었습니다. 다시 시도해주세요.");
                } else if (error.response && error.response.status === 401) {
                    window.alert("이메일과 패스워드를 확인해주세요.");
                } else if (error.response && error.response.status === 503) {
                    window.alert("서버가 일시적으로 사용 불가능합니다. 잠시 후 다시 시도해주세요.");
                } else {
                    window.alert("알 수 없는 오류");
                }
            } else {
                window.alert("서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.");
            }
        }
    };

    useEffect(() => {
        checkSignInState();
    }, []);

    return (
        <tw.Container>
            <tw.BannerWrap>
                <tw.BannerLabel>weaall dev</tw.BannerLabel>
            </tw.BannerWrap>

            <tw.ContentsWrap>

                <tw.InputWrap>
                <tw.UpperTag>Your Email</tw.UpperTag>
                <tw.Input
                    onChange={onChangeInput}
                    onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                    value={formData.email}
                    name="email"
                    maxLength={30}
                />

                <tw.UnderTag draggable="true" $validator={formValid.isEmail}>
                    {formData.email === "" ? "" : formValid.isEmail === false ? "example@gmail.com 형식으로 입력해 주세요." : "올바른 이메일입니다."}
                </tw.UnderTag>

                <tw.UpperTag>Password</tw.UpperTag>
                <tw.Input
                    type="password"
                    onChange={onChangeInput}
                    onInput={(e) => handleInput(e, checkValidPassword, "isPassword")}
                    value={formData.password}
                    name="password"
                    maxLength={20}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isPassword}>
                    {formData.password === ""
                        ? ""
                        : formValid.isPassword === false
                        ? "영문,숫자,특수문자를 포함한 8자리 이상을 입력해 주세요. "
                        : "올바른 비밀번호입니다."}
                </tw.UnderTag>

                </tw.InputWrap>

                <tw.SignInBtn onClick={onClickSignIn} $validator={isFormValid()} disabled={!isFormValid()}>
                    Sign in
                </tw.SignInBtn>
                <tw.PwLabel onClick={() => navigate("/signup")}>Forgot your password?</tw.PwLabel>

                <tw.SocialWrap>
                    <tw.SocialLabel>Or sign in with</tw.SocialLabel>

                    <tw.SocialButtonWrap>
                        <KaKao />
                        <Naver />
                    </tw.SocialButtonWrap>
                </tw.SocialWrap>
            </tw.ContentsWrap>

            {isModalOpen && (
                <ModalPortal>
                    <LoginModal onClose={closeModal} />
                </ModalPortal>
            )}
        </tw.Container>
    )
}
