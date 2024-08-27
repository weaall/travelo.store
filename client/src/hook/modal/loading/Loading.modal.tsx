import * as tw from "./Loading.modal.styles";
import type { SVGProps } from "react";

interface LoadingModalProps {
    onClose: () => void;
}

function SvgSpinner(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" {...props}>
            <circle cx={4} cy={12} r={3} fill="#ffffff">
                <animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3"></animate>
            </circle>
            <circle cx={12} cy={12} r={3} fill="#ffffff">
                <animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3"></animate>
            </circle>
            <circle cx={20} cy={12} r={3} fill="#ffffff">
                <animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3"></animate>
            </circle>
        </svg>
    );
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
