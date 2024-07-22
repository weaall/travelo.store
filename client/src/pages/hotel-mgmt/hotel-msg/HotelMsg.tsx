import { useEffect, useState } from "react";
import * as tw from "./HotelMsg.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { msgDateFormat } from "../../../utils/msg.utils";
import { encrypt } from "../../../utils/cryptoJs";

interface MsgList {
    hotel_id: number;
    user_id: number;
    text: string;
    created_at: string;
    checked: number;
    by_user: number;
    userData: UserData;
}

interface UserData {
    name: string;
}

export default function HotelMsgPage({ hotel_id }: { hotel_id: string | undefined }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [msgList, setMsgList] = useState<MsgList[]>([]);
    const [userDataCache, setUserDataCache] = useState<{ [userId: number]: UserData }>({});

    const fetchMsg = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/msg/hotel/"+ hotel_id,
            });

            const response = await axiosInstance.request(config);
            const msgList = response.data.data;

            for (let msg of msgList) {
                try {
                    let userData = userDataCache[msg.user_id];

                    if (!userData) {
                        const userResponse = await axiosInstance.get("/user/name/" + msg.user_id);
                        userData = userResponse.data.data[0];
                        setUserDataCache((prevCache) => ({
                            ...prevCache,
                            [msg.user_id]: userData,
                        }));
                    }

                    msg.userData = userData;
                    console.log(msg.userData)
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

    const clickChat = (hotelId : number, userId: number) =>{
        const encryptedHotelId = encrypt(`${hotelId}`);
        const encryptedUserId = encrypt(`${userId}`);
        navigate(`../msg/chat/${encryptedHotelId}/${encryptedUserId}`);
    }

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
                        <tw.MsgWrap key={msg.created_at} onClick={()=>clickChat(msg.hotel_id,msg.user_id)}>
                            <tw.PicWrap>
                                <tw.Pic>
                                    <tw.Svg alt="" src={require("../../../assets/svg/user_icon.svg").default} />
                                </tw.Pic>
                            </tw.PicWrap>
                            <tw.MsgInfoWrap>
                                <tw.UpperWrap>
                                    <tw.Name>{msg.userData?.name ==  null ? "미정": msg.userData?.name}</tw.Name>
                                    <tw.Time>{msgDateFormat(msg.created_at)}</tw.Time>
                                </tw.UpperWrap>
                                <tw.LowerWrap>
                                    <tw.Text>{msg.text}</tw.Text>
                                    <tw.Checked $checked={msg.checked === 0 && msg.by_user === 1} />
                                </tw.LowerWrap>
                            </tw.MsgInfoWrap>
                        </tw.MsgWrap>
                    )))}
                </tw.ContentsWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
