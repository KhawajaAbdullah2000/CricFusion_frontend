import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { useLogin } from "../../context/LoginProvider";


export default function PlayerHome({route,navigation}) {
  const {profile,token}=useLogin();


    //const {routeuser,routetoken}=route.params;
  return (
    <View style={styles.container}>

    <Text style={{fontWeight:'bold',fontSize:50,textAlign:'center'}}>Welcome back to CricFusion</Text>

 
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'center'
         
    }

});
