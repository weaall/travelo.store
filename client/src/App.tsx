import { Routes, Route, BrowserRouter } from "react-router-dom"

import * as tw from "./App.styles"

import Header from "./components/header/Header"
import Main from "./pages/main/Main"
import SignIn from "./pages/sign-in/SignIn"

function App() {
    return (
        <BrowserRouter>
            <tw.Container className="App">
                <tw.ContentsWrap>
                    <Header />
                    <Routes>
                        <Route path="/main" element={<Main />} />
                        <Route path="/" element={<SignIn />} />
                    </Routes>
                </tw.ContentsWrap>
            </tw.Container>
        </BrowserRouter>
    )
}

export default App
