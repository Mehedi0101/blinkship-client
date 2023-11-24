import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashBoard = () => {
    return (
        <div className="max-w-screen-2xl mx-auto flex">
            <Sidebar />

            <div className="flex-1 mt-7 p-10">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashBoard;