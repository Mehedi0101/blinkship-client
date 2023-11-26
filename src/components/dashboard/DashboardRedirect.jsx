import { useNavigate } from "react-router-dom";
import useDetermineUserType from "../../hooks/useDetermineUserType";
import { useEffect } from "react";

const DashboardRedirect = () => {
    const navigate = useNavigate();
    const { userType } = useDetermineUserType();

    useEffect(() => {
        if (userType === 'user') {
            navigate('/dashboard/my-profile');
        }
        else if (userType === 'admin') {
            navigate('/dashboard/statistics');
        }
        else if (userType === 'deliveryMen') {
            navigate('/dashboard/my-delivery-list');
        }
    }, [navigate, userType])

};

export default DashboardRedirect;