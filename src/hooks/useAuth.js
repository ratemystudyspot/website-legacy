import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
auth: {
    access_token, 
    roles,
}  
*/

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; 