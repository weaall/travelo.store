import * as tw from "./Me.styles"

export default function Me(){
    return<tw.Container>
        <tw.InputWrap>
            <tw.UpperTag>Email</tw.UpperTag>
            <tw.Input/>
            <tw.UpperTag>Name</tw.UpperTag>
            <tw.Input/>
            <tw.UpperTag></tw.UpperTag>
            <tw.Input/>
            <tw.UpperTag></tw.UpperTag>
            <tw.Input/>
            <tw.UpperTag></tw.UpperTag>
            <tw.Input/>
            <tw.UpperTag></tw.UpperTag>
            <tw.Input/>
        </tw.InputWrap>
    </tw.Container>
}