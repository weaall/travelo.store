import { Route, Routes } from "react-router-dom";
import MySideBar from "./my-sidebar/MySideBar";
import * as tw from "./Mypage.styles";

import MyInfoPage from "./my-info/MyInfoPage";
import MyBookingPage from "./my-booking/MyBooking";
import MyReviewPage from "./my-review/MyReview";
import MyMsgPage from "./my-msg/MyMsg";

import HotelRegPage from "./hotel-reg/HotelRegPage";
import MyHotelPage from "./my-hotel/MyHotelPage";
import MyChatPage from "./my-chat/MyChat";
import { MyBookingMgmtPage } from "./my-booking-mgmt/MyBookingMgmt";

export default function MyPage() {
    return (
        <tw.Container>
            <tw.FlexWrap>
                <tw.DrawerWrap>
                    <MySideBar />
                </tw.DrawerWrap>
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="" element={<MyInfoPage />} />
                        <Route path="/booking" element={<MyBookingPage />} />
                        <Route path="/booking/:id" element={<MyBookingMgmtPage />} />
                        <Route path="/review" element={<MyReviewPage />} />
                        <Route path="/message" element={<MyMsgPage />} />

                        <Route path="/hotelreg" element={<HotelRegPage />} />
                        <Route path="/hotel" element={<MyHotelPage />} />

                        <Route path="/chat/:encryptedId" element={<MyChatPage />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.FlexWrap>
        </tw.Container>
    );
}
