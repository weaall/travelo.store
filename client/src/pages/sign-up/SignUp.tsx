import { useEffect, useState } from "react"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { checkValidEmail, checkValidPassword, checkValidPhoneNumber, checkValidUserName } from "../../utils/regExp.utils"
import { ModalPortal } from "../../hook/modal/ModalPortal"
import { useNavigate } from "react-router-dom"
import * as tw from "./SignUp.styles"
import Terms from "../../hook/modal/Terms/Terms.modal"

export default function SignUp() {
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
        name: "",
        phone_num: "",
    })

    const [formValid, setFormValid] = useState({
        isEmail: false,
        isPassword: false,
        isUserName: false,
        isPhoneNumber: false,
    })

    const [termsValid, setTermsValid] = useState(false)

    const isFormValid = () => {
        return formValid.isEmail && formValid.isPassword && formValid.isUserName && formValid.isPhoneNumber && termsValid
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
        const sanitizedValue = name === "phone_num" ? value.replace(/[^0-9]/g, "") : value
        setFormData({ ...formData, [name]: sanitizedValue })
    }

    const onClickSignUp = async () => {
        try {
            const response = await axiosInstance.post("/auth/sign-up", formData)
            if (response.status === 201) {
                window.alert("성공적으로 가입되었습니다.")
            } else {
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("이미 존재하는 이메일입니다.")
                } else {
                    window.alert("알수없는 오류")
                }
            }
        }
    }

    useEffect(() => {}, [])

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsLabel>
                    Create
                    <br />
                    Account
                </tw.ContentsLabel>

                <tw.UpperTag>Your Email</tw.UpperTag>
                <tw.FlexWrap>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                        value={formData.email}
                        name="email"
                        maxLength={30}
                    />
                    <tw.VerifyBtn>Verify</tw.VerifyBtn>
                </tw.FlexWrap>
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

                <tw.UpperTag>Your Name</tw.UpperTag>
                <tw.Input
                    onChange={onChangeInput}
                    onInput={(e) => handleInput(e, checkValidUserName, "isUserName")}
                    value={formData.name}
                    name="name"
                    maxLength={8}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isUserName}>
                    {formData.name === "" ? "" : formValid.isUserName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                </tw.UnderTag>

                <tw.UpperTag>Your Phone Number</tw.UpperTag>
                <tw.Input
                    onChange={onChangeInput}
                    onKeyUp={(e) => handleInput(e, checkValidPhoneNumber, "isPhoneNumber")}
                    value={formData.phone_num}
                    name="phone_num"
                    maxLength={11}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isPhoneNumber}>
                    {formData.phone_num === "" ? "" : formValid.isPhoneNumber === false ? "올바른 전화번호를 입력해주세요." : "올바른 전화번호입니다."}
                </tw.UnderTag>

                <tw.FlexWrap>
                    <tw.CheckBox checked={termsValid} onChange={() => setTermsValid((prevTermsValid) => !prevTermsValid)} type="checkbox" />
                    <tw.CheckLabel>
                        I agree to the
                        <tw.Terms onClick={openModal}> Terms & Conditions </tw.Terms>
                        and
                        <tw.Terms onClick={openModal}> Privacy Policy</tw.Terms>
                    </tw.CheckLabel>
                </tw.FlexWrap>

                <tw.RegBtn onClick={onClickSignUp} $validator={isFormValid()} disabled={!isFormValid()}>
                    Create account
                </tw.RegBtn>
            </tw.ContentsWrap>

            {isModalOpen && (
                <ModalPortal>
                    <Terms onClose={closeModal} />
                </ModalPortal>
            )}
        </tw.Container>
    )
}
