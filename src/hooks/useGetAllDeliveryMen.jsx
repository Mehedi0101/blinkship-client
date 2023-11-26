import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryMen = [], refetch } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverymen');
            return res.data;
        }
    })
    return { deliveryMen, refetch };
};

export default useGetAllDeliveryMen;