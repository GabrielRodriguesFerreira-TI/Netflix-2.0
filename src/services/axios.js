import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 4000
})

export default api