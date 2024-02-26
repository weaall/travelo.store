import { useEffect, useState } from "react"
import * as tw from "./HotelReg.styles"
import { sendJWT } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { RegHotelProps } from "../../interface/interfaces"

export default function HotelReg() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<RegHotelProps>({
        name: "",
        address: "",
        address_detail: "",
        postcode: 0,
        reg_num: 0,
        bank: "",
        account: 0,
        owner: "",
    })

    const [file, setFile] = useState<File>();

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile);
      };


    const onClickRegister = async () => {
        try {

            const regData = new FormData()
            regData.append("images", file as Blob)
            regData.append("data", JSON.stringify(formData))

            const config = await sendJWT({
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
                method: "post",
                url: "/hotel/reg",
                data: regData
            })


            const response = await axiosInstance.request(config)
            window.alert(response)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.")
                } else {
                    window.alert("올바른 접근이 아닙니다.")
                }
            }
        }
    }

    useEffect(() => {
    }, [])
    return (
        <tw.Container>
            <tw.InputWrap>
                <tw.UpperTag>호텔이름</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.name} name="name"/>
                <tw.UpperTag>주소</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.address} name="address"/>
                <tw.UpperTag>상세주소</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.address_detail} name="address_detail"/>
                <tw.UpperTag>우편번호</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.postcode} name="postcode"/>
                <tw.UpperTag>사업자등록번호</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.reg_num} name="reg_num"/>
                <tw.UpperTag>은행</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.bank} name="bank"/>
                <tw.UpperTag>계좌주</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.owner} name="owner"/>
                <tw.UpperTag>계좌번호</tw.UpperTag>
                <tw.Input onChange={onChangeInput} value={formData.account} name="account"/>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <tw.RegBtn onClick={onClickRegister} $validator={true} disabled={false}>
                    호텔등록
                </tw.RegBtn>
            </tw.InputWrap>
        </tw.Container>
    )
}
