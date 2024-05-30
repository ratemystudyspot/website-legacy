import { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    /*
    auth: {
        email, 
        roles
    }  
    */

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider,
}