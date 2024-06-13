import { useNavigate } from "react-router-dom";
import * as tw from "./Fail.styles";

export function FailPage() {
    const navigate = useNavigate();

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ImgWrap>
                    <tw.Img alt="닫기 버튼" src={require("../../../assets/webp/fail.svg").default} />
                </tw.ImgWrap>
                <tw.LabelWrap>
                    <tw.Label>결제에 실패했습니다.</tw.Label>
                    <tw.ExpWrap>
                        <tw.ExpLabel>다음과 같은경우에 결제가 정상적으로 진행되지 않을 수 있어요!</tw.ExpLabel>
                        <tw.Text>- 결제중 서버와의 연결이 끊긴 경우</tw.Text>
                        <tw.Text>- 결제중 객실의 가격이 변경된 경우</tw.Text>
                        <tw.Text>- 결제중 객실이 소진된 경우</tw.Text>
                    </tw.ExpWrap>
                </tw.LabelWrap>
                <tw.ReturnBtn onClick={()=>navigate("/")}>되돌아가기</tw.ReturnBtn>
            </tw.ContentsWrap>
        </tw.Container>
    );
}