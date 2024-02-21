import { Routes, Route, BrowserRouter } from "react-router-dom"

import * as tw from "./App.styles"

import Header from "./components/header/Header"
import Main from "./pages/main/Main"
import SignIn from "./pages/sign-in/SignIn"
import AuthKaKao from "./pages/auth/Auth.kakao"
import SignUp from "./pages/sign-up/SignUp"
import Me from "./pages/me/Me"
import HotelReg from "./pages/hotel-reg/HotelReg"
import HotelMe from "./pages/hotel-me/HotelMe"
import HotelMgmt from "./pages/hotel-mgmt/HotelMgmt"

function App() {
    return (
        <BrowserRouter>
            <tw.Container className="App">
                <tw.ContentsWrap>
                    <Header />
                    <Routes>
                        <Route path="/main" element={<Main />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/me" element={<Me />} />
                        <Route path="/hotelreg" element={<HotelReg />} />
                        <Route path="/hotel/me" element={<HotelMe />} />
                        <Route path="/hotel/mgmt" element={<HotelMgmt />} />
                        <Route path="/auth/kakao" element={<AuthKaKao />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.Container>
        </BrowserRouter>
    )
}

export default App
