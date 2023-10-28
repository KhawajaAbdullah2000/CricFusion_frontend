import React ,{useState,createContext,useContext} from "react";


const LoginContext=createContext();



const LoginProvider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [profile,setProfile]=useState({});
    const [token,setToken]=useState('');
    const [loginPending,setLoginPending]=useState(false)
            return (
            <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,profile,setProfile,token,setToken,loginPending,setLoginPending}}>
            {children}
            </LoginContext.Provider>
            )
};

export const useLogin=()=>useContext(LoginContext);
export default LoginProvider;