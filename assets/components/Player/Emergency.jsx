import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
//var MapView = require('react-native-maps');

const Emergency = ({route,navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
      
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
  coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}

/>


  </MapView>


        )
      }  
      {
 location && (


      <TouchableOpacity onPress={()=>GoToNearby()} style={{backgroundColor:'yellow',height:40,justifyContent:'center',width:200,marginTop:30}}>
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
    },
});
export default Emergency;