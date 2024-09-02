import { useEffect, useState } from "react"
import { axios, axiosInstance, handleAxiosError } from "../../utils/axios.utils"
import KaKao from "./Kakao"
import Naver from "./Naver"
import { useNavigate } from "react-router-dom"
import { checkValidEmail, checkValidPassword } from "../../utils/regExp.utils"
import Cookies from "js-cookie"
import * as tw from "./SignIn.styles"
import { useSetRecoilState } from "recoil"
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"
import AlertModal from "../../hook/modal/alert/Alert.modal"
import { ModalPortal } from "../../hook/modal/ModalPortal"
import { encryptPass } from "../../utils/cryptoJs"

export default function SignIn() {
    const navigate = useNavigate()
    const setHeaderRender = useSetRecoilState(HeaderRenderAtom);

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

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
            setAlertMessage("올바른 접근이 아닙니다.");
            const handleModalClose = () => {
                navigate("/");
            };

            openAlertModal(handleModalClose);
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
              const encryptedPassword = encryptPass(formData.password);

              const encryptedFormData = {
                  ...formData,
                  password: encryptedPassword,
              };

              const response = await axiosInstance.post("/auth/sign-in", encryptedFormData);

              const receivedToken = response.data.data;
              if (response.status === 201) {
                  Cookies.set("jwt", receivedToken, { expires: 1 });
                  setAlertMessage("성공적으로 로그인되었습니다.");
                  const handleModalClose = () => {
                      headerRender();
                      navigate("/");
                  };
                  openAlertModal(handleModalClose);
              }
          } catch (error) {
              if (axios.isAxiosError(error)) {
                  if (error.response) {
                      const status = error.response.status;
                      if (status === 400) {
                          setAlertMessage("잘못된 요청입니다.");
                          const handleModalClose = () => {
                              navigate("/");
                          };
                          openAlertModal(handleModalClose);
                      } else if (status === 401) {
                          setAlertMessage("이메일과 비밀번호가 일치하지 않습니다.");
                          const handleModalClose = () => {};
                          openAlertModal(handleModalClose);
                      } else if (status >= 500) {
                          setAlertMessage("잘못된 요청입니다.");
                          const handleModalClose = () => {
                              navigate("/");
                          };
                          openAlertModal(handleModalClose);
                      }
                  } else {
                      setAlertMessage("잘못된 요청입니다.");
                      const handleModalClose = () => {
                          navigate("/");
                      };
                      openAlertModal(handleModalClose);
                  }
              }
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
            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
