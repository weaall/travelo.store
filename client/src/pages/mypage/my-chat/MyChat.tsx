import { useCallback, useEffect, useRef, useState } from "react";
import * as tw from "./MyChat.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import ImgLoader from "../../../utils/imgLoader";
import { msgDateFormat } from "../../../utils/msg.utils";

interface MsgList {
    hotel_id: number;
    user_id: number;
    text: string;
    created_at: string;
    by_user: number;
}

interface HotelData {
    name: string;
    img: Image;
}

interface Image {
    url: string;
}

export default function MyChatPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [msgList, setMsgList] = useState<MsgList[]>([]);
    const [hotelData, setHotelData] = useState<HotelData>();
    const id = 29;

    const fetchChat = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/msg/chat/" + id,
            });

            const response = await axiosInstance.request(config);
            setMsgList(response.data.data);
            await fetchHotel(); 
            await fetchHotelImg();  
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

    const fetchHotel = async () => {
        try {
            const response = await axiosInstance.get("/hotel/" + id);
            setHotelData(response.data.data[0]);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    const fetchHotelImg = async () => {
        try {
            const response = await axiosInstance.get("/hotel/img/" + id);
            setHotelData(prevData => ({
                name: prevData?.name || '',
                img: response.data.data[0]
            }));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    const AutoResizeTextarea = () => {
        const textarea = useRef<HTMLTextAreaElement>(null);

        const handleResizeHeight = useCallback(() => {
            if (textarea.current) {
                textarea.current.style.height = "auto";
                textarea.current.style.height = `${textarea.current.scrollHeight}px`;
            }
        }, []);

        return (
            <div className="relative max-w-full">
                <tw.AddTextField ref={textarea} onInput={handleResizeHeight} rows={1} ></tw.AddTextField>
                <div className="absolute bottom-1.5 end-3 z-10">
                    <button
                        type="button"
                        className="mt-1.5 py-1.5 px-3 inline-flex flex-shrink-0 justify-center items-center rounded-xl bg-main hover:bg-main/[0.8]"
                    >
                        <img className="w-6" alt="" src={require("../../../assets/svg/send_btn.svg").default}/>
                    </button>
                </div>
            </div>
        );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.ContentsWrap>
                    <tw.MsgWrap>
                        <tw.ListWrap>
                            {msgList.map((msg) => (
                                <tw.ChatWrap key={msg.created_at} $byUser={msg.by_user}>
                                    <tw.Pic>
                                        {hotelData?.img?.url ? (
                                            <ImgLoader imageUrl={hotelData.img.url} altText="" rounded="full" />
                                        ) : (
                                            <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                        )}
                                    </tw.Pic>
                                    <tw.MsgInfoWrap>
                                        <tw.Name $byUser={msg.by_user}>{hotelData?.name}</tw.Name>
                                        <tw.TextWrap $byUser={msg.by_user}>
                                            <tw.Text>{msg.text}</tw.Text>
                                        </tw.TextWrap>
                                    </tw.MsgInfoWrap>
                                    <tw.TimeWrap>
                                        <tw.Time>{msgDateFormat(msg.created_at)}</tw.Time>
                                    </tw.TimeWrap>
                                </tw.ChatWrap>
                            ))}
                        </tw.ListWrap>
                        <tw.AddTextWrap>
                            <AutoResizeTextarea />
                        </tw.AddTextWrap>
                    </tw.MsgWrap>
                </tw.ContentsWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
