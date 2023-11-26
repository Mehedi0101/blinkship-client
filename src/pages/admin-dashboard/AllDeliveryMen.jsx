import useGetAllDeliveryMen from "../../hooks/useGetAllDeliveryMen";

const AllDeliveryMen = () => {
    document.title = "All Deliverymen";
    const { deliveryMen } = useGetAllDeliveryMen();

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>All Deliverymen</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Number of Deliverymen: {deliveryMen.length}</p>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Contact no.</th>
                            <th>Parcel Delivered</th>
                            <th>Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryMen?.map((staff, idx) => <tr key={staff._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {staff?.name}
                                </td>
                                <td>
                                    {staff?.phone}
                                </td>
                                <td>
                                    {staff?.parcelCount}
                                </td>
                                <td>
                                    <span className={`px-3 py-1 rounded font-bold ${staff?.review <= 1 ? "bg-[#ff8c5a]" : ""} ${staff?.review <= 2 && staff?.review > 1 ? "bg-[#ffb234]" : ""} ${staff?.review <= 3 && staff?.review > 2 ? "bg-[#ffd934]" : ""} ${staff?.review <= 4 && staff?.review > 3 ? "bg-[#add633]" : ""} ${staff?.review <= 5 && staff?.review > 4 ? "bg-[#a0c15a]" : ""}`}>{staff?.review.toFixed(2)}</span>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;