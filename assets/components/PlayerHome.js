import React,{useEffect} from "react";
import { StyleSheet, Text, View} from "react-native";
import { useLogin } from "../context/LoginProvider";


export default function PlayerHome({route,navigation}) {
  const {profile,token}=useLogin();



    //const {routeuser,routetoken}=route.params;
  return (
    <View style={styles.container}>
    <Text style={{fontSize:20,marginTop:60,marginLeft:10}}>Home Page for player {profile.email} </Text>
    <Text style={{fontSize:20,marginTop:60,marginLeft:10}}>City {profile.city} </Text>
    <Text style={{fontSize:20,marginTop:60,marginLeft:10}}>UserID: {profile._id} When user logsin after input </Text>

    <Text>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgreen',
        paddingHorizontal:10
         
    }

});
