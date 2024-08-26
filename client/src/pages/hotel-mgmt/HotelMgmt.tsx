import { useEffect, useState } from "react"
import { sendJWT } from "../../utils/jwtUtils"
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils"
import { Routes, Route, useParams,  useNavigate, useLocation } from "react-router-dom"
import { HotelDataProps } from "../../interface/interfaces"
import * as tw from "./HotelMgmt.styles"

import HotelInfo from "./hotel-info/HotelInfo"
import HotelRoom from "./hotel-room/HotelRoom"
import PriceCalendar from "./hotel-calendar/PriceCalendar"
import HotelMsgPage from "./hotel-msg/HotelMsg"
import HotelChatPage from "./hotel-chat/HotelChat"
import MgmtSideBar from "./mgmt-sidebar/MgmtSideBar"
import { decrypt, encrypt } from "../../utils/cryptoJs"
import dayjs from "dayjs"

export default function HotelMgmt() {
    const navigate = useNavigate();
    const { encryptedId } = useParams();
    const hotelId = decrypt(encryptedId || "");

    const [hotelData, setHotelData] = useState<HotelDataProps>();

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/info/" + hotelId,
            });

            const response = await axiosInstance.request(config);
            setHotelData(response.data.data[0]);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const clickState = (hotelId: string) => {
        const encryptedId = encrypt(`${hotelId}`);
        const today = dayjs().format('YYYY-MM-DD');
        const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
        navigate(`/hotel/${encryptedId}/${today}/${tomorrow}/${2}/${0}`);
    };

    useEffect(() => {
        fetchHotel();
    }, [hotelId]);

    return (
        <tw.Container>
            <tw.HotelStateWrap onClick={()=>clickState(hotelId)}>
                    <tw.HotelName>{hotelData?.name}</tw.HotelName>
                    <tw.HotelAddress>{hotelData?.address} {hotelData?.address_detail} ({hotelData?.postcode})</tw.HotelAddress>
                    <tw.HotelStatus $color={hotelData?.permission === 0}>{hotelData?.permission === 0 ? "심사중" : "활성화"}</tw.HotelStatus>
            </tw.HotelStateWrap>
            <tw.FlexWrap>
                <tw.DrawerWrap>
                    <MgmtSideBar hotel_id={encryptedId}/>
                </tw.DrawerWrap>
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="" element={<HotelInfo hotel_id={hotelId} />} />
                        <Route path="/room" element={<HotelRoom hotel_id={hotelId} />} />
                        <Route path="/cal" element={<PriceCalendar hotel_id={hotelId} />}>
                            <Route path=":room_id/*" element={<HotelMgmt />} />
                        </Route>
                        <Route path="/msg" element={<HotelMsgPage hotelId={encryptedId} />} />\
                        <Route path="/msg/chat/:encryptedHotelId/:encryptedUserId" element={<HotelChatPage />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.FlexWrap>
        </tw.Container>
    );
}
