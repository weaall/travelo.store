import { useEffect, useState } from "react";
import * as tw from "./MyMsg.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";

export default function MyMsgPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [msgList, setMsgList] = useState([
        {
            hotel_id: 0,
            user_id: "",
            text: "",
            created_at: "",
            checked: 0,
            by_user: 0,
        },
    ]);
    const fetchMsg = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/msg/me",
            });

            const response = await axiosInstance.request(config);
            setMsgList(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMsg();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>메세지</tw.Title>
                </tw.TitleWrap>
                <tw.ContentsWrap>
                    {msgList.map((msg)=>(
                        <tw.MsgWrap>{msg.text}</tw.MsgWrap>
                    ))}
                </tw.ContentsWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
