import axios from "axios";

const BASE_URL = "http://localhost:9090/api/dashboard";

export const getDashboardData = () => {

    return axios.get(BASE_URL);

};