import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./LoadingPage";
import Unauthorized from "./Unauthorized";
import { checkAccessTokenExpiry } from "../../Services/auth";

const RequireAuth = ({ authLoaded, setAuthLoaded, allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const [seconds, setSeconds] = useState(2); // init countdown to 2 seconds

    // check if access token valid, if it is: nothing happens; otherwise: signal to handleRefreshToken
    useEffect(() => {
        const expired = checkAccessTokenExpiry(auth, setAuth);
        if (expired) window.location.reload(); // reloading automatically handles RT b/c RT handled in App.js
    }, []);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [seconds]);

    return (
        (authLoaded)
            ? (auth?.user_info?.role.toString() === process.env.REACT_APP_USER_ROLE) // ?.find(role => allowedRoles?.includes(role)) <- checks if role is in the array roles (for future use?)
                ? <Outlet />
                // : auth?.id
                //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
            : (seconds === 0) // FIXME: temporary fix for the sudden unauthorization page popup (ex. happens after reloading settings page)
                ? <Unauthorized />
                : (null)
    );
}

export default RequireAuth;