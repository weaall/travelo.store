import { useState } from "react"
import * as tw from "../ModalLayout.styles"

interface LoginModalProps {
    onClose: () => void
}

export default function Terms({ onClose }: LoginModalProps) {
    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.CloseBtn onClick={onClose}>
                    <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                </tw.CloseBtn>
                <tw.Title>Terms & Conditions</tw.Title>
            </tw.ModalWrap>
        </tw.Container>
    )
}
