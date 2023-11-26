import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../utils/scrollToTop";

const MainLayout = () => {
    return (
        <div className="font-sans">
            <ScrollToTop />
            <Navbar></Navbar>
            <div className="min-h-[60vh]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;