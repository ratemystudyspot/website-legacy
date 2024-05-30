import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
auth: {
    email, 
    roles,
}  
*/

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; 