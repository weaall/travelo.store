import { useState } from "react"
import * as tw from "./ModalLayout.styles"

interface LoginModalProps {
    onClose: () => void
}

function LoginLayout({ onClose }: LoginModalProps) {
    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.CloseBtn onClick={onClose}>X</tw.CloseBtn>
            </tw.ModalWrap>
        </tw.Container>
    )
}

export default LoginLayout
