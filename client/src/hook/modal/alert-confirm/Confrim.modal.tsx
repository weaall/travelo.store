import * as tw from "./Confrim.modal.styles";

interface ModalProps {
    onClose: (confirmed: boolean) => void;
    message: string;
}

export default function ConfirmModal({ onClose, message }: ModalProps) {
    const handleConfirmClick = () => {
        onClose(true);
    };

    const handleCancelClick = () => {
        onClose(false);
    };

    return (
        <tw.Container>
            <tw.ModalWrap>
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