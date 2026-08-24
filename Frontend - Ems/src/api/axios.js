import axios from "axios";

export const AUTH_TOKEN_KEY = "authToken";

axios.defaults.baseURL = "http://localhost:9090/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
    }

    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = error.config?.url || "";
        const isAuthenticationRequest =
            requestUrl.includes("/users/login") ||
            requestUrl.includes("/users/verify-otp");

        if (error.response?.status === 401 && !isAuthenticationRequest) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            window.location.assign("/login");
        }

        return Promise.reject(error);
    }
);

export default axios;