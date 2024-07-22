import { body, query, param } from "express-validator";

export const userValidator = {
    putMyInfo: [
        body("name")
            .notEmpty()
            .withMessage("이름을 입력해주세요")
            .trim()
            .matches(/^[가-힣a-zA-Z\s]+$/)
            .isLength({ min: 2, max: 20 })
            .withMessage("이름은 2자에서 20자 사이어야 합니다."),
        body("email")
            .notEmpty()
            .withMessage("이메일을 입력해주세요")
            .trim()
            .isEmail()
            .withMessage("이메일 형식이 올바르지 않습니다. 예시: travel@travel.co.kr"),
        body("mobile")
            .notEmpty()
            .withMessage("전화번호를 입력해주세요")
            .matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
            .withMessage("전화번호 형식이 올바르지 않습니다. 예시: 010-1234-5678")
            .isLength({ min: 13, max: 13 })
            .withMessage("전화번호는 최소 13자리여야 합니다. (하이픈 포함)"),
    ],
    getNameByUserId: [
        param("id").notEmpty().trim(),
    ],
    checkEmail: [
        param("id").notEmpty().trim(),
    ],
};
