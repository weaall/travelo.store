import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../utils/axios.utils";
import Cookies from "js-cookie";

import * as styled from "./Auth.styles";
import { useSetRecoilState } from "recoil";
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";

function AuthNaver() {
    const navigate = useNavigate();

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

            getNaverUserData(token);
        } catch (error) {
            console.error(error);
            window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    const getNaverUserData = async (token: string) => {
        try {
            const response = await axiosInstance.post("/auth/naver", { token });
            const receivedToken = response.data.data
            if (response.status === 201) {
                Cookies.set("jwt", receivedToken, { expires: 1 })
                window.alert("성공적으로 로그인되었습니다.")
                headerRender();
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <styled.Container>
            <styled.LoadingSvg alt="" src={require("../../assets/svg/loading.svg").default}></styled.LoadingSvg>
        </styled.Container>
    );
}

export default AuthNaver;
