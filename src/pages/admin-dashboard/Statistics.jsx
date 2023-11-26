import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Statistics = () => {
    document.title = "Statistics";
    const [stats, setStats] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/adminStats')
            .then(res => setStats(res.data))
            .catch(() => setStats([]))
    }, [axiosSecure])

    console.log(stats);

    return (
        <div className="w-full min-h-[80vh] flex justify-center items-center">
            <BarChart
                width={600}
                height={400}
                data={stats}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" activeBar={<Rectangle />} />
            </BarChart>
        </div>
    );
};

export default Statistics;