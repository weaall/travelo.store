import * as tw from "./Alert.modal.styles";

interface ModalProps {
    onClose: () => void;
    message: string;
}

export default function AlertModal({ onClose, message }: ModalProps) {
    const handleConfirmClick = () => {
        onClose();
    };

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.ContentsWrap>
                    <tw.Message>{message}</tw.Message>
                    <tw.ConfirmBtn onClick={handleConfirmClick}>확인</tw.ConfirmBtn>
                </tw.ContentsWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
