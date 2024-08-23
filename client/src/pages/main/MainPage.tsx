import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./MainPage.styles"
import { ModalPortal } from "../../hook/modal/ModalPortal";
import SearchDateModal from "../../hook/modal/search_date/SearchDate.modal";
import SearchPersonModal from "../../hook/modal/search_person/SearchPerson.modal";
import { encrypt } from "../../utils/cryptoJs";
import BannerSlider from "../../components/bannerSlider/BannerSlider";
import RecentView from "../../components/recentView/RecentView";
import RecRegion from "../../components/rec-region/RecRegion";

interface MainPageProps {
    defaultSearchValue?: string;
    defaultStartDate?: string;
    defaultEndDate?: string;
    defaultAdult?: number;
    defaultChild?: number;
    currentHotelId?: string;
    currentHotelName? : string;
}

export default function Search({ defaultSearchValue, defaultStartDate, defaultEndDate, defaultAdult, defaultChild, currentHotelId, currentHotelName}: MainPageProps) {
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

    const [searchValue, setSearchValue] = useState(defaultSearchValue || "");
    const [dateValue, setDateValue] = useState({
        startDate: defaultStartDate || dayjs().format("YYYY-MM-DD"),
        endDate: defaultEndDate || dayjs().add(1, "day").format("YYYY-MM-DD"),
        diffDate: dayjs(defaultEndDate).diff(dayjs(defaultStartDate), "day") || 1,
    });
    const [personValue, setPersonValue] = useState({
        adult: defaultAdult || 2,
        child: defaultChild || 0
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchValue.trim() !== "") {
            handleSearchSubmit();
        } else if (event.key === "Enter" && searchValue.trim() === "") {
            window.alert("검색어를 입력해주세요");
        }
    };

    const handleOnClick = () => {
        if (searchValue.trim() !== "") {
            handleSearchSubmit();
        } else if (searchValue.trim() === "") {
            window.alert("검색어를 입력해주세요");
        }
    };

    const handleSearchSubmit = () => {
        if(currentHotelId !== undefined && currentHotelName === searchValue){
            navigate(`/hotel/${encrypt(currentHotelId || "")}/${dateValue.startDate}/${dateValue.endDate}/${personValue.adult}/${personValue.child}`);
        }else{
            navigate(`/search/${searchValue}/${dateValue.startDate}/${dateValue.endDate}/${personValue.adult}/${personValue.child}`);
        }
    };

    const handleSearchDateSelect = (selectedDates: { startDate: string; endDate: string }) => {
        setDateValue({
            ...dateValue,
            startDate: selectedDates.startDate,
            endDate: selectedDates.endDate,
        });

        closeSearchDateModal();
    };

    const handleSearchPersonSelect = (selectedPerson: { adult: number; child: number }) => {
        setPersonValue({
            ...personValue,
            adult: selectedPerson.adult,
            child: selectedPerson.child,
        });

        closeSearchPersonModal();
    };

    useEffect(() => {
        const newDiffDate = dayjs(dateValue.endDate).diff(dayjs(dateValue.startDate), "day");
        setDateValue((prevDateValue) => ({ ...prevDateValue, diffDate: newDiffDate }));
    }, [dateValue.endDate, dateValue.startDate]);

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SearchContainer>
                    <tw.SearchWrap>
                        <tw.SvgWrap>
                            <tw.Svg alt="" src={require("../../assets/svg/search_icon.svg").default} />
                        </tw.SvgWrap>
                        <tw.SearchInput
                            placeholder="지역, 숙소명으로 찾아보세요"
                            maxLength={20}
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                        />
                        <tw.RemoveBtn $value={searchValue} onClick={() => setSearchValue("")}>
                            <tw.Svg alt="" src={require("../../assets/svg/close_svg.svg").default} />
                        </tw.RemoveBtn>
                    </tw.SearchWrap>

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
                    
                    <tw.SearchBtn onClick={handleOnClick}>
                        <tw.Svg alt="" src={require("../../assets/svg/search_white_icon.svg").default} />
                    </tw.SearchBtn>

                    <tw.SearchBtnMobile onClick={handleOnClick}>검색하기</tw.SearchBtnMobile>
                </tw.SearchContainer>

                <BannerSlider />
                <RecentView />
                <RecRegion />
            </tw.MainContainer>

            {isSearchDateModalOpen && (
                <ModalPortal>
                    <SearchDateModal
                        startDate={dateValue.startDate}
                        endDate={dateValue.endDate}
                        onClose={(selectedDates) => handleSearchDateSelect(selectedDates)}
                    />
                </ModalPortal>
            )}

            {isSearchPersonModalOpen && (
                <ModalPortal>
                    <SearchPersonModal
                        adult={personValue.adult}
                        child={personValue.child}
                        onClose={(selectedPerson) => handleSearchPersonSelect(selectedPerson)}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
