import * as tw from "./Loading.modal.styles";
import { SvgSpinner } from "../../../assets/spinner";

interface LoadingModalProps {
    onClose: () => void;
}

export default function LoadingModal({ onClose }: LoadingModalProps) {
    return (
        <tw.Container>
            <tw.ModalWrap>
                <SvgSpinner />
            </tw.ModalWrap>
        </tw.Container>
    );
}
