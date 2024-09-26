import { useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./RegRoom.modal.styles";
import { ModalPortal } from "../ModalPortal";
import AlertModal from "../alert/Alert.modal";

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
}

export default function RegRoomModal({ onClose, hotel_id }: ModalProps) {
    const navigate = useNavigate();

    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = () => {
        triggerCloseAnimation();
    };

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [onCloseCallback, setOnCloseCallback] = useState<() => void>(() => {});
    const openAlertModal = (callback: () => void) => {
        setOnCloseCallback(() => callback);
        setIsAlertModalOpen(true);
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        onCloseCallback();
    };

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
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const onClickRegister = async () => {
        if (window.confirm("등록하시겠습니까?")) {
            try {
                const config = await sendJWT({
                    method: "post",
                    url: "/room/reg",
                    data: roomData,
                });
                await axiosInstance.request(config);
                setAlertMessage("등록되었습니다.");
                const handleModalClose = () => {};
                openAlertModal(handleModalClose);
                handleCloseClick();
            } catch (error) {
                handleAxiosError(error, navigate);
            }
        }
    };

    const fetchBedType = async () => {
        try {
            const response = await axiosInstance.get("/room/bed");
            setBedList(response.data.data);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const fetchViewType = async () => {
        try {
            const response = await axiosInstance.get("/room/view");
            setViewList(response.data.data);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    useEffect(() => {
        fetchBedType();
        fetchViewType();
    }, []);

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={handleCloseClick}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>객실추가</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.UpperTag>객실이름</tw.UpperTag>
                    <tw.Input value={roomData.name} onChange={onChangeInput} name="name" maxLength={20}/>
                    <tw.UpperTag>인원</tw.UpperTag>
                    <tw.Select value={roomData.num} onChange={onChangeSelect} name="num">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
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
                    <tw.RegBtn onClick={onClickRegister} $validator={roomData.name.length !== 0} disabled={roomData.name.length === 0}>
                        등록하기
                    </tw.RegBtn>
                </tw.RegWrap>
            </tw.ModalWrap>

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}

        </tw.Container>
    );
}
