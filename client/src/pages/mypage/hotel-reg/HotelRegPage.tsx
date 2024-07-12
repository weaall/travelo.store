import React, { DragEvent, useEffect, useState } from "react";
import * as tw from "./HotelRegPage.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import DaumPostcodeModal from "../../../hook/modal/daum-postcode/DaumPostcode.modal";
import { checkValidAccountNum, checkValidBusinessNum, checkValidEmail, checkValidInput} from "../../../utils/regExp.utils";

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
        reg_num: "",
        bank: "",
        account: "",
        owner: "",
    });

    const [formValid, setFormValid] = useState({
        isName: false,
        isPostcode: false,
        isRegNum: false,
        isBank: false,
        isAccount: false,
        isOwner: false,
        isImages: false,
    });

    const isFormValid = () => {
        return (
            formValid.isName &&
            formValid.isPostcode &&
            formValid.isRegNum &&
            formValid.isBank &&
            formValid.isAccount &&
            formValid.isOwner &&
            formValid.isImages
        );
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
        const sanitizedValue = (name === "reg_num" || name === "account") ? value.replace(/[^0-9]/g, "") : value;
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = e.dataTransfer.files;
        const newFiles = Array.from(droppedFiles).slice(0, 2 - files.length);
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...newFiles];
            setFormValid((prevValid) => ({
                ...prevValid,
                isImages: updatedFiles.length >= 2,
            }));
            return updatedFiles;
        });

        const previews = [...files, ...newFiles].map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        const previews = newFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);

        setFormValid((prevValid) => ({
            ...prevValid,
            isImages: newFiles.length >= 2,
        }));
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
            navigate("/me/hotel")
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>내정보</tw.Title>
                </tw.TitleWrap>

                <tw.InputWrap>
                    <tw.UpperTag>호텔이름</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidInput, "isName")}
                        value={formData.name}
                        name="name"
                        maxLength={25}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isName}>
                        {formData.name === "" ? "" : formValid.isName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>우편번호</tw.UpperTag>
                    <tw.FlexWrap>
                        <tw.Input onChange={onChangeInput} value={formData.postcode} name="postcode" disabled />
                        <tw.SearchBtn onClick={openDaumAddressModal}>주소검색</tw.SearchBtn>
                    </tw.FlexWrap>
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode}>
                        {formData.postcode === "" ? "" : formValid.isPostcode === false ? "올바른 주소를 입력해주세요." : "올바른 주소입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>주소</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.address} name="address" disabled />
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode} />
                    <tw.UpperTagNon>상세주소</tw.UpperTagNon>
                    <tw.Input onChange={onChangeInput} value={formData.address_detail} name="address_detail" maxLength={30} />
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode} />

                    <tw.UpperTag>사업자등록번호</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidBusinessNum, "isRegNum")}
                        value={formData.reg_num}
                        name="reg_num"
                        maxLength={10}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isRegNum}>
                        {formData.reg_num === "" ? "" : formValid.isRegNum === false ? "올바른 사업자등록번호를 입력해주세요." : "올바른 사업자등록번호입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>은행</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidInput, "isBank")}
                        value={formData.bank}
                        name="bank"
                        maxLength={10}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isBank}>
                        {formData.bank === "" ? "" : formValid.isBank === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>계좌주</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidInput, "isOwner")}
                        value={formData.owner}
                        name="owner"
                        maxLength={20}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isOwner}>
                        {formData.owner === "" ? "" : formValid.isOwner === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>계좌번호</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidAccountNum, "isAccount")}
                        value={formData.account}
                        name="account"
                        maxLength={14}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isAccount}>
                        {formData.account === ""
                            ? ""
                            : formValid.isAccount === false
                            ? "계좌번호 10~14자리를 숫자로만 입력해주세요."
                            : "올바른 계좌번호입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag>사업자등록증 및 통장사본</tw.UpperTag>
                    <tw.UploadWrap onDragOver={onDragOver} onDrop={onDrop}>
                        {imagePreviews.length === 0 && <tw.ImgLabel>이미지를 드래그 앤 드롭하세요.</tw.ImgLabel>}
                        <tw.ImgContainer>
                            {imagePreviews.map((preview, index) => (
                                <tw.ImgOutWrap key={index}>
                                    <tw.RemoveBtn onClick={() => removeFile(index)} style={{ marginLeft: "10px" }}>
                                        삭제
                                    </tw.RemoveBtn>
                                    <tw.ImgWrap>
                                        <tw.Img src={preview} alt={`이미지 미리보기 ${index + 1}`} draggable={false} />
                                    </tw.ImgWrap>
                                </tw.ImgOutWrap>
                            ))}
                        </tw.ImgContainer>
                    </tw.UploadWrap>
                    <tw.UnderTag $validator={formValid.isImages}>
                        {formValid.isImages ? "" : "사업자등록증과 통장사본을 업로드해주세요."}
                    </tw.UnderTag>
                    <tw.RegBtn onClick={onClickRegister} $validator={isFormValid()} disabled={!isFormValid()}>
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
                            setFormValid((prevValid) => ({
                                ...prevValid,
                                isPostcode: checkValidInput(newPostcode)
                            }));
                        }}
                        onClose={closeDaumAddressModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
