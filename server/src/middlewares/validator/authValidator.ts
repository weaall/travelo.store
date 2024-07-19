import { body } from "express-validator";

export const authValidator = {
    signUp: [
        body("email")
            .notEmpty()
            .withMessage("이메일을 입력해주세요")
            .trim()
            .isEmail()
            .withMessage("이메일 형식이 올바르지 않습니다. 예시: travel@travel.co.kr"),

        body("password")
            .notEmpty()
            .withMessage("비밀번호를 입력해주세요")
            .trim()
            .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/)
            .withMessage("비밀번호는 8자에서 16자 사이이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다."),

        body("name")
            .notEmpty()
            .withMessage("이름을 입력해주세요")
            .trim()
            .matches(/^[가-힣a-zA-Z\s]+$/)
            .isLength({ min: 2, max: 20 })
            .withMessage("이름은 2자에서 20자 사이어야 합니다."),

        body("mobile")
            .notEmpty()
            .withMessage("전화번호를 입력해주세요")
            .matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
            .withMessage("전화번호 형식이 올바르지 않습니다. 예시: 010-1234-5678")
            .isLength({ min: 13, max: 13 })
            .withMessage("전화번호는 최소 13자리여야 합니다. (하이픈 포함)"),
    ],

    signIn: [
        body("email")
            .notEmpty()
            .withMessage("이메일을 입력해주세요")
            .trim()
            .isEmail()
            .withMessage("이메일 형식이 올바르지 않습니다. 예시: travel@travel.co.kr"),

        body("password")
            .notEmpty()
            .withMessage("비밀번호를 입력해주세요")
            .trim()
            .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/)
            .withMessage("비밀번호는 8자에서 16자 사이이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다."),
    ],

    signInByKakao: [
        body("id")
            .notEmpty()
            .withMessage("카카오아이디를 입력해주세요.")
            .trim()
            .isNumeric()
            .withMessage("카카오아이디의 형식이 올바르지 않습니다."),
    ],

    signInByNaver: [
        body("token")
            .notEmpty()
            .withMessage("네이버토큰을 입력해주세요.")
            .trim()
            .withMessage("네이버토큰의 형식이 올바르지 않습니다.")
    ],

    signInByNaverCallback: [
        body("code")
            .notEmpty()
            .withMessage("네이버토큰을 입력해주세요.")
            .trim()
            .withMessage("네이버토큰의 형식이 올바르지 않습니다."),

        body("state")
            .notEmpty()
            .withMessage("네이버토큰을 입력해주세요.")
            .trim()
            .isBoolean()
            .withMessage("네이버토큰의 형식이 올바르지 않습니다.")
    ],

    presignedUrl: [
        body("key")
            .notEmpty()
            .trim(),
    
        body("contentType")
            .notEmpty()
            .trim()
    ],
};
