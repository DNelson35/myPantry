import { useContext } from "react";
import { userContext } from "../context/userContext";

function useUserContext() {

  return (useContext(userContext))
  
}

export default useUserContext