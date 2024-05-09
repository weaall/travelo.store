import * as styled from "./Loading.styles"

function Loading() {
    return (
        <styled.Container>
            <styled.LoadingSvg alt="" src={require("../../assets/svg/loading.svg").default}></styled.LoadingSvg>
        </styled.Container>
    )
}

export default Loading
