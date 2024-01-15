import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Logo from './logo';
import { useLogin } from '../context/LoginProvider';
import {useEffect} from 'react'
import client from '../api/client';


export default function Home(props) {
  const {token,setIsLoggedIn,setProfile,org_token,setIsOrgLoggedIn}=useLogin()

  const fetchProfile=async()=>{


      try {
        console.log("at fetch profile");
        var res= await client.get('/profile',{
            headers:{
                Authorization:`JWT ${token}`
            }
               
            });
        
    } catch (error) {
        console.log("At profile route"+error.message);
    }
  
    if(res.data.success){
      console.log("At home: "+res.data.user)
     setProfile(res.data.user)
      setIsLoggedIn(true)
        
       }

    

  }

  const fetchOrgProfile=async()=>{
    try {
      var res= await client.get('/org-profile',{
          headers:{
              Authorization:`JWT ${org_token}`
          }
             
          });
      
  } catch (error) {
      console.log("At profile route"+error.message);
  }

  if(res.data.success){
    console.log(res.data.org)
   setProfile(res.data.org)
   setIsOrgLoggedIn(true)
      
     }


  }

  useEffect(()=>{
   if (token!=null){
   fetchProfile()
    }

    if (org_token!=null){
      fetchOrgProfile()
       }


   },[]);


  return (
 
    <View style={styles.container}>
      <Logo width={800} height={260}/>
      <TouchableOpacity style={styles.playbtn} onPress={() =>props.navigation.navigate('login')}>
        <Text>Lets Play</Text>
      </TouchableOpacity>
    </View>
    
  );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        },
        playbtn:{
        backgroundColor:'lightgreen',
        paddingHorizontal:40,
        paddingVertical:15,
        borderRadius:8,
        elevation:8,
        shadowColor:'black',
        }
});
