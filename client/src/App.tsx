import { Routes, Route, BrowserRouter } from "react-router-dom"

import * as tw from "./App.styles"

import Header from "./components/header/Header";
import SignIn from "./pages/sign-in/SignIn";
import AuthKaKao from "./pages/auth/Auth.kakao";
import SignUp from "./pages/sign-up/SignUp";
import HotelReg from "./pages/hotel-reg/HotelReg";
import HotelMe from "./pages/hotel-me/HotelMe";
import HotelMgmt from "./pages/hotel-mgmt/HotelMgmt";
import Search from "./pages/main/MainPage";
import SearchResult from "./pages/search-reuslt/SearchResult";

import "@fontsource/noto-sans-kr";
import Hotel from "./pages/hotel/Hotel"
import Payment from "./pages/payment/Payment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuccessPage } from "./pages/payment/success/Success";
import { FailPage } from "./pages/payment/fail/Fail";

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <tw.Container className="App">
                    <Header />
                    <tw.ContentsWrap>
                        <Routes>
                            <Route path="/" element={<Search />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/hotel/:encryptedId/:startDate/:endDate/:adult/:child" element={<Hotel />} />
                            <Route path="/payment/:encryptedHotelId/:encryptedRoomId/:startDate/:endDate" element={<Payment />} />
                            <Route path="/hotelreg" element={<HotelReg />} />
                            <Route path="/hotel/me" element={<HotelMe />} />
                            <Route path="/hotel/mgmt/">
                                <Route path=":hotelId/*" element={<HotelMgmt />} />
                            </Route>
                            <Route path="/auth/kakao" element={<AuthKaKao />} />
                            <Route path="/search/:searchValue/:startDate/:endDate/:adult/:child" element={<SearchResult />} />
                            <Route path="/success/:id" element={<SuccessPage />} />
                            <Route path="/fail" element={<FailPage />} />
                        </Routes>
                    </tw.ContentsWrap>
                </tw.Container>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
