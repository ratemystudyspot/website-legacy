import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        (auth?.user_info?.role.toString() === process.env.REACT_APP_USER_ROLE) // ?.find(role => allowedRoles?.includes(role)) <- checks if role is in the array roles (for future use?)
            ? <Outlet />
            // : auth?.id
            //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;