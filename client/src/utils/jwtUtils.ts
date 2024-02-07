import axios, { AxiosRequestConfig } from 'axios';

const getJwtFromCookie = (): string | null => {
    const cookieArray = document.cookie.split(";")
    for (let cookie of cookieArray) {
        const [key, value] = cookie.split("=").map((c) => c.trim())
        if (key === "jwt") {
            return value
        }
    }
    return null
}

export const frontEndAuthMiddleware = async (config: AxiosRequestConfig) => {
  const jwt = getJwtFromCookie();
  
  if (jwt) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${jwt}`
    };
  }

  return config;
};