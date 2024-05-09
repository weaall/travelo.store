import { useNavigate } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";

import * as tw from "./Search.styles"
import Loading from "../../components/loading/Loading";

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    if (loading) {
        return <Loading />
    }

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SearchContainer>
                    <tw.UpperWrap>
                        <tw.SvgWrap>
                            <tw.Svg alt="" src={require("../../assets/svg/search_icon.svg").default} />
                        </tw.SvgWrap>
                        <tw.SelectRegion></tw.SelectRegion>
                    </tw.UpperWrap>
                    <tw.BottomWrap>
                        <tw.CalendarWrap>
                            <tw.SvgWrap>
                                <tw.Svg alt="" src={require("../../assets/svg/search_icon.svg").default} />
                            </tw.SvgWrap>
                        </tw.CalendarWrap>
                        <tw.PersonWrap>
                            <tw.SvgWrap>
                                <tw.Svg alt="" src={require("../../assets/svg/person_icon.svg").default} />
                            </tw.SvgWrap>
                        </tw.PersonWrap>
                    </tw.BottomWrap>
                </tw.SearchContainer>
            </tw.MainContainer>
        </tw.Container>
    );
}
