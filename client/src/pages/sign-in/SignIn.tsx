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

export default function SignIn() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
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

    const onClickSignIn = async () => {
        try {
            const response = await axiosInstance.post("/auth/sign-in", formData)
            const receivedToken = response.data.data
            if (response.status === 201) {
                Cookies.set("jwt", receivedToken, { expires: 6 })
                window.alert("성공적으로 로그인되었습니다.")
                navigate("/main")
            }
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("이메일과 패스워드를 확인해주세요.")
                } else {
                    window.alert("알수없는 오류")
                }
            }
        }
    }

    useEffect(() => {}, [])

    return (
        <tw.Container>
            <tw.BannerWrap>
                <tw.BannerLabel>Weaall</tw.BannerLabel>
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
