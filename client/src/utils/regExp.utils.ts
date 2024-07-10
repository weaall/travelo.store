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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    return passwordRegex.test(targetPassword);
}
/**
 * 이름 1자리 이상 함수
 * @param targetUserName
 */
export const checkValidUserName = (targetUserName: string): boolean => {
    const userNameRegex = targetUserName.length > 1;
    return userNameRegex;
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