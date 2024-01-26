import axios from "axios"

const URL = process.env.REACT_APP_BASE_URL

const baseURL = URL
const axiosInstance = axios.create({
    baseURL,
})

export { axios, axiosInstance }
