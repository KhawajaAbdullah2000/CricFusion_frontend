import React ,{useState,createContext,useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../api/client";

const LoginContext=createContext();



const LoginProvider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [isOrgLoggedIn,setIsOrgLoggedIn]=useState(false)
    const [profile,setProfile]=useState({});
    const [token,setToken]=useState(null);
    const [org_token,setOrgToken]=useState(null);

    const [loginPending,setLoginPending]=useState(false)
    const [contextLeague_id,setContextLeague_id]=useState(null);

const fetchUser=async ()=>{

    const my_token = await AsyncStorage.getItem('token'); // user token
    const orgtoken = await AsyncStorage.getItem('org_token');

    console.log("Token at context provider is: " + my_token);

    if (my_token != null) {
        setToken(my_token);
        setLoginPending(true)
        try {
            console.log("on /profile route in context");
            var res= await client.get('/profile',{
                headers:{
                    Authorization:`JWT ${my_token}`
                }
                   
                });
            
        } catch (error) {
            setLoginPending(false)
            console.log("At profile route"+error.message);
        }
    
        if(res.data.success){
            console.log(res.data.user)
           setProfile(res.data.user)
           setLoginPending(false)
           // console.log("at context provider line 44: "+profile);
            setIsLoggedIn(true)
        
    }
}

    if (orgtoken != null) {
        setOrgToken(orgtoken);
        try {
            setLoginPending(true)
            var res= await client.get('/org-profile',{
                headers:{
                    Authorization:`JWT ${orgtoken}`
                }
                   
                });
            
        } catch (error) {
            setLoginPending(false)
            console.log("At profile route"+error.message);
        }
    
        if(res.data.success){
            console.log(res.data.org)
           setProfile(res.data.org)
           setLoginPending(false)
           // console.log("at context provider line 44: "+profile);
            setIsOrgLoggedIn(true)
        
    }
    }

    if (my_token == null && orgtoken == null) {
        setProfile({});
        setIsLoggedIn(false);
        setIsOrgLoggedIn(false);
        setLoginPending(false);
        setLoginPending(false)
    }
   }

    useEffect(()=>{
        console.log('use effect of login context called');
          fetchUser();
    },[])
            return (
            <LoginContext.Provider
             value={{isLoggedIn,setIsLoggedIn,profile,setProfile,token,setToken,loginPending,setLoginPending,
                isOrgLoggedIn,setIsOrgLoggedIn,contextLeague_id,setContextLeague_id,org_token,setOrgToken}}>
            {children}
            </LoginContext.Provider>
            )
};

export const useLogin=()=>useContext(LoginContext);
export default LoginProvider;