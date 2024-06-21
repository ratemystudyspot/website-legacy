import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        (auth?.roles === 2004) // ?.find(role => allowedRoles?.includes(role)) <- checks if role is in the array roles (for future use?)
            ? <Outlet />
            // : auth?.id
            //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;