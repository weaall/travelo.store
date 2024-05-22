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
import Search from "./pages/search/Search"
import SearchResult from "./pages/search-reuslt/SearchResult"

import "@fontsource/noto-sans-kr";
import Hotel from "./pages/hotel/Hotel"

function App() {
    return (
        <BrowserRouter>
            <tw.Container className="App">
                <Header />
                <tw.ContentsWrap>
                    <Routes>
                        <Route path="/main" element={<Main />} />
                        <Route path="/" element={<Search />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/hotel/:encryptedId" element={<Hotel/>}/>
                        <Route path="/hotelreg" element={<HotelReg />} />
                        <Route path="/hotel/me" element={<HotelMe />} />
                        <Route path="/hotel/mgmt/">
                            <Route path=":hotelId/*" element={<HotelMgmt />} />
                        </Route>
                        <Route path="/auth/kakao" element={<AuthKaKao />} />
                        <Route path="/search/:searchValue/:startDate/:endDate/:adult/:child" element={<SearchResult />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.Container>
        </BrowserRouter>
    )
}

export default App
