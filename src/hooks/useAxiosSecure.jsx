import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://blink-ship-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;