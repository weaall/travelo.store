import axios, { AxiosError } from "axios";

const URL = process.env.REACT_APP_BASE_URL;

const baseURL = URL;
const axiosInstance = axios.create({
    baseURL,
});

const handleAxiosError = (error: any, navigate: (to: string) => void) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            if (status === 400) {
                window.alert("요청이 잘못되었습니다.");
                navigate("/");
            } else if (status === 401) {
                window.alert("올바른 접근이 아닙니다.");
                navigate("/");
            } else if (status === 403) {
                window.alert("올바른 접근이 아닙니다.");
                navigate("/");
            } else if (status === 404) {
                window.alert("올바른 접근이 아닙니다.");
                navigate("/");
            } else if (status === 409) {
                window.alert("올바른 접근이 아닙니다.");
                navigate("/");
            } else if (status >= 500) {
                window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                navigate("/");
            }
        } else {
            window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            navigate("/");
        }
    }
};

export { axios, axiosInstance, handleAxiosError };