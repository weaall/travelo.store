/**
 * 이메일 정규표현식 함수
 * @param targetEmail
 */
export const checkValidEmail = (targetEmail: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(targetEmail);
}
/**
 * 비밀번호 영문 숫자 특수기호 조합 8자리 이상 함수
 * @param targetPassword
 */
export const checkValidPassword = (targetPassword: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    return passwordRegex.test(targetPassword);
}
/**
 * 이름 1자리 이상 함수
 * @param targetUserName
 */
export const checkValidUserName = (targetUserName: string): boolean => {
    // 이름이 1자리 이상이며 완성된 한글, 영어, 띄어쓰기만 허용하는 정규식
    const userNameRegex = /^[가-힣a-zA-Z\s]+$/;
    return targetUserName.length >= 1 && userNameRegex.test(targetUserName);
}
/**
 * 전화번호 11자리 이상 함수
 * @param targetPhoneNumber
 */
export const checkValidPhoneNumber = (targetPhoneNumber: string): boolean => {
    const phoneNumberRegex = targetPhoneNumber.length > 10;
    return phoneNumberRegex;
}

/**
 * 전화번호 9자리 이상 함수
 * @param targetPhoneNumber
 */
export const checkValidPhoneNumberNine = (targetPhoneNumber: string): boolean => {
    const phoneNumberRegex = targetPhoneNumber.length > 10;
    return phoneNumberRegex;
}
/**
 * 공란이 아닌지 확인
 * @param targetInput
 */
export const checkValidInput = (targetInput: string): boolean => {
    const inputRegex = targetInput.length > 1;
    return inputRegex;
}
/**
 * 사업자등록번호 10자리 이상 함수
 * @param targetBusinessNum
 */
export const checkValidBusinessNum = (targetBusinessNum: string): boolean => {
    const businessNumRegex = targetBusinessNum.length > 9;
    return businessNumRegex;
}
/**
 * 계좌번호 10자리 이상
 * @param targetAccountNum
 */
export const checkValidAccountNum = (targetAccountNum: string): boolean => {
    const accountNumRegex = targetAccountNum.length > 9;
    return accountNumRegex;
}

export const checkValidMobile = (targetMobile: string): boolean => {
    const mobileRegex  = targetMobile.length > 10;
    return mobileRegex 
}