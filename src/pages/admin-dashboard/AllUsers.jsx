import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
    document.title = "All Users";
    const { users, refetch } = useGetAllUsers();
    const axiosSecure = useAxiosSecure();

    const handleMakeDeliveryman = id => {
        const toastId = toast.loading('Updating role...');
        axiosSecure.patch(`/users/admin/update/${id}`, { role: 'deliveryMen' })
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success('Role Updated Successfully', { id: toastId });
                    refetch();
                }
                else {
                    toast.error('Try again later', { id: toastId });
                }
            })
    }

    const handleMakeAdmin = id => {
        const toastId = toast.loading('Updating role...');
        axiosSecure.patch(`/users/admin/update/${id}`, { role: 'admin' })
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success('Role Updated Successfully', { id: toastId });
                    refetch();
                }
                else {
                    toast.error('Try again later', { id: toastId });
                }
            })
    }

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>All Users</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Number of Users: {users.length}</p>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Contact no.</th>
                            <th>Make deliveryman</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, idx) => <tr key={user._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {user?.name}
                                </td>
                                <td>
                                    {user?.phone}
                                </td>
                                <td>
                                    <button onClick={() => handleMakeDeliveryman(user?._id)} className="p-2 bg-fuchsia-500 text-white rounded disabled:bg-slate-500" disabled={user?.role === 'deliveryMen' ? true : false || user?.role === 'admin' ? true : false}><MdOutlineDeliveryDining /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleMakeAdmin(user?._id)} className="p-2 bg-primary text-white rounded disabled:bg-slate-500" disabled={user?.role === 'admin' ? true : false}><RiAdminFill /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;