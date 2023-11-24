import userLinks from "../../links/userLinks";
import logo from "../../assets/logo/BlinkShip-logos_white.png";

const Sidebar = () => {
    const links = userLinks;
    return (
        <div className="bg-primary text-white min-h-screen md:p-5 p-2 sm:w-fit w-1/4">
            <div className="cinzel xl:text-3xl sm:text-2xl text-lg font-black pt-6">
                <img className="w-40 max-w-full" src={logo} alt="" />
            </div>

            <div className="mt-10 flex flex-col gap-4 lg:text-base md:text-base text-xs">
                {
                    links
                }
            </div>
        </div>
    );
};

export default Sidebar;