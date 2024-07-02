import { useEffect, useState } from "react";
import * as tw from "./MyMsg.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";

export default function MyMsgPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [bookingData, setBookingData] = useState([
        {
            hotel_id: 0,
        },
    ]);
    const fetchBooking = async () => {
        try {
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
        fetchBooking();
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
                </tw.ContentsWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
