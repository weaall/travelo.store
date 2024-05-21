import { useNavigate, useParams } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";

import * as tw from "./Hotel.styles";
import Loading from "../../components/loading/Loading";
import ImgSlider from "../../components/imgSlider/imgSlider";
import { facilItems, servItems } from "../../data/hotelData";
import { decrypt } from "../../utils/cryptoJs";

export default function Hotel() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { params } = useParams();
    const id = decrypt(params || "")

    const [hotelData, setHotelData] = useState({
        id: id,
        name: "",
        address: "",
        address_detail: "",
        description: "",

        wifi: 0,
        always_check_in: 0,
        breakfast: 0,
        barbecue: 0,

        carpark: 0,
        restaurnat: 0,
        cafe: 0,
        swimming_pool: 0,
        spa: 0,
        fitness: 0,
        convenience_store: 0,

        img: [
            {
                url: "",
            },
        ],
    });

    const [roomList, setRoomList] = useState([
        {
            id: 0,
            name: "",
            num: 0,
            discount: 0,

            room_price: [
                {
                    date: "",
                    price: 0,
                    room_current: 0,
                    room_limit: 0,
                },
            ],

            img: [
                {
                    url: "",
                },
            ],
        },
    ]);

    const fetchHotel = async () => {
        try {
            const response = await axiosInstance.get("/hotel/" + id);
            setHotelData(response.data.data[0]);
            fetchHotelImg();
            fetchRoom();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchHotelImg = async () => {
        try {
            const response = await axiosInstance.get("/hotel/img/" + id);
            setHotelData((prevState) => ({
                ...prevState,
                img: response.data.data,
            }));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    const fetchRoom = async () => {
        try {
            const response = await axiosInstance.get("/room/hotel/" + id);
            const rooms = response.data.data;

            for (let room of rooms) {
                const roomImgResponse = await axiosInstance.get(`/room/img/${room.id}`);
                room.img = roomImgResponse.data.data;
            }

            setRoomList(rooms);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };


    useEffect(() => {
        fetchHotel();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.HotelWrap>
                    <tw.HotelPic>
                        <ImgSlider images={hotelData.img} />
                    </tw.HotelPic>
                    <tw.HotelInfoWrap>
                        <tw.HotelFlexWrap>
                            <tw.HotelTitle>{hotelData.name}</tw.HotelTitle>
                            <tw.ContentsFlex>
                                <tw.AddressSVG alt="" src={require("../../assets/svg/location_icon.svg").default} />
                                <tw.HotelAddress>
                                    {hotelData.address} {hotelData.address_detail}
                                </tw.HotelAddress>
                            </tw.ContentsFlex>
                            <tw.HotelDesc>{hotelData.description}</tw.HotelDesc>
                        </tw.HotelFlexWrap>
                        <tw.HotelFlexWrap>
                            <tw.Label>서비스 / 편의시설</tw.Label>
                            <tw.HotelServ>
                                {servItems.map((item) =>
                                    (hotelData as any)[item.comp] === 1 ? (
                                        <tw.HotelTextWrap>
                                            <tw.HotelSvg alt="" src={require("../../assets/svg/check_icon.svg").default} />
                                            <tw.HotelText key={item.comp}>{item.label}</tw.HotelText>
                                        </tw.HotelTextWrap>
                                    ) : null,
                                )}
                                {facilItems.map((item) =>
                                    (hotelData as any)[item.comp] === 1 ? (
                                        <tw.HotelTextWrap>
                                            <tw.HotelSvg alt="" src={require("../../assets/svg/check_icon.svg").default} />
                                            <tw.HotelText key={item.comp}>{item.label}</tw.HotelText>
                                        </tw.HotelTextWrap>
                                    ) : null,
                                )}
                            </tw.HotelServ>
                        </tw.HotelFlexWrap>
                    </tw.HotelInfoWrap>
                </tw.HotelWrap>

                <tw.RoomList>
                    <tw.Label>객실정보</tw.Label>
                    {roomList.map((room) => (
                        <tw.RoomWrap key={room.id}>
                            <tw.ContentsFlex>
                                <tw.RoomPic>
                                    <ImgSlider images={room.img} />
                                </tw.RoomPic>
                                <tw.RoomInfoWrap>
                                    <tw.HotelInfo>
                                        <tw.RoomName>{room.name}</tw.RoomName>
                                    </tw.HotelInfo>
                                </tw.RoomInfoWrap>
                            </tw.ContentsFlex>
                        </tw.RoomWrap>
                    ))}
                </tw.RoomList>
            </tw.MainContainer>
        </tw.Container>
    );
}
