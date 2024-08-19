import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { useSetRecoilState } from "recoil";
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";

import * as tw from "./Auth.styles";
import AlertModal from "../../hook/modal/alert/Alert.modal";
import { ModalPortal } from "../../hook/modal/ModalPortal";

export default function AuthNaver() {
    const navigate = useNavigate();

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

    const setHeaderRender = useSetRecoilState(HeaderRenderAtom);

    const headerRender = () => {
        setHeaderRender((prevCount) => prevCount + 1);
    };

    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    const getToken = async () => {
        try {
            const response = await axiosInstance.post("/auth/naver/callback", { code, state });

            const token = response.data.access_token;

            await getNaverUserData(token);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const getNaverUserData = async (token: string) => {
        try {
            const response = await axiosInstance.post("/auth/naver", { token });
            const receivedToken = response.data.data;
            if (response.status === 201) {
                Cookies.set("jwt", receivedToken, { expires: 1 });
                const handleModalClose = () => {
                    headerRender();
                    navigate("/");
                };

                openAlertModal(handleModalClose);
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <tw.Container>
            <tw.LoadingSvg alt="" src={require("../../assets/svg/loading.svg").default}></tw.LoadingSvg>

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message="성공적으로 로그인되었습니다." onClose={closeAlertModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
