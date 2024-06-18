import { Route, Routes } from "react-router-dom";
import Drawer from "../../components/drawer/Drawer";
import * as tw from "./Mypage.styles";

import MyInfoPage from "./myinfo/MyInfoPage";
import BookingPage from "./booking/Booking";

export default function MyPage() {
    return (
        <tw.Container>
            <tw.FlexWrap>
                <Drawer />
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="" element={<MyInfoPage />} />
                        <Route path="/booking" element={<BookingPage />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.FlexWrap>
        </tw.Container>
    );
}
