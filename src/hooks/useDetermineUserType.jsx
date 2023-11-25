import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useDetermineUserType = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);

    const { data: userType = "" } = useQuery({
        queryKey: ['userType', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/users/type/${currentUser?.email}`);
                return res.data.role;
            }
            else{
                return "";
            }
        }
    })
    return { userType };
};

export default useDetermineUserType;