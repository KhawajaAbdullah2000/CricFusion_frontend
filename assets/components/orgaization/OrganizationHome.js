import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,FlatList} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import client from "../../api/client";

import Logo from '../logo'

export default function OrganizationHome({route,navigation}) {
  const {profile,token}=useLogin();
  const [leagues,setLeagues]=useState([])

  const fetchLeagues= async()=>{
  try {
    const res=await client.get(`/org-leagues/${profile._id}`);
         if(res.data.success){
          setLeagues(res.data.leagues)
      
          }else{
            
          }
  } catch (error) {
    console.log(error.message)
  }
        
        
    }

    useEffect(()=>{
fetchLeagues()
    },[]);

    
    const randomNumber = Math.floor(Math.random() * 3) + 1;
      const imageSources = {
        1: require('../../banner1.jpg'),
        2: require('../../banner2.jpg'),
        3: require('../../banner3.jpg'),
      };

      const renderItem = ({ item }) => (

<View style={styles.card}>
<Image source={imageSources[randomNumber]} style={styles.image} />
<Text style={styles.title}>{item.name}</Text>
<Text style={styles.title}>From: {new Date(item.startsAt).toLocaleDateString('en-US',{
             year: 'numeric',
               month: 'long',
               day: 'numeric',
            })} </Text>


</View>
);


  return (
    <View style={styles.container}>
            <View style={styles.header}>
            <Logo width={200} height={160}/>
                <Text style={styles.welcomeText}>Welcome, {profile.name}</Text>
            </View>
       
            {
              leagues && leagues.length>0 &&(
                <FlatList
       data={leagues}
     renderItem={renderItem}
       keyExtractor={(item) => item._id}/>

              )
            }
           
           
        </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a3d62',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#38ada9',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
   paddingBottom:8,
    textAlign: 'center',
    backgroundColor: '#eee',

  },

});
