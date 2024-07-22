import { useEffect, useState } from "react";
import * as tw from "./MyMsg.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import ImgLoader from "../../../utils/imgLoader";
import { msgDateFormat } from "../../../utils/msg.utils";
import { encrypt } from "../../../utils/cryptoJs";

interface MsgList {
    hotel_id: number;
    user_id: number;
    text: string;
    created_at: string;
    checked: number;
    by_user: number;
    hotelData: HotelData;
}

interface HotelData {
    name: string;
    img: Image[];
}

interface Image {
    url: string;
}

export default function MyMsgPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [msgList, setMsgList] = useState<MsgList[]>([]);
    const [hotelDataCache, setHotelDataCache] = useState<{ [hotelId: number]: HotelData }>({});
    const [imageDataCache, setImageDataCache] = useState<{ [hotelId: number]: Image[] }>({});

    const fetchMsg = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/msg/me",
            });

            const response = await axiosInstance.request(config);
            const msgList = response.data.data;

            for (let msg of msgList) {
                try {
                    let hotelData = hotelDataCache[msg.hotel_id];
                    let hotelImg = imageDataCache[msg.hotel_id];

                    if (!hotelData) {
                        const hotelResponse = await axiosInstance.get("/hotel/" + msg.hotel_id);
                        hotelData = hotelResponse.data.data[0];
                        setHotelDataCache((prevCache) => ({
                            ...prevCache,
                            [msg.hotel_id]: hotelData,
                        }));
                    }

                    if (!hotelImg) {
                        const hotelImgResponse = await axiosInstance.get(`/hotel/img/${msg.hotel_id}`);
                        hotelImg = hotelImgResponse.data.data;
                        setImageDataCache((prevCache) => ({
                            ...prevCache,
                            [msg.hotel_id]: hotelImg,
                        }));
                    }

                    msg.hotelData = hotelData;
                    msg.hotelData.img = hotelImg;
                } catch (error) {
                    handleAxiosError(error, navigate);
                }
            }
            setMsgList(msgList);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    const clickChat = (hotelId: number) => {
        const encryptedId = encrypt(`${hotelId}`);
        navigate(`../chat/${encryptedId}`);
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
                    {msgList.length === 0 ? (
                        <tw.NoMsgWrap>
                            <tw.NoMsgText>메세지가 없어요!</tw.NoMsgText>
                        </tw.NoMsgWrap>
                    ) : (
                        msgList.map((msg) => (
                            <tw.MsgWrap key={msg.created_at} onClick={() => clickChat(msg.hotel_id)}>
                                <tw.PicWrap>
                                    <tw.Pic>
                                        {msg.hotelData?.img?.[0]?.url ? (
                                            <ImgLoader imageUrl={msg.hotelData.img[0].url} altText="" rounded="full" />
                                        ) : (
                                            <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                        )}
                                    </tw.Pic>
                                </tw.PicWrap>
                                <tw.MsgInfoWrap>
                                    <tw.UpperWrap>
                                        <tw.Name>{msg.hotelData.name}</tw.Name>
                                        <tw.Time>{msgDateFormat(msg.created_at)}</tw.Time>
                                    </tw.UpperWrap>
                                    <tw.LowerWrap>
                                        <tw.Text>{msg.text}</tw.Text>
                                        <tw.Checked $checked={msg.checked === 0 && msg.by_user === 0} />
                                    </tw.LowerWrap>
                                </tw.MsgInfoWrap>
                            </tw.MsgWrap>
                        ))
                    )}
                </tw.ContentsWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
