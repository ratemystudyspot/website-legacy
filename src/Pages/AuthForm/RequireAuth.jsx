import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        (auth?.user_info?.role === process.env.USER_ROLE) // ?.find(role => allowedRoles?.includes(role)) <- checks if role is in the array roles (for future use?)
            ? <Outlet />
            // : auth?.id
            //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;