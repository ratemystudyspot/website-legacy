import { createContext, useState } from "react";

const RecoveryContext = createContext({});

const RecoveryProvider = ({ children }) => {
  const [recoveryState, setRecoveryState] = useState({page:"login",email:""});

  /*
  recoveryState: {
    page,
    email,
  }  
  */

  return (
      <RecoveryContext.Provider value={{ recoveryState, setRecoveryState }}>
          {children}
      </RecoveryContext.Provider>
  )
}

export {
  RecoveryContext,
  RecoveryProvider
}