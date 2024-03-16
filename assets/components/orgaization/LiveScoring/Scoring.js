
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList,ImageBackground} from 'react-native';
import Grid from './Grid';
import { useLogin } from '../../../context/LoginProvider';

export default function Scoring({route,navigation}) {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);

  const {striker ,nonStriker,bowler} = useLogin();

  const [strikerScore,setStrikerScore]=useState({runs:0,balls:0})
  const [nonStrikerScore,setNonStrikerScore]=useState({runs:0,balls:0})

  const handleButtonPress=(points)=>{
    setScore(score + points);
  };

  const handleWicketButtonPressed=(wicket)=>{
    setWicket(wicket + 1);
  };

  const buttons = [
    { id: 0, label: '0',value:0 },
    { id: 1, label: '1',value:1 },
    { id: 2, label: '2',value:2 },
    { id: 3, label: '3',value:3 },
    { id: 4, label: '4',value:4 },
    { id: 5, label: '5/7',value:5 },
    { id: 6, label: '6',value:6 },
    { id: 7, label: 'WD (Wide)',value:1 },
    { id: 8, label: 'NB (Noball)',value:1 },
    { id: 9, label: 'UNDO' ,value:0},
    { id: 10, label: 'WICKET', onPress: () => handleWicketButtonPressed(1) },
    { id: 11, label: 'BYE' },
  ];



  useEffect(()=>{
// console.log(route.params.match_id);
// console.log(route.params.teamBatting)
// console.log(route.params.teamBowling)
  },[])

 
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
   
   <View style={styles.container2}>

   <View style={{flex:1}}>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}} >
   {striker.first_name} {striker.last_name}* {strikerScore.runs} ({strikerScore.balls})
   </Text>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}> 
   {nonStriker.first_name} {nonStriker.last_name} {nonStrikerScore.runs} ({nonStrikerScore.balls})
   </Text>
   </View>

   <View style={{flex:1}}>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>Bowler</Text>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>
   
   {bowler.first_name} {bowler.last_name}:
   
   </Text>
   </View>

   </View>
   
   <View style={styles.container3}>

   
   <View style={styles.subcont1}>
   <View style={styles.gridcontainer}>
   {buttons.map((button, index) => (
     <TouchableOpacity key={button.id} style={[styles.button]}
     onPress={() => button.onPress? button.onPress : handleButtonPress(button.value)}
     >
       <Text style={styles.buttonText}>{button.label}</Text>
     </TouchableOpacity>
   ))}
 </View>
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
  flexDirection:'row',
  justifyContent:'space-around'
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
  ,
  gridcontainer: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderBlockColor:'#c2c2d6',
  },
  button: {
    width: '25%', // Adjust as needed
    height: '33.3%', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor:'#c2c2d6',
    borderLeftWidth: 0.5,
    borderRightWidth:0.5,
    borderTopWidth:0.5,
    borderEndWidth:0.5,
  },
  buttonText: {
    fontSize: 20,
    color:'#808080',
  },
  
  
  
});
