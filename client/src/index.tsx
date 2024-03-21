import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./tailwind.css"
import { RecoilRoot } from "recoil"

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/ko'; 
dayjs.extend(isLeapYear);
dayjs.locale('ko')

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <RecoilRoot>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RecoilRoot>,
)
