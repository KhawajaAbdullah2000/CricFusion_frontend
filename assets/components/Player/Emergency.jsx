import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker,Callout} from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLogin } from '../../context/LoginProvider';
import client from '../../api/client';


const Emergency = ({route,navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {profile}=useLogin();

    const updateLocation=async()=>{
   try {
    const res=await client.put(`/update_location/${profile._id}`,{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude

    });
    if(res.data.success){
      console.log(res.data.message)
    }
   } catch (error) {
    console.log(error.message)
   }
    }


    useEffect(()=>{
      console.log("Calling API to update location in db")
   updateLocation()

    },[location])
    
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []);

  useEffect(()=>{
//api.patch call to update users longitude latitude in mongodb
  },[location])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

   
  }

  const GoToNearby=()=>{
    navigation.navigate('nearby',{
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        id:profile._id
    })
  }
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold',marginTop:20,marginBottom:50}}>Its An Emergency</Text>
        {
        location && (
            <MapView style={{width:'90%',height:'70%'}}
  initialRegion={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}>

<Marker
  coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}/>
  
  </MapView>


        )
      }  
      {
 location && (


      <TouchableOpacity onPress={()=>GoToNearby()} style={{backgroundColor:'#44D177',height:40,justifyContent:'center',width:200,marginTop:30}}>
        <Text style={{textAlign:'center'}}>Find Nearby Players</Text>
      </TouchableOpacity>
 )
}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    }
   
});
export default Emergency;