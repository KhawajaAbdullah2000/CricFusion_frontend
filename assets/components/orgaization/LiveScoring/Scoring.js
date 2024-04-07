
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View,ImageBackground,Modal } from 'react-native';
import { useLogin } from '../../../context/LoginProvider';
import client from '../../../api/client';
import PlayerSelectionModal from './PlayerSelectionModal ';

export default function Scoring({route,navigation}) {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [dismissedPlayers, setDismissedPlayers] = useState(nonStriker ? [nonStriker.id] : []);

  const [isModalVisible, setModalVisible] = useState(false);
  

  const [myOvers, setOvers] = useState({
    overs: 0,
    balls: 0,
  });

  const {striker ,nonStriker,bowler,} = useLogin();



  //const [currentBall,setCurrentBall]=useState({runs:0,balls:0})

  const [strikerScore,setStrikerScore]=useState({runs:0,balls:0,id:striker.id,
    first_name:striker.first_name,last_name:striker.last_name})

  const [nonStrikerScore,setNonStrikerScore]=useState({runs:0,balls:0,id:nonStriker.id,
    first_name:nonStriker.first_name,last_name:nonStriker.last_name})

  const [batsmanData,setBatsmanData]=useState([]);

  const IncrementBall=()=>{
    let { overs, balls } = myOvers;
    balls += 1;

    if (balls === 6) {
      balls = 0;
      overs += 1;
    }
    setOvers({ overs, balls });
  }

  //for 1,2,3 runs
  const handleButtonPress=(points)=>{
    setScore(score + points);
    IncrementBall()
    addBallDataForBatsman(points)
  };

  const handleFourPress=(points)=>{
    setScore(score + points);
    IncrementBall()
    addFourDataForBatsman(points)
  };

  const handleSixPress=(points)=>{
    setScore(score + points);
    IncrementBall()
    addSixDataForBatsman(points)
  };



  useEffect(() => {
    console.log("The new batsmanDataArray is: ", batsmanData);
    console.log("");
  }, [batsmanData]);

  useEffect(() => {
      //console.log("Useeffect of strikerScore");
    }, [strikerScore]);

 useEffect(()=>{
console.log("Dismissed players array: ",dismissedPlayers)
 },[dismissedPlayers])

 useEffect(() => {
  setStrikerScore(prevScore => ({
    ...prevScore,
    id: striker.id,
    first_name: striker.first_name,
    last_name: striker.last_name,
  }));
}, [striker]);

//to make sure non strikers are also not availabe in the player list
useEffect(() => {
  if (nonStriker && nonStriker.id) {
    setDismissedPlayers([nonStriker.id]);
  }
}, [nonStriker]);

//for 1 2 3 runs
  const addBallDataForBatsman = (runs) => {

    setBatsmanData((prevArray) => [
      ...prevArray,
      {
        player_id: strikerScore.id, // Use the current striker's id
        team_id: route.params.teamBatting,
        runs_scored: runs,
        fours_count: 0,
        sixers_count: 0,
        dismissal: false,
        fifty_scored: 0,
        century_scored: 0
      }
    ]);
  
  
    // Increment striker's score
    setStrikerScore((prev) => ({
      ...prev,
      runs: prev.runs + runs,
      balls: prev.balls + 1
    }));
  
    // Check if runs are odd and swap strikers
    if (runs % 2 !== 0) {

      const temp={...nonStrikerScore}

      setNonStrikerScore((prev) => ({
        ...strikerScore,
        runs: strikerScore.runs+runs,
        balls: strikerScore.balls+1
      }));
  
      setStrikerScore((prev) => ({
        ...temp,
        runs: temp.runs ,
        balls: temp.balls
      }));

  

    }
  };

  const addFourDataForBatsman = (runs) => {

    setBatsmanData((prevArray) => [
      ...prevArray,
      {
        player_id: strikerScore.id, // Use the current striker's id
        team_id: route.params.teamBatting,
        runs_scored: runs,
        fours_count: 1,
        sixers_count: 0,
        dismissal: false,
        fifty_scored: 0,
        century_scored: 0
      }
    ]);
  
  
    // Increment striker's score
    setStrikerScore((prev) => ({
      ...prev,
      runs: prev.runs + runs,
      balls: prev.balls + 1
    }));
  
   
  };

  const addSixDataForBatsman = (runs) => {

    setBatsmanData((prevArray) => [
      ...prevArray,
      {
        player_id: strikerScore.id, // Use the current striker's id
        team_id: route.params.teamBatting,
        runs_scored: runs,
        fours_count: 0,
        sixers_count: 1,
        dismissal: false,
        fifty_scored: 0,
        century_scored: 0
      }
    ]);
  
  
    // Increment striker's score
    setStrikerScore((prev) => ({
      ...prev,
      runs: prev.runs + runs,
      balls: prev.balls + 1
    }));
  
   
  };


  const updateScore=async()=>{
   try {
    const res=await client.post("/insert_ball_data",{
      match_id:route.params.match_id,
      data:batsmanData
     
    });

    if(res.data.success){
      console.log("Score updated in DB")
      setBatsmanData([])
    }

   } catch (error) {
    console.log(error.message)
   }
  }


  const handleWicketButtonPressed=(wic)=>{
    setWicket((prevWicket) => prevWicket + 1);
    setDismissedPlayers((prevDismissedPlayers) => [...prevDismissedPlayers, strikerScore.id]);
    IncrementBall()
    addBallDataForWicket()
  };

  
  const addBallDataForWicket = () => {

    setBatsmanData((prevArray) => [
      ...prevArray,
      {
        player_id: strikerScore.id, // Use the current striker's id
        team_id: route.params.teamBatting,
        runs_scored:0,
        fours_count: 0,
        sixers_count: 0,
        dismissal: true,
        fifty_scored: 0,
        century_scored: 0
      }
    ]);

    setStrikerScore({
      runs:0,balls:0,id:null,
    first_name:"HEHE",last_name:"HEHE"
    })

   setModalVisible(true);

  }

  // const buttons = [
  //   { id: 0, label: '0',value:0 },
  //   { id: 1, label: '1',value:1 },
  //   { id: 2, label: '2',value:2 },
  //   { id: 3, label: '3',value:3 },
  //   { id: 4, label: '4',value:4 },
  //   { id: 5, label: '5/7',value:5 },
  //   { id: 6, label: '6',value:6 },
  //   { id: 7, label: 'WD (Wide)',value:1 },
  //   { id: 8, label: 'NB (Noball)',value:1 },
  //   { id: 9, label: 'UNDO' ,value:0},
  //   { id: 10, label: 'WICKET', onPress: () => handleWicketButtonPressed(1) },
  //   { id: 11, label: 'BYE' },
  // ];



  useEffect(()=>{
// console.log(route.params.match_id);
// console.log(route.params.teamBatting)
// console.log(route.params.teamBowling)
  },[])

 
  const image= require("../../../images/pic.png");
  
  return (
    
    <SafeAreaView style={styles.container}>
   
   <View style={styles.container1}>

   <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
   <PlayerSelectionModal
   dismissedPlayers={dismissedPlayers} 
   onClose={() => setModalVisible(false)} 
   match_id={route.params.match_id}
   teamBatting={route.params.teamBatting}
   />
 </Modal>
   <ImageBackground source={image} resizeMode="cover" style={styles.imagestyle}>
   
   <View style={styles.mainscore}>
   <View style={styles.score}>
   <Text style={styles.scoretext}>{score}/{wicket}</Text>
   </View>
   </View>
   
    </ImageBackground>
  
   </View>
   
   <View style={styles.container2}>

   <View style={{flex:2,marginLeft:10}}>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}} >
   {strikerScore.first_name} {strikerScore.last_name}* {strikerScore.runs} ({strikerScore.balls})
   </Text>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}> 
   {nonStrikerScore.first_name} {nonStrikerScore.last_name} {nonStrikerScore.runs} ({nonStrikerScore.balls})
   </Text>
   </View>

   <View style={{flex:1}}>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>Bowler</Text>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>
   
   {bowler.first_name} {bowler.last_name}
   
   </Text>
   </View>

   <View style={{flex:1}}>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>Overs</Text>
   <Text style={{color:'white',fontWeight:'bold',fontSize:13}}>
   
   {myOvers.overs}.{myOvers.balls}
   
   </Text>
   </View>

   </View>
   
   <View style={styles.container3}>

   
   <View style={styles.subcont1}>
   <View style={styles.gridcontainer}>

   <TouchableOpacity style={[styles.button]}
     onPress={() => handleButtonPress(0)}
     >
     <Text style={styles.buttonText}>0</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleButtonPress(1)}
     >
     <Text style={styles.buttonText}>1</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleButtonPress(2)}
     >
     <Text style={styles.buttonText}>2</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleButtonPress(3)}
     >
     <Text style={styles.buttonText}>3</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleFourPress(4)}
     >
     <Text style={styles.buttonText}>Four</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleSixPress(6)}
     >
     <Text style={styles.buttonText}>Six</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() =>handleWicketButtonPressed(1)}
     >
     <Text style={styles.buttonText}>Wicket</Text>   
     </TouchableOpacity>
     
     <TouchableOpacity style={[styles.button]}
     onPress={() => updateScore()}
     >
     <Text style={styles.buttonText}>Update Score</Text>   
     </TouchableOpacity>
    
     
  {/*
   {buttons.map((button, index) => (
     <TouchableOpacity key={button.id} style={[styles.button]}
     onPress={() => button.onPress? button.onPress : handleButtonPress(button.value)}
     >
       <Text style={styles.buttonText}>{button.label}</Text>
     </TouchableOpacity>
   ))}
   */}
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
   backgroundColor:'#2d5986'

  },
  container2:{
  backgroundColor:'#2d5986',
  flex:1,
  flexDirection:'row',
  justifyContent:'space-around'
 
  },
  container3:{
  flex:2,
  flexDirection:'row'
  
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
