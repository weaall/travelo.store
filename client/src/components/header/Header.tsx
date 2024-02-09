import * as tw from "./Header.styles"

export default function Header() {
    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.NavWrap>
                    <tw.GnbBtn>
                        <tw.GnbSvg alt="" src={require("../../assets/svg/spinner.svg").default}></tw.GnbSvg>
                    </tw.GnbBtn>
                    <tw.NavHome>weaall Dev</tw.NavHome>
                    <tw.GnbBtn>
                        <tw.GnbSvg alt="" src={require("../../assets/svg/user_icon.svg").default}></tw.GnbSvg>
                    </tw.GnbBtn>
                </tw.NavWrap>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
