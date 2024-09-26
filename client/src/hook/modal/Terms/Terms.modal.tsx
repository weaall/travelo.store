import { useState } from "react"
import * as tw from "./Terms.modal.styles"

interface LoginModalProps {
    onClose: () => void
}

export default function Terms({ onClose }: LoginModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = () => {
        triggerCloseAnimation();
    };

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.CloseBtn onClick={handleCloseClick }>
                    <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                </tw.CloseBtn>
                <tw.Title>Terms & Conditions</tw.Title>
            </tw.ModalWrap>
        </tw.Container>
    )
}
