import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useGetParcelData = () => {
    const { currentUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcelData = [], refetch } = useQuery({
        queryKey: ['parcelData', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/parcels/email/${currentUser?.email}`);
                return res.data;
            }
            else {
                return [];
            }
        }
    })
    return { parcelData, refetch };
};

export default useGetParcelData;