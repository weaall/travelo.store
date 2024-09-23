import { useState } from "react";
import * as tw from "./ConfirmEmail.modal.styles";

interface ModalProps {
    onClose: (confirmed: boolean) => void;
    verification: string;
}

export default function ConfirmEmailModal({ onClose, verification } : ModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [codeValid, setCodeValid] = useState(true);
    
    const handleConfirmClick = () => {
        if (verification == inputValue) {
            triggerCloseAnimation(true);
        } else {
            setCodeValid(false)
        }
    };

    const handleCancelClick = () => {
        triggerCloseAnimation(false);
    };

    const triggerCloseAnimation = (confirmed: boolean) => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(confirmed);
        }, 500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Z0-9]*$/.test(value)) {
            setInputValue(value);
        }
    };

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.ContentsWrap>
                    <tw.Message>이메일 인증</tw.Message>
                    <tw.Input maxLength={6} value={inputValue} onChange={handleInputChange} />
                    <tw.UnderTag $valid={codeValid} >인증번호가 일치하지 않습니다.</tw.UnderTag>
                    <tw.BtnWrap>
                        <tw.CancelBtn onClick={handleCancelClick}>취소</tw.CancelBtn>
                        <tw.ConfirmBtn onClick={handleConfirmClick}>확인</tw.ConfirmBtn>
                    </tw.BtnWrap>
                </tw.ContentsWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
