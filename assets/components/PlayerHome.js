import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PlayerHome({route,navigation}) {
    const {user,token}=route.params;
  return (
    <View style={styles.container}>
    <Text style={{fontSize:20,marginTop:60,marginLeft:10}}>Home Page for player {user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgreen',
         
    }

});
