import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
auth: {
    access_token, 
    user_info,
}  
*/

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; 