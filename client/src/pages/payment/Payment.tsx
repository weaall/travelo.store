import { useNavigate, useParams } from "react-router-dom";
import { axios, axiosInstance } from "../../utils/axios.utils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./Payment.styles";
import Loading from "../../components/loading/Loading";
import { decrypt } from "../../utils/cryptoJs";
import { ModalPortal } from "../../hook/modal/ModalPortal";
import KakaoMapModal from "../../hook/modal/kakao-map/KakaMap.modal";
import { CheckoutModal } from "../../hook/modal/checkout/Checkout.modal";
import { checkValidEmail, checkValidPhoneNumber, checkValidUserName } from "../../utils/regExp.utils";
import ImgLoader from "../../utils/imgLoader";

export default function Payment() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [isKakaoMapModalOpen, setIsKakaoMapModalOpen] = useState(false);

    const openKakaoMapModal = () => {
        setIsKakaoMapModalOpen(true);
    };

    const closeKakaoMapModal = () => {
        setIsKakaoMapModalOpen(false);
    };

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const openCheckoutModal = () => {
        setIsCheckoutModalOpen(true);
    };

    const closeCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNum: "",
    });

    const [formValid, setFormValid] = useState({
        isUserName: false,
        isPhoneNumber: false,
        isEmail: false,
    });

    const [termsValid, setTermsValid] = useState(false);

    const isFormValid = () => {
        return formValid.isEmail && formValid.isUserName && formValid.isPhoneNumber && termsValid;
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, validationFunction: (value: string) => boolean, validationKey: string) => {
        const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
        setFormValid({
            ...formValid,
            [validationKey]: validationFunction(value),
        });
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "phoneNum" ? value.replace(/[^0-9]/g, "") : value;
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const { encryptedHotelId, encryptedRoomId, startDate, endDate } = useParams();

    const hotelId = decrypt(encryptedHotelId || "");
    const roomId = decrypt(encryptedRoomId || "");

    const [hotelData, setHotelData] = useState({
        id: hotelId,
        name: "",
        address: "",
        address_detail: "",
        postcode: "",
        description: "",
        check_in: 0,
        check_out: 0,

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

    const [roomData, setRoomData] = useState({
        id: 0,
        name: "",
        num: 0,
        view_type: "",
        bed_type: "",
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
    });

    const fetchHotel = async () => {
        try {
            const response = await axiosInstance.get("/hotel/" + hotelId);
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
            const response = await axiosInstance.get("/hotel/img/" + hotelId);
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
            const response = await axiosInstance.get("/room/" + roomId);
            const room = response.data.data[0];

            const roomImgResponse = await axiosInstance.get("/room/img/" + roomId);
            room.img = roomImgResponse.data.data;

            const roomPriceResponse = await axiosInstance.get("/room/price/" + roomId, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            });
            room.room_price = roomPriceResponse.data.data;

            setRoomData(room);
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
    }, [startDate, endDate]);


    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MainContainer>
                <tw.LeftWrap>
                    <tw.UserWrap>
                        <tw.Label>예약자 정보</tw.Label>
                        <tw.UserLabel>이름</tw.UserLabel>
                        <tw.UserInput
                            onChange={onChangeInput}
                            onInput={(e) => handleInput(e, checkValidUserName, "isUserName")}
                            value={formData.name}
                            name="name"
                            maxLength={8}
                        />
                        <tw.UnderTag draggable="true" $validator={formValid.isUserName}>
                            {formData.name === ""
                                ? ""
                                : formValid.isUserName === false
                                ? "올바른 이름을 입력해주세요."
                                : "올바른 이름입니다."}
                        </tw.UnderTag>
                        <tw.UserLabel>전화번호</tw.UserLabel>
                        <tw.UserInput
                            onChange={onChangeInput}
                            onKeyUp={(e) => handleInput(e, checkValidPhoneNumber, "isPhoneNumber")}
                            value={formData.phoneNum}
                            name="phoneNum"
                            maxLength={11}
                        />
                        <tw.UnderTag draggable="true" $validator={formValid.isPhoneNumber}>
                            {formData.phoneNum === ""
                                ? ""
                                : formValid.isPhoneNumber === false
                                ? "올바른 전화번호를 입력해주세요."
                                : "올바른 전화번호입니다."}
                        </tw.UnderTag>
                        <tw.UserLabel>이메일</tw.UserLabel>
                        <tw.UserInput
                            onChange={onChangeInput}
                            onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                            value={formData.email}
                            name="email"
                            maxLength={30}
                        />
                        <tw.UnderTag draggable="true" $validator={formValid.isEmail}>
                            {formData.email === ""
                                ? ""
                                : formValid.isEmail === false
                                ? "example@gmail.com 형식으로 입력해 주세요."
                                : "올바른 이메일입니다."}
                        </tw.UnderTag>
                    </tw.UserWrap>
                    <tw.PolicyWrap>
                        <tw.Label>개인정보보호</tw.Label>
                        <tw.ContentsFlex>
                            <tw.PolicyCheck
                                type="checkbox"
                                checked={termsValid}
                                onChange={() => setTermsValid((prevTermsValid) => !prevTermsValid)}
                            />
                            <tw.PolicyTextMain>다음의 모든 항목에 동의합니다.</tw.PolicyTextMain>
                        </tw.ContentsFlex>
                        <tw.PolicyText>[필수] 본인은 이용약관에동의하며 18세 이상임을 확인합니다.</tw.PolicyText>
                        <tw.PolicyText>[필수] 개인정보 처리방침에 따라 본인의 개인 정보를 사용하고 수집하는 것에 동의합니다.</tw.PolicyText>
                    </tw.PolicyWrap>
                    <tw.PaymentBtnMobile onClick={openCheckoutModal} $validator={isFormValid()} disabled={!isFormValid()}>
                        결제하기
                    </tw.PaymentBtnMobile>
                </tw.LeftWrap>
                <tw.RightWrap>
                    <tw.OuterWrap>
                        <tw.RoomWrap>
                            <tw.ContentsFlex>
                                <tw.Pic>
                                    {hotelData?.img?.[0]?.url ? (
                                        <ImgLoader imageUrl={hotelData.img[0].url} altText="" rounded="l-xl mobile:rounded-none mobile:rounded-t-xl"/>
                                    ) : (
                                        <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                    )}
                                </tw.Pic>
                                <tw.RoomInfoWrap>
                                    <tw.RoomInfo>
                                        <tw.HotelInfoWrap>
                                            <tw.HotelTitle>{hotelData.name}</tw.HotelTitle>
                                            <tw.HotelAddress onClick={openKakaoMapModal}>
                                                {hotelData.address} {hotelData.address_detail}, {hotelData.postcode}
                                            </tw.HotelAddress>
                                        </tw.HotelInfoWrap>
                                    </tw.RoomInfo>
                                </tw.RoomInfoWrap>
                            </tw.ContentsFlex>
                        </tw.RoomWrap>
                        <tw.RoomWrap>
                            <tw.ContentsFlex>
                                <tw.Pic>
                                    {hotelData?.img?.[0]?.url ? (
                                        <ImgLoader imageUrl={roomData.img[0].url} altText="" rounded="l-xl mobile:rounded-none mobile:rounded-t-xl"/>
                                    ) : (
                                        <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                    )}
                                </tw.Pic>
                                <tw.RoomInfoWrap>
                                    <tw.RoomInfo>
                                        <tw.InfoWrap>
                                            <tw.RoomName>{roomData.name}</tw.RoomName>
                                            <tw.RoomText>{roomData.view_type}</tw.RoomText>
                                            <tw.RoomText>
                                                {roomData.bed_type} / 최대인원: {roomData.num}명
                                            </tw.RoomText>
                                        </tw.InfoWrap>
                                    </tw.RoomInfo>
                                </tw.RoomInfoWrap>
                            </tw.ContentsFlex>
                        </tw.RoomWrap>
                    </tw.OuterWrap>
                    <tw.PriceWrap>
                        <tw.PriceRow>
                            <tw.PriceLabel>객실 가격 ({dayjs(endDate).diff(dayjs(startDate), "day")}박)</tw.PriceLabel>
                            <tw.PriceLabel>
                                {roomData.room_price.reduce((total, room) => total + room.price, 0).toLocaleString()}원
                            </tw.PriceLabel>
                        </tw.PriceRow>
                        <tw.PriceRow>
                            <tw.PriceLabel>예약 수수료</tw.PriceLabel>
                            <tw.PriceLabel>없음</tw.PriceLabel>
                        </tw.PriceRow>
                        <tw.TotalPriceRow>
                            <tw.TotalLabel>합계</tw.TotalLabel>
                            <tw.TotalPrice>
                                {roomData.room_price.reduce((total, room) => total + room.price, 0).toLocaleString()}원
                            </tw.TotalPrice>
                        </tw.TotalPriceRow>
                    </tw.PriceWrap>
                    <tw.PaymentBtn onClick={openCheckoutModal} $validator={isFormValid()} disabled={!isFormValid()}>
                        결제하기
                    </tw.PaymentBtn>
                </tw.RightWrap>
            </tw.MainContainer>

            {isKakaoMapModalOpen && (
                <ModalPortal>
                    <KakaoMapModal
                        hotelName={hotelData.name}
                        address={`${hotelData.address} ${hotelData.address_detail}`}
                        imgUrl={hotelData.img[0].url}
                        onClose={closeKakaoMapModal}
                    />
                </ModalPortal>
            )}

            {isCheckoutModalOpen && (
                <ModalPortal>
                    <CheckoutModal
                        checkInDate={startDate || ""}
                        checkOutDate={endDate || ""}
                        hotelId={hotelData.id}
                        roomId={roomId}
                        totalPrice={roomData.room_price.reduce((total, room) => total + room.price, 0)}
                        orderName={`${hotelData.name} ${roomData.name}`}
                        customerName={"위동현"}
                        customerEmail={"weaall@naver.com"}
                        customerMobilePhone={"01020503202"}
                        onClose={closeCheckoutModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
