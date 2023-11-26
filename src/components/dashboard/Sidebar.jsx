import userLinks from "../../links/userLinks";
import logo from "../../assets/logo/BlinkShip-logos_white.png";
import { Link } from "react-router-dom";
import useDetermineUserType from "../../hooks/useDetermineUserType";
import { useEffect, useState } from "react";
import deliveryMenLinks from "../../links/deliveryMenLinks";
import adminLinks from "../../links/adminLinks";

const Sidebar = () => {
    const [links, setLinks] = useState(<></>);
    const { userType } = useDetermineUserType();

    useEffect(() => {
        if (userType === 'user') {
            setLinks(userLinks);
        }
        else if (userType === 'deliveryMen') {
            setLinks(deliveryMenLinks);
        }
        else if (userType === 'admin') {
            setLinks(adminLinks);
        }
    }, [userType])

    return (
        <div className="bg-primary text-white min-h-screen md:p-5 p-2 sm:w-fit w-1/4">
            <div className="cinzel xl:text-3xl sm:text-2xl text-lg font-black pt-6">
                <Link to='/'><img className="w-40 max-w-full" src={logo} alt="" /></Link>
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