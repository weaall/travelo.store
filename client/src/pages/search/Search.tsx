import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./Search.styles"
import { ModalPortal } from "../../hook/modal/ModalPortal";
import SearchDateModal from "../../hook/modal/search_date/SearchDate.modal";
import SearchPersonModal from "../../hook/modal/search_person/SearchPerson.modal";
import { axios, axiosInstance } from "../../utils/axios.utils";

export default function Search() {
    const navigate = useNavigate();

    const [isSearchDateModalOpen, setIsSearchDateModalOpen] = useState(false);

    const openSearchDateModal = () => {
        setIsSearchDateModalOpen(true);
    };

    const closeSearchDateModal = () => {
        setIsSearchDateModalOpen(false);
    };

    const [isSearchPersonModalOpen, setIsSearchPersonModalOpen] = useState(false);

    const openSearchPersonModal = () => {
        setIsSearchPersonModalOpen(true);
    };

    const closeSearchPersonModal = () => {
        setIsSearchPersonModalOpen(false);
    };

    const [searchValue, setSearchValue] = useState("");
    const [dateValue, setDateValue] = useState({
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
        diffDate: 1
    });
    const [personValue, setPersonValue] = useState({
        adult: 2,
        child: 0,
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchValue.trim() !== "") {
            handleSearchSubmit();
        }else if(event.key === "Enter" && searchValue.trim() === ""){
            window.alert("검색어를 입력해주세요")
        }
    };

    const handleSearchSubmit = () => {
            navigate(`/search/${searchValue}/${dateValue.startDate}/${dateValue.endDate}/${personValue.adult}/${personValue.child}`);
    };

    const handleSearchDateSelect = (selectedDates: { startDate: string, endDate: string }) => {
        setDateValue({
            ...dateValue,
            startDate: selectedDates.startDate,
            endDate: selectedDates.endDate
        });
    
        closeSearchDateModal();
    };

    const handleSearchPersonSelect = (selectedPerson: { adult: number, child : number }) => {
        setPersonValue({
            ...personValue,
            adult: selectedPerson.adult,
            child: selectedPerson.child
        });
    
        closeSearchPersonModal();
    };

    const getSearch = async () => {
        try {
            const response = await axiosInstance.get("/search/", {
                params: {
                    searchValue: searchValue,
                    startDate: dateValue.startDate,
                    endDate: dateValue.endDate,
                    adult: personValue.adult,
                    child: personValue.child
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    useEffect(() => {
        const newDiffDate = dayjs(dateValue.endDate).diff(dayjs(dateValue.startDate), "day");
        setDateValue((prevDateValue) => ({ ...prevDateValue, diffDate: newDiffDate }));
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
                            <tw.CalendarBtn onClick={openSearchDateModal}>
                                {dateValue.startDate} / {dateValue.diffDate}박
                            </tw.CalendarBtn>
                        </tw.CalendarWrap>
                        <tw.PersonWrap>
                            <tw.SvgWrap>
                                <tw.Svg alt="" src={require("../../assets/svg/person_icon.svg").default} />
                            </tw.SvgWrap>
                            <tw.PersonBtn onClick={openSearchPersonModal}>
                                성인 {personValue.adult}, 아동 {personValue.child}
                            </tw.PersonBtn>
                        </tw.PersonWrap>
                    </tw.BottomWrap>
                </tw.SearchContainer>
            </tw.MainContainer>

            {isSearchDateModalOpen && (
                <ModalPortal>
                    <SearchDateModal startDate={dateValue.startDate} endDate={dateValue.endDate} onClose={(selectedDates) => handleSearchDateSelect(selectedDates)} />
                </ModalPortal>
            )}

            {isSearchPersonModalOpen && (
                <ModalPortal>
                    <SearchPersonModal adult={personValue.adult} child={personValue.child} onClose={(selectedPerson) => handleSearchPersonSelect(selectedPerson)} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
