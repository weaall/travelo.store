import React, { DragEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { checkValidAccountNum, checkValidBusinessNum, checkValidInput, checkValidUserName } from "../../../utils/regExp.utils";
import { uploadFilesToS3NoThumb } from "../../../utils/s3Upload.utils";

import DaumPostcodeModal from "../../../hook/modal/daum-postcode/DaumPostcode.modal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";
import AlertModal from "../../../hook/modal/alert/Alert.modal";
import ConfirmModal from "../../../hook/modal/alert-confirm/Confirm.modal";
import { ModalPortal } from "../../../hook/modal/ModalPortal";

import * as tw from "./HotelRegPage.styles";


export default function HotelRegPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
            formData.name.length !== 0 &&
            formValid.isPostcode &&
            formData.postcode.length !== 0 &&
            formValid.isRegNum &&
            formData.reg_num.length !== 0 &&
            formValid.isBank &&
            formData.bank.length !== 0 &&
            formValid.isAccount &&
            formData.account.length !== 0 &&
            formValid.isOwner &&
            formData.owner.length !== 0 &&
            formValid.isImages &&
            files.length !== 0
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

        const sanitizedValue =
            name === "reg_num"
                ? value
                      .replace(/[^0-9]/g, "")
                      .replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3")
                      .slice(0, 12 + 2) // 하이픈 2개를 고려하여 최대 길이 14자리
                : name === "account"
                ? value.replace(/[^0-9]/g, "")
                : value;

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

    const onClickRegister = async () => {
        setLoading(true);
        try {
            const confirmResult = await openConfirmModal("변경사항을 저장하시겠습니까?");
            if (confirmResult) {
                openLoadingModal();
                const uploadedKeys = await uploadFilesToS3NoThumb(files, `reg_docs/${formData.name}`);

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
                openAlertModal("저장되었습니다.", () => {
                    navigate("/me/hotel");
                });
            }
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setFormValid({
            isName: true,
            isPostcode: true,
            isRegNum: true,
            isBank: true,
            isAccount: true,
            isOwner: true,
            isImages: true,
        });
    }, []);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>호텔등록</tw.Title>
                </tw.TitleWrap>

                <tw.InputWrap>
                    <tw.UpperTag $validator={formValid.isName}>호텔이름</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidInput, "isName")}
                        value={formData.name}
                        name="name"
                        maxLength={25}
                        $validator={formValid.isName}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isName}>
                        {formData.name === "" ? "" : formValid.isName === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isPostcode}>우편번호</tw.UpperTag>
                    <tw.FlexWrap>
                        <tw.Input onChange={onChangeInput} value={formData.postcode} name="postcode" $validator={formValid.isPostcode} disabled />
                        <tw.SearchBtn onClick={openDaumAddressModal}>주소검색</tw.SearchBtn>
                    </tw.FlexWrap>
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode}>
                        {formData.postcode === "" ? "" : formValid.isPostcode === false ? "올바른 주소를 입력해주세요." : "올바른 주소입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isPostcode}>주소</tw.UpperTag>
                    <tw.Input onChange={onChangeInput} value={formData.address} name="address" $validator={formValid.isPostcode} disabled />
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode} />
                    <tw.UpperTagNon>상세주소</tw.UpperTagNon>
                    <tw.Input $validator={formValid.isPostcode} onChange={onChangeInput} value={formData.address_detail} name="address_detail" maxLength={30} />
                    <tw.UnderTag draggable="true" $validator={formValid.isPostcode} />

                    <tw.UpperTag $validator={formValid.isRegNum}>사업자등록번호</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidBusinessNum, "isRegNum")}
                        value={formData.reg_num}
                        name="reg_num"
                        maxLength={10}
                        $validator={formValid.isRegNum}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isRegNum}>
                        {formData.reg_num === "" ? "" : formValid.isRegNum === false ? "올바른 사업자등록번호를 입력해주세요." : "올바른 사업자등록번호입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isBank}>은행</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidInput, "isBank")}
                        value={formData.bank}
                        name="bank"
                        maxLength={12}
                        $validator={formValid.isBank}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isBank}>
                        {formData.bank === "" ? "" : formValid.isBank === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isOwner}>계좌주</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidUserName, "isOwner")}
                        value={formData.owner}
                        name="owner"
                        maxLength={20}
                        $validator={formValid.isOwner}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isOwner}>
                        {formData.owner === "" ? "" : formValid.isOwner === false ? "올바른 이름을 입력해주세요." : "올바른 이름입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isAccount}>계좌번호</tw.UpperTag>
                    <tw.Input
                        onChange={onChangeInput}
                        onInput={(e) => handleInput(e, checkValidAccountNum, "isAccount")}
                        value={formData.account}
                        name="account"
                        maxLength={14}
                        $validator={formValid.isAccount}
                    />
                    <tw.UnderTag draggable="true" $validator={formValid.isAccount}>
                        {formData.account === ""
                            ? ""
                            : formValid.isAccount === false
                            ? "계좌번호 10~14자리를 숫자로만 입력해주세요."
                            : "올바른 계좌번호입니다."}
                    </tw.UnderTag>

                    <tw.UpperTag $validator={formValid.isImages}>사업자등록증 및 통장사본</tw.UpperTag>
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
                    <tw.UnderTag $validator={formValid.isImages}>{formValid.isImages ? "" : "사업자등록증과 통장사본을 업로드해주세요."}</tw.UnderTag>
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
                                isPostcode: checkValidInput(newPostcode),
                            }));
                        }}
                        onClose={closeDaumAddressModal}
                    />
                </ModalPortal>
            )}

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
