import React, { DragEvent, useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./SetRoom.modal.styles"

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
    room_id: number | undefined;
}

export default function SetRoomModal({ onClose, hotel_id, room_id }: ModalProps) {
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        hotel_id: hotel_id,
        room_id: room_id,
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

    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const fetchImageFile = async () => {
        try {
            const urlResponse = await axiosInstance.get("/room/img/" + room_id);

            const imagesData = urlResponse.data.data;

            const newFiles = [];
            const imagePreviews = [];

            for (let i = 0; i < imagesData.length; i++) {
                const imageUrl = imagesData[i].url;

                const response = await fetch(imageUrl);
                const blob = await response.blob();

                const urlParts = imageUrl.split(".");
                const fileExtension = urlParts[urlParts.length - 1];

                const file = new File([blob], `image${i + 1}.${fileExtension}`, { type: `image/${fileExtension}` });

                newFiles.push(file);
                imagePreviews.push(URL.createObjectURL(file));
            }

            setFiles(newFiles);
            setImagePreviews(imagePreviews);
        } catch (error) {
            window.alert("올바른 접근이 아닙니다.");
            navigate("/main");
        }
    };

    useEffect(() => {
        fetchImageFile();
    }, []);

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = e.dataTransfer.files;
        const newFiles = Array.from(droppedFiles).slice(0, 6 - files.length);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        const previews = [...files, ...newFiles].map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        const previews = newFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRoomData({ ...roomData, [name]: value })
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setRoomData({ ...roomData, [name]: value })
    }

    const fetchRoomInfo = async () => {
        try {
            const response = await axiosInstance.get("/room/" + room_id);
            const fetchedData = response.data.data[0];
            setRoomData(fetchedData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
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

    const clickInfoSave = async () => {
        try {
            const allInfoData = new FormData();

            for (let i = 0; i < files.length; i++) {
                allInfoData.append("images", files[i]);
            }

            allInfoData.append("data", JSON.stringify(roomData));
            const config = await sendJWT({
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                method: "put",
                url: "/room/info",
                data: allInfoData,
            });

            const response = await axiosInstance.request(config);
            fetchRoomInfo();
            window.alert("저장완료");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.");
                } else {
                    window.alert("올바른 접근이 아닙니다.");
                }
            }
        }
    };

    useEffect(() => {
        fetchRoomInfo();
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
                    <tw.Title>객실정보수정</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                <tw.ContentsFlex>
                    <tw.SubTitle>숙소정보</tw.SubTitle>
                    <tw.HalfFlex>
                        <tw.ResetBtn>되돌리기</tw.ResetBtn>
                        <tw.SetBtn onClick={clickInfoSave}>저장</tw.SetBtn>
                    </tw.HalfFlex>
                </tw.ContentsFlex>
                    <tw.UpperTag>호텔이름</tw.UpperTag>
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

                    <tw.UploadWrap onDragOver={onDragOver} onDrop={onDrop}>
                        <tw.ImgLabel>이미지를 드래그 앤 드롭하세요.</tw.ImgLabel>
                        <tw.ImgContainer>
                            {imagePreviews.map((preview, index) => (
                                <tw.ImgWrap key={index}>
                                    <tw.RemoveBtn onClick={() => removeFile(index)}>
                                        삭제
                                    </tw.RemoveBtn>
                                    <tw.Img src={preview} alt={`이미지 미리보기 ${index + 1}`} draggable={false} />
                                </tw.ImgWrap>
                            ))}
                        </tw.ImgContainer>
                    </tw.UploadWrap>
                </tw.InputWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
