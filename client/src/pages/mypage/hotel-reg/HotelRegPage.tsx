import React, { DragEvent, useEffect, useState } from "react";
import * as tw from "./HotelRegPage.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import DaumPostcodeModal from "../../../hook/modal/daum-postcode/DaumPostcode.modal";

export default function HotelRegPage() {
    const navigate = useNavigate();

    const [isDaumAddressModalOpen, setIsSearchDateModalOpen] = useState(false);

    const openDaumAddressModal = () => {
        setIsSearchDateModalOpen(true);
    };

    const closeDaumAddressModal = () => {
        setIsSearchDateModalOpen(false);
    };

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        address_detail: "",
        postcode: "",
        reg_num: 0,
        bank: "",
        account: 0,
        owner: "",
    });

    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = e.dataTransfer.files;
        const newFiles = Array.from(droppedFiles).slice(0, 2 - files.length);
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const uploadFilesToS3 = async () => {
        const uploadedKeys = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const key = `reg_docs/${formData.name}/${file.name}`;
            const contentType = file.type;

            const presignedUrlsResponse = await axiosInstance.post("/auth/presignedUrl", {
                key: key,
                contentType: contentType,
            });

            const presignedUrl = presignedUrlsResponse.data.data;

            const response = await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": contentType,
                },
            });

            const imageUrl = presignedUrl.split("?")[0];
            uploadedKeys.push(imageUrl);
        }
        return uploadedKeys;
    };

    const onClickRegister = async () => {
        try {
            const uploadedKeys = await uploadFilesToS3();

            const updatedRoomData = {
                ...formData,
                urls: uploadedKeys,
            };

            const config = await sendJWT({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                url: "/hotel/reg",
                data: updatedRoomData,
            });

            await axiosInstance.request(config);
            window.alert("저장완료");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.");
                } else {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            } else {
                window.alert("올바른 접근이 아닙니다.");
                navigate("/");
            }
        }
    };

    useEffect(() => {}, []);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>내정보</tw.Title>
                </tw.TitleWrap>

                <tw.InputWrap>
                    <tw.UpperTag>호텔이름</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.name} name="name" />
                    <tw.UpperTag>우편번호</tw.UpperTag>
                    <tw.FlexWrap>
                        <tw.Input onChange={onChangeInput} value={formData.postcode} name="postcode" disabled />
                        <tw.SearchBtn onClick={openDaumAddressModal}>주소검색</tw.SearchBtn>
                    </tw.FlexWrap>
                    <tw.UpperTag>주소</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.address} name="address" disabled />
                    <tw.UpperTag>상세주소</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.address_detail} name="address_detail" />
                    <tw.UpperTag>사업자등록번호</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.reg_num} name="reg_num" />

                    <tw.UpperTag>은행</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.bank} name="bank" />
                    <tw.UpperTag>계좌주</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.owner} name="owner" />
                    <tw.UpperTag>계좌번호</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.account} name="account" />
                    <tw.UpperTag>사업자등록증 및 통장사본</tw.UpperTag>
                    <tw.UploadWrap onDragOver={onDragOver} onDrop={onDrop}>
                        {imagePreviews.length === 0 && <tw.ImgLabel>이미지를 드래그 앤 드롭하세요.</tw.ImgLabel>}
                        <tw.ImgContainer>
                            {imagePreviews.map((preview, index) => (
                                <tw.ImgWrap key={index}>
                                    <tw.RemoveBtn onClick={() => removeFile(index)}>삭제</tw.RemoveBtn>
                                    <tw.Img src={preview} alt={`이미지 미리보기 ${index + 1}`} draggable={false} />
                                </tw.ImgWrap>
                            ))}
                        </tw.ImgContainer>
                    </tw.UploadWrap>
                    <tw.RegBtn onClick={onClickRegister} $validator={true} disabled={false}>
                        호텔등록
                    </tw.RegBtn>
                </tw.InputWrap>
            </tw.MobileWrap>

            {isDaumAddressModalOpen && (
                <ModalPortal>
                    <DaumPostcodeModal
                        onChangeAddress={(newAddress) => {
                            setFormData((prevData) => ({ ...prevData, address: newAddress }));
                        }}
                        onChangePostcode={(newPostcode) => {
                            setFormData((prevData) => ({ ...prevData, postcode: newPostcode }));
                        }}
                        onClose={closeDaumAddressModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
