
import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList,ImageBackground} from 'react-native';
import Grid from './Grid';

export default function App() {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);

  const handleScoreChange = (points) => {
    setScore(score + points);
  };

  const handleWicketChange = () => {
    setWicket(wicket + 1);
  };
  const image= require("../../../images/pic.png");
  
  return (
    
    <SafeAreaView style={styles.container}>
   
   <View style={styles.container1}>
   <ImageBackground source={image} resizeMode="cover" style={styles.imagestyle}>
   
   <View style={styles.mainscore}>
   <View style={styles.score}>
   <Text style={styles.scoretext}>{score}/{wicket}</Text>
   </View>
   </View>
   
    </ImageBackground>
  
   </View>
   
   <View style={styles.container2}></View>
   
   <View style={styles.container3}>
   
   <View style={styles.subcont1}>
   <Grid onScoreChange={handleScoreChange} onWicketChange={handleWicketChange}/>   
   </View>

   </View>   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container1:{
    flex:3,
   backgroundColor:'#2d5986',
  },
  container2:{
  backgroundColor:'#2d5986',
  flex:1,
  },
  container3:{
  flex:2,
  flexDirection:'row',
  
  },
  subcont1:{
    flex:2,
    backgroundColor:'#f0f0f5',
    
  },
  
  imagestyle:{
    width:"100%",
    height:400,
    marginBottom:2,
    opacity:0.8

  },
  mainscore:{
  flex:1,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  },
  score:{
  justifyContent:'center',
  alignItems:'center',
  },
  scoretext:{
    color:'white',
    fontSize:100,
    fontWeight:'normal',
    
  }
  
  
});
