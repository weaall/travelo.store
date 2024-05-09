import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { axios, axiosInstance } from "../../utils/axios.utils";

import * as tw from "./Search.styles"

export default function Search() {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [dateValue, setDataValue] = useState({
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
        diffDate: 1
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchValue.trim() !== "") {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        console.log("검색어:", searchValue);
    };

    useEffect(() => {
        const newDiffDate = dayjs(dateValue.endDate).diff(dayjs(dateValue.startDate), "day");
        setDataValue((prevDateValue) => ({ ...prevDateValue, diffDate: newDiffDate }));
    }, [dateValue.endDate, dateValue.startDate]);

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SearchContainer>
                    <tw.UpperWrap>
                        <tw.SearchWrap>
                            <tw.SvgWrap>
                                <tw.Svg alt="" src={require("../../assets/svg/search_icon.svg").default} />
                            </tw.SvgWrap>
                            <tw.SearchInput
                                placeholder="지역, 숙소명으로 찾아보세요"
                                maxLength={30}
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                            />
                            <tw.CloseBtn onClick={() => setSearchValue("")}>
                                <tw.CloseSvg alt="" src={require("../../assets/svg/close_svg.svg").default}></tw.CloseSvg>
                            </tw.CloseBtn>
                        </tw.SearchWrap>
                    </tw.UpperWrap>
                    <tw.BottomWrap>
                        <tw.CalendarWrap>
                            <tw.SvgWrap>
                                <tw.Svg alt="" src={require("../../assets/svg/calendar_icon.svg").default} />
                            </tw.SvgWrap>
                            <tw.CalendarBtn>{dateValue.startDate} / {dateValue.diffDate}박</tw.CalendarBtn>
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
