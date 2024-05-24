import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
auth: {
    id, 
    email, 
    pwd, 
    roles
}  
*/

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth; 