import { useEffect, useState } from "react";
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { checkValidEmail, checkValidMobile, checkValidPassword, checkValidUserName } from "../../utils/regExp.utils";
import { ModalPortal } from "../../hook/modal/ModalPortal";
import { useNavigate } from "react-router-dom";
import * as tw from "./SignUp.styles";
import Terms from "../../hook/modal/Terms/Terms.modal";
import AlertModal from "../../hook/modal/alert/Alert.modal";

export default function SignUp() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [onCloseCallback, setOnCloseCallback] = useState<() => void>(() => {});
    const openAlertModal = (callback: () => void) => {
        setOnCloseCallback(() => callback);
        setIsAlertModalOpen(true);
    };
    
    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        onCloseCallback();
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        mobile: "",
    });

    const [formValid, setFormValid] = useState({
        isEmail: false,
        isPassword: false,
        isConfirmPassword: false,
        isUserName: false,
        isMobile: false,
    });

    const [emailValid, setEmailValid] = useState(false);
    const [termsValid, setTermsValid] = useState(false);

    const isFormValid = () => {
        return (
            formValid.isEmail &&
            formValid.isPassword &&
            formValid.isConfirmPassword &&
            formValid.isUserName &&
            formValid.isMobile &&
            termsValid &&
            emailValid &&
            formData.email.length !== 0 &&
            formData.password.length !== 0 &&
            formData.confirmPassword.length !== 0 &&
            formData.name.length !== 0 &&
            formData.mobile.length !== 0
        );
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, validationFunction: (value: string) => boolean, validationKey: string) => {
        const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
        setFormValid({
            ...formValid,
            [validationKey]: validationFunction(value),
        });
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "mobile" ? value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : value;
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const onClickSignUp = async () => {
        try {
            const response = await axiosInstance.post("/auth/sign-up", formData);
            if (response.status === 201) {
                setAlertMessage("성공적으로 가입되었습니다.")
                const handleModalClose = () => {
                    navigate("/signin");
                };
                openAlertModal(handleModalClose);
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const checkEmail = async () => {
        try {
            const response = await axiosInstance.get("/user/email/" + formData.email);
            if (response.data.data === 0) {
                setAlertMessage("사용이 가능한 이메일 입니다.")
                const handleModalClose = () => {
                    setEmailValid(true);
                };
                openAlertModal(handleModalClose);
            } else {
                setAlertMessage("이미 가입된 이메일입니다.")
                const handleModalClose = () => {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        email: "", 
                    }));
                };
                openAlertModal(handleModalClose);
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const onClickEmailCheck = () => {
        if (emailValid === true) {
            setEmailValid(false);
        } else {
            checkEmail();
        }
    };

    useEffect(() => {
        setFormValid({
            isEmail: true,
            isPassword: true,
            isConfirmPassword: true,
            isUserName: true,
            isMobile: true,
        });
    }, []);

    return (
        <tw.Container>
            <tw.ContentsWrap>

                <tw.UpperTag $validator={formValid.isEmail}>이메일 주소</tw.UpperTag>
                <tw.FlexWrap>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                        value={formData.email}
                        name="email"
                        placeholder="예) travel@travel.co.kr"
                        maxLength={30}
                        $validator={formValid.isEmail}
                        disabled={emailValid && formData.email.length !== 0}
                    />
                    <tw.VerifyBtn
                        onClick={() => onClickEmailCheck()}
                        $validator={formValid.isEmail && formData.email.length !== 0}
                        disabled={!formValid.isEmail && formData.email.length !== 0}
                    >
                        {emailValid ? "수정하기" : "중복확인"}
                    </tw.VerifyBtn>
                </tw.FlexWrap>
                <tw.UnderTag draggable="true" $validator={formValid.isEmail}>
                    {formData.email === "" ? "" : formValid.isEmail === false ? "travel@travel.co.kr 형식으로 입력해 주세요." : "올바른 이메일입니다."}
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
                    {formData.password === ""
                        ? ""
                        : formValid.isPassword === false
                        ? "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)"
                        : "올바른 비밀번호입니다."}
                </tw.UnderTag>

                <tw.UpperTag $validator={formValid.isConfirmPassword}>비밀번호 확인</tw.UpperTag>
                <tw.Input
                    type="password"
                    onChange={onChangeInput}
                    onInput={(e) => handleInput(e, (value) => value === formData.password, "isConfirmPassword")}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    maxLength={16}
                    $validator={formValid.isConfirmPassword}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isConfirmPassword}>
                    {formData.confirmPassword === "" ? "" : formValid.isConfirmPassword === false ? "비밀번호가 일치하지 않습니다." : "비밀번호가 일치합니다."}
                </tw.UnderTag>

                <tw.UpperTag $validator={formValid.isUserName}>이름</tw.UpperTag>
                <tw.Input
                    onChange={onChangeInput}
                    onInput={(e) => handleInput(e, checkValidUserName, "isUserName")}
                    value={formData.name}
                    name="name"
                    maxLength={8}
                    $validator={formValid.isUserName}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isUserName}>
                    {formData.name === "" ? "" : formValid.isUserName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                </tw.UnderTag>

                <tw.UpperTag $validator={formValid.isMobile}>전화번호</tw.UpperTag>
                <tw.Input
                    onChange={onChangeInput}
                    onKeyUp={(e) => handleInput(e, checkValidMobile, "isMobile")}
                    value={formData.mobile}
                    name="mobile"
                    maxLength={13}
                    $validator={formValid.isMobile}
                />
                <tw.UnderTag draggable="true" $validator={formValid.isMobile}>
                    {formData.mobile === "" ? "" : formValid.isMobile === false ? "올바른 전화번호를 입력해주세요." : "올바른 전화번호입니다."}
                </tw.UnderTag>

                <tw.FlexWrap>
                    <tw.CheckBox checked={termsValid} onChange={() => setTermsValid((prevTermsValid) => !prevTermsValid)} type="checkbox" />
                    <tw.CheckLabel>
                        <tw.Terms onClick={openModal}> 개인정보 처리방침</tw.Terms>
                        에 따라 본인의 개인 정보를 사용하고 수집하는 것에 동의합니다.
                    </tw.CheckLabel>
                </tw.FlexWrap>

                <tw.RegBtn onClick={onClickSignUp} $validator={isFormValid()} disabled={!isFormValid()}>
                    가입하기
                </tw.RegBtn>
            </tw.ContentsWrap>

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}

            {isModalOpen && (
                <ModalPortal>
                    <Terms onClose={closeModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
