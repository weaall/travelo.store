import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImgLoader from "../../../utils/imgLoader";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { msgDateFormat } from "../../../utils/msg.utils";
import { encrypt } from "../../../utils/cryptoJs";
import { getThumbnailCFUrl } from "../../../utils/s3UrlToCFD.utils";

import * as tw from "./MyChatList.styles";

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
}

export default function MyChatListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [msgList, setMsgList] = useState<MsgList[]>([]);
    const [hotelDataCache, setHotelDataCache] = useState<{ [hotelId: number]: HotelData }>({});

    const fetchMsg = useCallback(async () => {
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

                    if (!hotelData) {
                        const hotelResponse = await axiosInstance.get("/hotel/" + msg.hotel_id);
                        hotelData = hotelResponse.data.data[0];
                        setHotelDataCache((prevCache) => ({
                            ...prevCache,
                            [msg.hotel_id]: hotelData,
                        }));
                    }

                    msg.hotelData = hotelData;
                } catch (error) {
                    handleAxiosError(error, navigate);
                }
            }
            setMsgList(msgList);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false)
        }
    }, [navigate, hotelDataCache]);

    const clickChat = (hotelId: number) => {
        const encryptedId = encrypt(`${hotelId}`);
        navigate(`../chat/${encryptedId}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMsg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>메세지</tw.Title>
                </tw.TitleWrap>
                {loading ? (
                    <tw.ContentsWrap>
                        <tw.ChatWrapLoading />
                        <tw.ChatWrapLoading />
                        <tw.ChatWrapLoading />
                        <tw.ChatWrapLoading />
                    </tw.ContentsWrap>
                ) : (
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
                                        <ImgLoader imageUrl={getThumbnailCFUrl(`/hotel_img/${msg.hotel_id}`)} altText="" rounded="full" />
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
                )}
            </tw.MobileWrap>
        </tw.Container>
    );
}
