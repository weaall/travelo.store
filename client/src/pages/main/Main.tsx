import { useEffect } from "react"
import * as tw from "./Main.styles"

export default function Main() {
    const code = new URL(document.location.toString()).searchParams.get("code")

    useEffect(() => {}, [])

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
