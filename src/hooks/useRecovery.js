import { useContext } from "react";
import { RecoveryContext } from "../context/RecoveryProvider";

/*
recoveryState: {
  page,
  email,
}  
*/

const useRecovery = () => {
  return useContext(RecoveryContext);
}

export default useRecovery; 