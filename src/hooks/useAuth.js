import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
    auth: {
        access_token, 
        user_info: {
            id,
            role
        }
    }  
    */

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; 