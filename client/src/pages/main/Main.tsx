import { useNavigate } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import * as tw from "./Main.styles"
import { useEffect } from "react";

export default function Main() {
    const navigate = useNavigate();
    
    const fetchHotel = async () => {
        try {
            const response = await axiosInstance .get("/hotel");
            console.log(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    useEffect(()=>{
        fetchHotel();
    },[])


    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.SelectContainer>
                    <tw.SelectContainerCell1>
                        <tw.SelectRegion>🔍</tw.SelectRegion>
                    </tw.SelectContainerCell1>
                    <tw.SelectContainerCell2>
                        <tw.SelectStartDate>📅</tw.SelectStartDate>
                        <tw.SelectEndDate>📅</tw.SelectEndDate>
                    </tw.SelectContainerCell2>
                </tw.SelectContainer>

                <tw.SortContainer>
                    <tw.SortBtn>정렬
                    </tw.SortBtn>
                    <tw.FilterBtn>필터
                    </tw.FilterBtn>
                </tw.SortContainer>

                <tw.HotelList>
                    <tw.HotelContainer>
                        <tw.HotelPic></tw.HotelPic>
                        <tw.HotelInfo>
                        </tw.HotelInfo>
                    </tw.HotelContainer>

                    <tw.HotelContainer>
                        <tw.HotelPic></tw.HotelPic>
                        <tw.HotelInfo>
                        </tw.HotelInfo>
                    </tw.HotelContainer>
                </tw.HotelList>

            </tw.MainContainer>
        </tw.Container>
    )
}
