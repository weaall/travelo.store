import { ChangeEvent, useEffect, useState } from "react";
import * as tw from "./MyInfoPage.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { checkValidEmail, checkValidMobile, checkValidPhoneNumber, checkValidUserName } from "../../../utils/regExp.utils";

export default function MyInfoPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [inputState, setInputState] = useState(false);

    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        mobile: "",
        social: "",
    });
    const [initialUserInfo, setInitialUserInfo] = useState({
        email: "",
        name: "",
        mobile: "",
        social: "",
    });

    const [formValid, setFormValid] = useState({
        isEmail: false,
        isName: false,
        isMobile: false,
    });

    const isFormValid = () => {
        return formValid.isEmail && formValid.isName && formValid.isMobile;
    };

    const fetchUser = async () => {
        try {
            const config = await sendJWT({
                method: "get",
                url: "/user/me",
            });

            const response = await axiosInstance.request(config);
            const userData = response.data.data[0];
            setUserInfo(userData);
            setInitialUserInfo(userData);

            setFormValid({
                isName: true,
                isEmail: true,
                isMobile: true,
            });

        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    const updateMyInfo = async () => {
        setLoading(true);
        try {
            const config = await sendJWT({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "put",
                url: "/user/updateMe",
                data: userInfo,
            });
            await axiosInstance.request(config);
            window.alert("수정완료");
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, validationFunction: (value: string) => boolean, validationKey: string) => {
        const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
        setFormValid({
            ...formValid,
            [validationKey]: validationFunction(value),
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "mobile" ? value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : value;
        setUserInfo({
            ...userInfo,
            [name]: sanitizedValue,
        });
    };

    const onClickChangeBtn = () => {
        if (!inputState) {
            setInputState(true);
        } else {
            if (JSON.stringify(userInfo) !== JSON.stringify(initialUserInfo)) {
                if (window.confirm("변경 사항을 저장하시겠습니까?")) {
                    updateMyInfo();
                }
            } else {
                setInputState(false);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>내정보</tw.Title>
                    <tw.Social $color={userInfo.social}>{userInfo.social}</tw.Social>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.UpperTag>이름</tw.UpperTag>
                    <tw.Input
                        name="name"
                        onInput={(e) => handleInput(e, checkValidUserName, "isName")}
                        value={userInfo.name}
                        onChange={handleChange}
                        maxLength={8}
                        $state={inputState}
                        disabled={!inputState}
                    />
                    <tw.UnderTag draggable="true" $state={inputState} $validator={formValid.isName}>
                        {userInfo.name === "" ? "" : formValid.isName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>이메일</tw.UpperTag>
                    <tw.Input
                        name="email"
                        onInput={(e) => handleInput(e, checkValidEmail, "isEmail")}
                        value={userInfo.email}
                        onChange={handleChange}
                        maxLength={30}
                        $state={inputState}
                        disabled={!inputState}
                    />
                    <tw.UnderTag draggable="true" $state={inputState} $validator={formValid.isEmail}>
                        {userInfo.email === "" ? "" : formValid.isEmail === false ? "example@gmail.com 형식으로 입력해 주세요." : "올바른 이메일입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>전화번호</tw.UpperTag>
                    <tw.Input
                        name="mobile"
                        onInput={(e) => handleInput(e, checkValidMobile, "isMobile")}
                        maxLength={13}
                        value={userInfo.mobile}
                        onChange={handleChange}
                        $state={inputState}
                        disabled={!inputState}
                    />
                    <tw.UnderTag draggable="true" $state={inputState} $validator={formValid.isMobile}>
                        {userInfo.mobile === "" ? "" : formValid.isMobile === false ? "올바른 전화번호를 입력해주세요." : "올바른 전화번호입니다."}
                    </tw.UnderTag>
                </tw.InputWrap>
                <tw.MgmtBtnWrap>
                    <tw.MgmtBtn onClick={onClickChangeBtn} $validator={isFormValid()} disabled={!isFormValid()}>
                        {inputState ? "수정완료" : "수정하기"}
                    </tw.MgmtBtn>
                </tw.MgmtBtnWrap>
            </tw.MobileWrap>
        </tw.Container>
    );
}
