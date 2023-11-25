import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useGetUserData = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['userData', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/users/${currentUser?.email}`);
                return res.data;
            }
            else {
                return {};
            }
        }
    })
    return { userData, refetch };
};

export default useGetUserData;