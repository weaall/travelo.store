import { useEffect, useState } from "react"
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./RegRoom.modal.styles"

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
}

export default function RegRoomModal({ onClose, hotel_id }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        hotel_id: hotel_id,
        name: "",
        num: 1,
        bed_type_id: 1,
        view_type_id: 1,
    });
    const [bedList, setBedList] = useState([
        {
            id: 0,
            name: "",
        },
    ]);
    const [viewList, setViewList] = useState([
        {
            id: 0,
            name: "",
        },
    ]);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRoomData({ ...roomData, [name]: value })
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setRoomData({ ...roomData, [name]: value })
    }

    const onClickRegister = async () => {
        if (window.confirm("저장하시겠습니까?")) {
            try {
                const config = await sendJWT({
                    method: "post",
                    url: "/room/reg",
                    data: roomData,
                });
                const response = await axiosInstance.request(config);
                window.alert("저장완료");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status === 409) {
                        window.alert("올바른 접근이 아닙니다.");
                        navigate("/");
                    } else if (error.response.status === 401) {
                        window.alert("올바른 접근이 아닙니다.");
                        navigate("/main");
                    }
                }
            }
        }
    };

    const fetchBedType = async () => {
        try {
            const response = await axiosInstance.get("/room/bed");
            setBedList(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    const fetchViewType = async () => {
        try {
            const response = await axiosInstance.get("/room/view");
            setViewList(response.data.data);
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
        fetchBedType();
        fetchViewType();
    }, []);

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>객실추가</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.UpperTag>객실이름</tw.UpperTag>
                    <tw.Input value={roomData.name} onChange={onChangeInput} name="name" />
                    <tw.UpperTag>인원</tw.UpperTag>
                    <tw.Select value={roomData.num} onChange={onChangeSelect} name="num">
                        {[1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </tw.Select>
                    <tw.UpperTag>베드 타입</tw.UpperTag>
                    <tw.Select value={roomData.bed_type_id} onChange={onChangeSelect} name="bed_type_id">
                        {bedList.map((bed) => (
                            <option key={bed.id} value={bed.id}>
                                {bed.name}
                            </option>
                        ))}
                    </tw.Select>
                    <tw.UpperTag>뷰 타입</tw.UpperTag>
                    <tw.Select value={roomData.view_type_id} onChange={onChangeSelect} name="view_type_id">
                        {viewList.map((view) => (
                            <option key={view.id} value={view.id}>
                                {view.name}
                            </option>
                        ))}
                    </tw.Select>
                    
                </tw.InputWrap>
                <tw.RegWrap>
                    <tw.RegBtn onClick={onClickRegister} $validator={true}>
                        등록하기
                    </tw.RegBtn>
                </tw.RegWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
