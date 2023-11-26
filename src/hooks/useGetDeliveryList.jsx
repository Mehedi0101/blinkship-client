import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetDeliveryList = (id) => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryList = [], refetch } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/deliveryman/${id}`);
            return res.data;
        }
    })
    return { deliveryList, refetch };
};

export default useGetDeliveryList;