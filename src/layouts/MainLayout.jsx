import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
    return (
        <div className="font-sans">
            <Navbar></Navbar>
            <div className="min-h-[60vh]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;