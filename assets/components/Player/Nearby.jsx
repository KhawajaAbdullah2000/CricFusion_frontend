import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import client from '../../api/client';
import Apploader from '../Apploader';
import { useLogin } from '../../context/LoginProvider';
//var MapView = require('react-native-maps');

const Nearby = ({route,navigation}) => {

  const [players,setPlayers]=useState([]);
  const {loginPending,setLoginPending}=useLogin();

  useEffect(()=>{
   // console.log("At use Effect ")
fetchNearby();
  },[])
 const fetchNearby=async()=>{
  setLoginPending(true)
 try {
  const res=await client.get(`/getNearBy/${route.params.id}`)
  if(res.data.success){
    setPlayers(res.data.recommendedPlayers);
    //console.log(res.data.recommendedPlayers);
    setLoginPending(false)
  }
  
 } catch (error) {
  console.log(error.message)
  setLoginPending(false)
 }

 }

 const CheckPlayer=(id)=>{
  navigation.navigate('nearby_profile',{
    id:id
  })
 }



  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold',marginTop:20,marginBottom:50}}>Finding you Nearby players</Text>
      {
        loginPending? <Apploader/>:null
      }
      {
        players && players.length>0 &&(
          <MapView style={{width:'100%',height:'70%'}}
          initialRegion={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        
        <Marker coordinate={{latitude:route.params.latitude, longitude: route.params.longitude}}/>

       {
        players.map((player)=>{
          return (
          
          <Marker key={player._id} onPress={()=>CheckPlayer(player._id)} coordinate={{latitude:player.latitude, longitude: player.longitude}}>
          <View style={styles.markerView}>
          <Text style={styles.markerText}>Name: {player.first_name} {player.last_name}</Text>
          <Text style={styles.markerText}>{player.travelTime} away</Text>
        </View>
          </Marker>
       
          );

        })
       }
          
          </MapView>
        
        )
      }

   
 
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    
    },
    markerView: {
      backgroundColor: "#44D177",
      padding: 10,
      borderRadius: 5,
    },
    markerText: {
      color: "white",
      fontWeight: "bold",
    }
 
});
export default Nearby;
