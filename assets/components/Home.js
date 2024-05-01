import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView,Image } from 'react-native';
import Logo from './logo';
import { useLogin } from '../context/LoginProvider';
import {useEffect} from 'react'
import client from '../api/client';
import Apploader from './Apploader';


export default function Home(props) {
  const {token,setIsLoggedIn,setProfile,org_token,setIsOrgLoggedIn,loginPending,setLoginPending}=useLogin()

  const fetchProfile=async()=>{


      try {
        console.log("at fetch profile");
        setLoginPending(true)
        var res= await client.get('/profile',{
            headers:{
                Authorization:`JWT ${token}`
            }
               
            });
        
    } catch (error) {
      setLoginPending(false)
        console.log("At profile route"+error.message);
    }
  
    if(res.data.success){
      console.log("At home: "+res.data.user)
     setProfile(res.data.user)
     setLoginPending(false)

      setIsLoggedIn(true)
        
       }
       setLoginPending(false)

    

  }

  const fetchOrgProfile=async()=>{
    try {
      setLoginPending(true)
      var res= await client.get('/org-profile',{
          headers:{
              Authorization:`JWT ${org_token}`
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
   setIsOrgLoggedIn(true)
      
     }
     setLoginPending(false)


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
 
    // <View style={styles.container}>
    //   <Logo width={800} height={260}/>
    //   <TouchableOpacity style={styles.playbtn} onPress={() =>props.navigation.navigate('login')}>
    //     <Text>Lets Play</Text>
    //   </TouchableOpacity>
    //   {
    //     loginPending? <Apploader/>:null
    // }
    // </View>
    <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
              <Logo width={800} height={260}/>
            </View>
            <Text style={styles.title}>Welcome to Cricfusion</Text>
            <Text style={styles.subtitle}>Your ultimate cricket companion</Text>
            <TouchableOpacity style={styles.playButton} onPress={() => props.navigation.navigate('login')}>
                <Text style={styles.playButtonText}>Let's Play</Text>
            </TouchableOpacity>
        </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  
  container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0a3d62',
    },
    subtitle: {
        fontSize: 16,
        color: '#3c6382',
        marginBottom: 20,
    },
    playButton: {
        backgroundColor: '#44D177',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 2, // Only for Android
        shadowColor: '#000', // Only for iOS
        shadowOffset: { width: 0, height: 1 }, // Only for iOS
        shadowOpacity: 0.2, // Only for iOS
        shadowRadius: 1.41, // Only for iOS
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    }


    // container: {
    //     flex:1,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     },
    //     playbtn:{
    //     backgroundColor:'#7ED957',
    //     paddingHorizontal:40,
    //     paddingVertical:15,
    //     borderRadius:8,
    //     elevation:8,
    //     shadowColor:'black',
    //     }
});
