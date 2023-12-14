import React ,{useState,createContext,useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../api/client";

const LoginContext=createContext();



const LoginProvider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [isOrgLoggedIn,setIsOrgLoggedIn]=useState(false)
    const [profile,setProfile]=useState({});
    const [token,setToken]=useState('');
    const [loginPending,setLoginPending]=useState(false)
    const [contextLeague_id,setContextLeague_id]=useState(null);

    const fetchUser=async ()=>{

   console.log("At fetch user");
   const my_token= await AsyncStorage.getItem('token');
   const org_token= await AsyncStorage.getItem('org_token');
   console.log("TOken automatic is: "+my_token);
   if (my_token!=null){
    setLoginPending(true)
    setToken(my_token)
    console.log("at line 25 of login provider")

    try {
        var res= await client.get('/profile',{
            headers:{
                Authorization:`JWT ${my_token}`
            }
               
            });
        
    } catch (error) {
        console.log("At profile route"+error.message);
    }

    if(res.data.success){
        console.log("at login provider line 40")
        setProfile(res.data.profile)
        setIsLoggedIn(true)
    }else {
        setProfile({})
        setIsLoggedIn(false)
        setLoginPending(false)
    }
 
   }else{
    setProfile({})
    setIsLoggedIn(false)
    setLoginPending(false)
   }

   if(org_token!=null){
    setIsOrgLoggedIn(true)
   }else{
    setProfile({})
    setIsLoggedIn(false)
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
                isOrgLoggedIn,setIsOrgLoggedIn,contextLeague_id,setContextLeague_id}}>
            {children}
            </LoginContext.Provider>
            )
};

export const useLogin=()=>useContext(LoginContext);
export default LoginProvider;