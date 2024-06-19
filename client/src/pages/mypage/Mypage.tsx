import { Route, Routes } from "react-router-dom";
import Drawer from "./sidebar/SideBar";
import * as tw from "./Mypage.styles";

import MyInfoPage from "./my-info/MyInfoPage";
import BookingPage from "./booking/Booking";
import HotelRegPage from "./hotel-reg/HotelRegPage";
import MyHotelPage from "./my-hotel/MyHotelPage";

export default function MyPage() {
    return (
        <tw.Container>
            <tw.FlexWrap>
                <tw.DrawerWrap>
                    <Drawer />
                </tw.DrawerWrap>
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="" element={<MyInfoPage />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/hotelreg" element={<HotelRegPage />} />
                        <Route path="/hotel" element={<MyHotelPage />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.FlexWrap>
        </tw.Container>
    );
}
