import { Routes, Route, BrowserRouter } from "react-router-dom"

import * as tw from "./App.styles"

import Header from "./components/header/Header"
import Main from "./pages/main/Main"
import SignIn from "./pages/sign-in/SignIn"
import AuthKaKao from "./pages/auth/Auth.kakao"
import SignUp from "./pages/sign-up/SignUp"

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
                        <Route path="/auth/kakao" element={<AuthKaKao />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.Container>
        </BrowserRouter>
    )
}

export default App
