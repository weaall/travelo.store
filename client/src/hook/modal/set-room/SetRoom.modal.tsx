import React, { DragEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import S3UrlToCFUrl from "../../../utils/s3UrlToCFD.utils";
import { uploadFilesToS3 } from "../../../utils/s3Upload.utils";
import ImgLoader from "../../../utils/imgLoader";

import ConfirmModal from "../alert-confirm/Confirm.modal";
import AlertModal from "../alert/Alert.modal";
import LoadingModal from "../loading/Loading.modal";
import { ModalPortal } from "../ModalPortal";

import * as tw from "./SetRoom.modal.styles";

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
    room_id: number | undefined;
}

export default function SetRoomModal({ onClose, hotel_id, room_id }: ModalProps) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [onCloseAlertCallback, setOnCloseAlertCallback] = useState<() => void>(() => {});

    const openAlertModal = (message: string, callback: () => void) => {
        setAlertMessage(message);
        setOnCloseAlertCallback(() => callback);
        setIsAlertModalOpen(true);
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        onCloseAlertCallback();
    };

    const [confirmMessage, setConfirmMessage] = useState("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [onCloseConfirmCallback, setOnCloseConfirmCallback] = useState<(result: boolean) => void>(() => {});

    const openConfirmModal = (message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setConfirmMessage(message);
            setOnCloseConfirmCallback(() => (result: boolean) => {
                setIsConfirmModalOpen(false);
                resolve(result);
            });
            setIsConfirmModalOpen(true);
        });
    };

    const closeConfirmModal = (result: boolean) => {
        setIsConfirmModalOpen(false);
        onCloseConfirmCallback(result);
    };

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

    const fetchRoomInfo = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/room/" + room_id);
            const fetchedData = response.data.data[0];
            setRoomData(fetchedData);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    }, [room_id, navigate]);

    const fetchBedType = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/room/bed");
            setBedList(response.data.data);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    }, [navigate]);

    const fetchViewType = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/room/view");
            setViewList(response.data.data);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    }, [navigate]);

    useEffect(() => {
        fetchRoomInfo();
        fetchBedType();
        fetchViewType();
    }, [fetchRoomInfo, fetchBedType, fetchViewType]);

    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const fetchImageFile = useCallback(async () => {
        try {
            const urlResponse = await axiosInstance.get("/room/img/" + room_id);
            const imagesData = urlResponse.data.data;

            const newFiles = [];
            const imagePreviews = [];

            for (let i = 0; i < imagesData.length; i++) {
                const s3Url = imagesData[i].url;
                const cloudFrontUrl = S3UrlToCFUrl(s3Url);

                const response = await fetch(cloudFrontUrl);
                const blob = await response.blob();

                const urlParts = cloudFrontUrl.split(".");
                const fileExtension = urlParts[urlParts.length - 1];

                const file = new File([blob], `image${i + 1}.${fileExtension}`, {
                    type: `image/${fileExtension}`,
                });

                newFiles.push(file);
                imagePreviews.push(URL.createObjectURL(file));
            }

            setFiles(newFiles);
            setImagePreviews(imagePreviews);
        } catch (error) {
            openAlertModal("올바른 접근이 아닙니다.", () => {
                navigate("/");
            });
        }
    }, [room_id, navigate]);

    useEffect(() => {
        fetchImageFile();
    }, [fetchImageFile]);

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = e.dataTransfer.files;
        const newFiles = Array.from(droppedFiles).slice(0, 10 - files.length);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        const previews = [...files, ...newFiles].map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const onDragStartImg = (index: number) => {
        setDraggedIndex(index);
    };

    const onDragOverImg = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === index) return;

        const newImagePreviews = [...imagePreviews];
        const draggedItem = newImagePreviews.splice(draggedIndex, 1)[0];
        newImagePreviews.splice(index, 0, draggedItem);

        const newFiles = [...files];
        const draggedFile = newFiles.splice(draggedIndex, 1)[0];
        newFiles.splice(index, 0, draggedFile);

        setDraggedIndex(index);
        setImagePreviews(newImagePreviews);
        setFiles(newFiles);
    };

    const onDropImg = () => {
        setDraggedIndex(null);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        const newImagePreviews = [...imagePreviews];

        newFiles.splice(index, 1);
        newImagePreviews.splice(index, 1);

        setFiles(newFiles);
        setImagePreviews(newImagePreviews);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const clickInfoSave = async () => {
        try {
            const confirmResult = await openConfirmModal("변경사항을 저장하시겠습니까?");
            if (confirmResult) {
                openLoadingModal();

                const uploadedKeys = await uploadFilesToS3(files, `room_img/${hotel_id}/${room_id}`);

                const updatedRoomData = {
                    ...roomData,
                    urls: uploadedKeys,
                };

                const config = await sendJWT({
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "put",
                    url: "/room/info",
                    data: updatedRoomData,
                });

                await axiosInstance.request(config);
                openAlertModal("저장되었습니다.", () => {
                    fetchRoomInfo();
                    onClose();
                });
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    };

    const clickInfoReset = async () => {
        const confirmResult = await openConfirmModal("변경사항을 되돌리시겠습니까?");
        if (confirmResult) {
            if (roomData) {
                setRoomData(roomData);
                fetchImageFile();
            }
        }
    };

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
                    <tw.SubTitleWrap>
                        <tw.SubTitle>숙소정보</tw.SubTitle>
                        <tw.HalfFlex>
                            <tw.ResetBtn onClick={() => clickInfoReset()}>되돌리기</tw.ResetBtn>
                            <tw.SetBtn
                                onClick={() => {
                                    clickInfoSave();
                                }}
                            >
                                저장
                            </tw.SetBtn>
                        </tw.HalfFlex>
                    </tw.SubTitleWrap>
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

                    <tw.UploadWrap>
                        <tw.UploadDragWrap onDragOver={onDragOver} onDrop={onDrop}>
                            <tw.UploadDragLabel>이곳에 이미지를 드래그엔 드롭해주세요.</tw.UploadDragLabel>
                        </tw.UploadDragWrap>
                        <tw.ImgLabel>*이미지가 정렬된 순서대로 유저에게 보여집니다.</tw.ImgLabel>
                        <tw.ImgContainer onDragOver={onDragOver} onDrop={onDropImg}>
                            {imagePreviews.map((preview, index) => (
                                <tw.ImgOutWrap key={index} draggable onDragStart={() => onDragStartImg(index)} onDragOver={(e) => onDragOverImg(e, index)}>
                                    <tw.RemoveBtn onClick={() => removeFile(index)} style={{ marginLeft: "10px" }}>
                                        삭제
                                    </tw.RemoveBtn>
                                    <tw.ImgWrap>
                                        <ImgLoader imageUrl={preview} altText={`이미지 미리보기 ${index + 1}`} rounded="xl" />
                                    </tw.ImgWrap>
                                </tw.ImgOutWrap>
                            ))}
                        </tw.ImgContainer>
                    </tw.UploadWrap>
                </tw.InputWrap>
            </tw.ModalWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}

            {isConfirmModalOpen && (
                <ModalPortal>
                    <ConfirmModal message={confirmMessage} onClose={closeConfirmModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
