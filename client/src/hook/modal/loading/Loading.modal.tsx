import { useState } from "react"
import * as tw from "./Loading.modal.styles"

interface LoadingModalProps {
    onClose: () => void
}

export default function LoadingModal({ onClose }: LoadingModalProps) {
    return (
        <tw.Container>
            <tw.LoadingSvg alt="" src={require("../../../assets/svg/loading.svg").default}></tw.LoadingSvg>
        </tw.Container>
    )
}
