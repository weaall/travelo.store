import { useEffect, useState } from "react"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance, handleAxiosError } from "../../utils/axios.utils"
import { Routes, Route, useParams,  useNavigate, useLocation } from "react-router-dom"
import { HotelDataProps } from "../../interface/interfaces"
import * as tw from "./HotelMgmt.styles"

import HotelInfo from "./hotel-info/HotelInfo"
import HotelRoom from "./hotel-room/HotelRoom"
import PriceCalendar from "./hotel-calendar/PriceCalendar"
import HotelMsgPage from "./hotel-msg/HotelMsg"
import HotelChatPage from "./hotel-chat/HotelChat"
import MgmtSideBar from "./mgmt-sidebar/MgmtSideBar"

export default function HotelMgmt() {
    const navigate = useNavigate();
    const { hotelId } = useParams();

    const [hotelData, setHotelData] = useState<HotelDataProps>();

    const fetchHotel = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/hotel/mgmt/" + hotelId,
            });

            const response = await axiosInstance.request(config);
            setHotelData(response.data.data[0]);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    useEffect(() => {
        fetchHotel();
    }, []);

    return (
        <tw.Container>
            <tw.HotelStateWrap>
                    <tw.HotelName>{hotelData?.name}</tw.HotelName>
                    <tw.HotelAddress>{hotelData?.address} {hotelData?.address_detail} ({hotelData?.postcode})</tw.HotelAddress>
                    <tw.HotelStatus $color={hotelData?.permission === 0}>{hotelData?.permission === 0 ? "심사중" : "활성화"}</tw.HotelStatus>
            </tw.HotelStateWrap>
            <tw.FlexWrap>
                <tw.DrawerWrap>
                    <MgmtSideBar hotel_id={hotelId}/>
                </tw.DrawerWrap>
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="" element={<HotelInfo hotel_id={hotelId} />} />
                        <Route path="/room" element={<HotelRoom hotel_id={hotelId} />} />
                        <Route path="/cal" element={<PriceCalendar hotel_id={hotelId} />}>
                            <Route path=":room_id/*" element={<HotelMgmt />} />
                        </Route>
                        <Route path="/msg" element={<HotelMsgPage hotel_id={hotelId} />} />\
                        <Route path="/msg/chat/:encryptedHotelId/:encryptedUserId" element={<HotelChatPage />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.FlexWrap>
        </tw.Container>
    );
}
