import React from "react"

interface LoginModalProps {
    onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const REST_API_KEY = "b517102fd48b9146ce57e06961774d4d"
    const REDIRECT_URI = "http://localhost:3000/main"
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return (
        <div className="absolute top-0">
            <div>
                <h3>아이디와 비밀번호 모두 입력해주세요.</h3>
                <button type="button" onClick={onClose}>
                    닫기
                </button>

                <div>
                    <iframe title="Kakao Login" src={link} width="100%" height="500px" />
                </div>
            </div>
        </div>
    )
}

export default LoginModal
