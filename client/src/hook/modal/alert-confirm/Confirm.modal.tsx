import React, { useState } from "react";
import * as tw from "./Confirm.modal.styles";

interface ModalProps {
    onClose: (confirmed: boolean) => void;
    message: string;
}

export default function ConfirmModal({ onClose, message }: ModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleConfirmClick = () => {
        triggerCloseAnimation(true);
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

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.ContentsWrap>
                    <tw.Message>{message}</tw.Message>
                    <tw.BtnWrap>
                        <tw.ConfirmBtn onClick={handleConfirmClick}>확인</tw.ConfirmBtn>
                        <tw.CancelBtn onClick={handleCancelClick}>취소</tw.CancelBtn>
                    </tw.BtnWrap>
                </tw.ContentsWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
