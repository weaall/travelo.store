import { useEffect, useState } from "react"
import * as tw from "./MyInfoPage.styles"
import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { userDataProps } from "../../../interface/interfaces"
import Loading from "../../../components/loading/Loading"

export default function MyInfoPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [userInfo, setUserInfo] = useState<userDataProps>({
        id: 0,
        email: "",
        name: "",
        phone_num: "",
        social: "",
    });

    const fetchUser = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/user/me",
            });

            const response = await axiosInstance.request(config);
            setUserInfo(response.data.data[0]);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                } else {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
                <tw.MobileWrap>
                    <tw.TitleWrap>
                        <tw.Title>내정보</tw.Title>
                        <tw.Social $color={userInfo.social}>{userInfo.social}</tw.Social>
                    </tw.TitleWrap>
                    <tw.InputWrap>
                        <tw.UpperTag>이름</tw.UpperTag>
                        <tw.Input />
                        <tw.UpperTag>이메일</tw.UpperTag>
                        <tw.Input />
                        <tw.UpperTag>전화번호</tw.UpperTag>
                        <tw.Input />
                    </tw.InputWrap>
                </tw.MobileWrap>
        </tw.Container>
    );
}
