import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { checkValidMobile, checkValidUserName } from "../../../utils/regExp.utils";

import { ModalPortal } from "../../../hook/modal/ModalPortal";
import AlertModal from "../../../hook/modal/alert/Alert.modal";
import ConfirmModal from "../../../hook/modal/alert-confirm/Confirm.modal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";

import * as tw from "./MyInfoPage.styles";

export default function MyInfoPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

    const [alertMessage, setAlertMessage] = useState("");

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

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [onCloseConfirmCallback, setOnCloseConfirmCallback] = useState<(result: boolean) => void>(() => {});

    const openConfirmModal = (message: string, callback: (result: boolean) => void) => {
        setAlertMessage(message);
        setOnCloseConfirmCallback(() => callback);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = (result: boolean) => {
        setIsConfirmModalOpen(false);
        onCloseConfirmCallback(result);
    };

    const [inputState, setInputState] = useState(false);

    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        mobile: "",
        social: "",
    });
    const [initialUserInfo, setInitialUserInfo] = useState({
        email: "",
        name: "",
        mobile: "",
        social: "",
    });

    const [formValid, setFormValid] = useState({
        isName: false,
        isMobile: false,
    });

    const isFormValid = () => {
        return formValid.isName && formValid.isMobile;
    };

    const fetchUser = useCallback(async () => {
        openLoadingModal();
        try {
            const config = await sendJWT({
                method: "get",
                url: "/user/me",
            });

            const response = await axiosInstance.request(config);
            const userData = response.data.data[0];
            setUserInfo(userData);
            setInitialUserInfo(userData);

            setFormValid({
                isName: true,
                isMobile: true,
            });
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    }, [navigate]);

    const updateMyInfo = async () => {
        openLoadingModal();
        try {
            const config = await sendJWT({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "put",
                url: "/user/updateMe",
                data: userInfo,
            });
            await axiosInstance.request(config);

            setInitialUserInfo(userInfo);
            
            setAlertMessage("수정되었습니다.");
            const handleModalClose = () => {
                setInputState(false);
            };
            openAlertModal(handleModalClose);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, validationFunction: (value: string) => boolean, validationKey: string) => {
        const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
        setFormValid({
            ...formValid,
            [validationKey]: validationFunction(value),
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "mobile" ? value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : value;
        setUserInfo({
            ...userInfo,
            [name]: sanitizedValue,
        });
    };

    const onClickChangeBtn = () => {
        if (!inputState) {
            setInputState(true);
        } else {
            if (JSON.stringify(userInfo) !== JSON.stringify(initialUserInfo)) {
                openConfirmModal("변경 사항을 저장하시겠습니까?", (result) => {
                    if (result) {
                        updateMyInfo();
                    }
                });
            } else {
                setInputState(false);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>내정보</tw.Title>
                    <tw.Social $color={userInfo.social}>{userInfo.social}</tw.Social>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.UpperTagNone>이메일</tw.UpperTagNone>
                    <tw.Input
                        name="email"
                        value={userInfo.email}
                        $state={false}
                        disabled={true}
                    />
                    <tw.UnderTagNone />

                    <tw.UpperTag>이름</tw.UpperTag>
                    <tw.Input
                        name="name"
                        onInput={(e) => handleInput(e, checkValidUserName, "isName")}
                        value={userInfo.name}
                        onChange={handleChange}
                        maxLength={8}
                        $state={inputState}
                        disabled={!inputState}
                    />
                    <tw.UnderTag draggable="true" $state={inputState} $validator={formValid.isName}>
                        {userInfo.name === "" ? "" : formValid.isName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>전화번호</tw.UpperTag>
                    <tw.Input
                        name="mobile"
                        onInput={(e) => handleInput(e, checkValidMobile, "isMobile")}
                        maxLength={13}
                        value={userInfo.mobile}
                        onChange={handleChange}
                        $state={inputState}
                        disabled={!inputState}
                    />
                    <tw.UnderTag draggable="true" $state={inputState} $validator={formValid.isMobile}>
                        {userInfo.mobile === "" ? "" : formValid.isMobile === false ? "올바른 전화번호를 입력해주세요." : "올바른 전화번호입니다."}
                    </tw.UnderTag>
                </tw.InputWrap>
                <tw.MgmtBtnWrap>
                    <tw.MgmtBtn onClick={onClickChangeBtn} $validator={isFormValid()} disabled={!isFormValid()}>
                        {inputState ? "수정완료" : "수정하기"}
                    </tw.MgmtBtn>
                </tw.MgmtBtnWrap>
            </tw.MobileWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}

            {isConfirmModalOpen && (
                <ModalPortal>
                    <ConfirmModal message={alertMessage} onClose={closeConfirmModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
