import { useState } from "react"

import * as tw from "./SearchPerson.modal.styles"


interface ModalProps {
    onClose: (selectedPerson: { adult: number, child: number }) => void;
    adult: number;
    child: number;
}

export default function SearchPersonModal({ onClose, adult, child}: ModalProps) {

    const [personValue, setPersonValue] = useState({
        adult: adult,
        child: child
    });


    const validator = () => {
        if (personValue.adult > 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleIncrement = (type: string) => {
        const newValue = type === "adult" ? Math.min(personValue.adult + 1, 30) : Math.min(personValue.child + 1, 10);
        setPersonValue((prevState) => ({
            ...prevState,
            [type]: newValue,
        }));
    };
    
    const handleDecrement = (type: string) => {
        const newValue = type === "adult" ? Math.max(personValue.adult - 1, 1) : Math.max(personValue.child - 1, 0);
        setPersonValue((prevState) => ({
            ...prevState,
            [type]: newValue,
        }));
    };


    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={() => onClose({ adult, child })}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>인원 선택</tw.Title>
                </tw.TitleWrap>

                <tw.InputWrap>
                    <tw.ListWrap>
                        <tw.Label>성인</tw.Label>
                        <tw.BtnWrap>
                            <tw.MinusBtn onClick={()=>handleDecrement("adult")}>
                                <tw.BtnSvg alt="" src={require("../../../assets/svg/minus_icon.svg").default} />
                            </tw.MinusBtn>
                            <tw.Label>{personValue.adult}</tw.Label>
                            <tw.PlusBtn onClick={()=>handleIncrement("adult")}>
                                <tw.BtnSvg alt="" src={require("../../../assets/svg/plus_icon.svg").default} />
                            </tw.PlusBtn>
                        </tw.BtnWrap>
                    </tw.ListWrap>

                    <tw.ListWrap>
                        <tw.Label>아동</tw.Label>
                        <tw.BtnWrap>
                            <tw.MinusBtn onClick={()=>handleDecrement("child")}>
                                <tw.BtnSvg alt="" src={require("../../../assets/svg/minus_icon.svg").default} />
                            </tw.MinusBtn>
                            <tw.Label>{personValue.child}</tw.Label>
                            <tw.PlusBtn onClick={()=>handleIncrement("child")}>
                                <tw.BtnSvg alt="" src={require("../../../assets/svg/plus_icon.svg").default} />
                            </tw.PlusBtn>
                        </tw.BtnWrap>
                    </tw.ListWrap>
                </tw.InputWrap>

                <tw.RegWrap>
                    <tw.RegBtn onClick={() => onClose(personValue)} $validator={validator()}>
                        확인
                    </tw.RegBtn>
                </tw.RegWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
