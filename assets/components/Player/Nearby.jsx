import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
//var MapView = require('react-native-maps');

const Nearby = ({route,navigation}) => {
 


  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold',marginTop:20,marginBottom:50}}>Nearby</Text>
   
   <Text>
   {route.params.latitude}
   </Text>
   <Text>
   {route.params.longitude}
   </Text>
 
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
export default Nearby;
