import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { useSetRecoilState } from "recoil";
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";

import * as tw from "./Auth.styles";
import { ModalPortal } from "../../hook/modal/ModalPortal";
import AlertModal from "../../hook/modal/alert/Alert.modal";

export default function AuthKaKao() {
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

    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");

    const getToken = async () => {
        try {
            const grant_type = "authorization_code";
            const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
            const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
            const AUTHORIZE_CODE = code;

            const res = await axios.post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                },
            );

            const token = res.data.access_token;

            await getKaKaoUserData(token);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const getKaKaoUserData = async (token: string) => {
        try {
            const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = kakaoUser.data;
            await postUserInfo(userData);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const postUserInfo = async (data: string) => {
        try {
            const response = await axiosInstance.post("/auth/kakao", data);
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
