
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View,ImageBackground,Modal } from 'react-native';
import { useLogin } from '../../../context/LoginProvider';
import client from '../../../api/client';
import PlayerSelectionModal from './PlayerSelectionModal ';
import SecondStriker from './SecondStriker';
import SecondNonStriker from './SecondNonStriker'
import SelectNextBowler from './SelectNextBowler';

export default function Scoring({route,navigation}) {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [battingTeam,setBattingTeam]=useState(route.params.teamBatting)
  const [bowlingTeam,setBowlingTeam]=useState(route.params.teamBowling)
  const [winningTeam,setWinningTeam]=useState(null)

  const [score2,setScore2]=useState(0)
  const [wicket2, setWicket2] = useState(0);

  const [dismissedPlayers, setDismissedPlayers] = useState(nonStriker ? [nonStriker.id] : []);
  const [innings,setInnings]=useState("first");
  //for 1st innings
  const [inningsFinished, setInningsFinished] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [strikerModalVisible, setStrikerModalVisible] = useState(false);
  const [nonstrikerModalVisible, setNonStrikerModalVisible] = useState(false);
  const [bowlerModal,setBowlerModal]=useState(false);


  const SecondInningsStriker=()=>{
  setStrikerScore({
    runs:0,
    balls:0,
    id:null,
    first_name:'',
    last_name:''
  })
    setStrikerModalVisible(true)
  }

  const SecondInningsNonStriker=()=>{
    setNonStrikerScore({
    runs:0,
    balls:0,
    id:null,
    first_name:'',
    last_name:''
  })
    setNonStrikerModalVisible(true)
  }


  const [myOvers, setOvers] = useState({
    overs: 0,
    balls: 0,
  });

  useEffect(() => {
WinningCondition()
}, [score, score2, myOvers,innings]);

const WinningCondition=()=>{
  if (score2 > score) {
    setWinningTeam(battingTeam);
   
  } else if (score2 < score && myOvers.overs == 2 && innings=="second") {
    setWinningTeam(bowlingTeam);
  }
}
useEffect(()=>{
HandleVictory(winningTeam);
},[winningTeam])

  const HandleVictory=async(team)=>{
    if(winningTeam){
      console.log("The winnign team is: ",team)
  try {
    const res=await client.put("/update_winning_team",{
      match_id:route.params.match_id,
      team_id:team
    });
    if(res.data.success){
      //console.log(res.data.message)
     navigation.navigate("winning_team_page",{
      match_id:route.params.match_id,
      team_won:team
     })
    }
  } catch (error) {
    console.log(error.message)
  }

    }
  }

  const {striker ,nonStriker,bowler} = useLogin();

  // Callback to be called by the modal
    const handleInningsFinish = () => {
  

    setInningsFinished(true);
setOvers({overs:0,balls:0})
    swapTeams()
    setInnings("second")
    setDismissedPlayers([])
      

  };

  const swapTeams = () => {
  const currentBattingTeam = battingTeam;
  setBattingTeam(bowlingTeam);
  setBowlingTeam(currentBattingTeam);
};


  //const [currentBall,setCurrentBall]=useState({runs:0,balls:0})

  const [strikerScore,setStrikerScore]=useState({runs:0,balls:0,id:striker.id,
    first_name:striker.first_name,last_name:striker.last_name})

  const [nonStrikerScore,setNonStrikerScore]=useState({runs:0,balls:0,id:nonStriker.id,
    first_name:nonStriker.first_name,last_name:nonStriker.last_name})

  const [batsmanData,setBatsmanData]=useState([]);
  const [bowlerData,setBowlerData]=useState([])

  const IncrementBall=()=>{
    let { overs, balls } = myOvers;
    balls += 1;
    if (balls == 6) {
      balls = 0;
      overs += 1;
      ChangeBowler()
    }
    setOvers({ overs, balls });

    if (overs==2 && innings=="first"){
      handleInningsFinish()
    }
    // else{
    //   setOvers({ overs, balls });
    // }
    
  }

  const ChangeBowler=()=>{
  setBowlerModal(true);
  }

  //for 1,2,3 runs
  const handleButtonPress=(points)=>{

    if(innings && innings=="first"){
      setScore(score + points);
    }
    if(innings && innings=="second"){
      setScore2(score2 + points);
    }

    IncrementBall()
    addBallDataForBatsman(points)
  };

  const handleFourPress=(points)=>{
    if(innings && innings=="first"){
      setScore(score + points);
    }
    if(innings && innings=="second"){
      setScore2(score2 + points);
    }
 
    IncrementBall()
    addFourDataForBatsman(points)
  };

  const handleWidePress=(points)=>{
    if(innings && innings=="first"){
      setScore(score + points);
    }
    if(innings && innings=="second"){
      setScore2(score2 + points);
    }
  

  }

  const handleSixPress=(points)=>{
    if(innings && innings=="first"){
      setScore(score + points);
    }
    if(innings && innings=="second"){
      setScore2(score2 + points);
    }
    IncrementBall()
    addSixDataForBatsman(points)
  };



  useEffect(() => {
  //  console.log("The new batsmanDataArray is: ", batsmanData);
   // console.log("");
  }, [batsmanData]);

  useEffect(() => {
      //console.log("Useeffect of strikerScore");
    }, [strikerScore]);

 useEffect(()=>{
//console.log("Dismissed players array: ",dismissedPlayers)
 },[dismissedPlayers])

 useEffect(() => {
  setStrikerScore(prevScore => ({
    ...prevScore,
    id: striker.id,
    first_name: striker.first_name,
    last_name: striker.last_name,
  }));
}, [striker]);

useEffect(() => {
  setNonStrikerScore(prevScore => ({
    ...prevScore,
    id: nonStriker.id,
    first_name: nonStriker.first_name,
    last_name: nonStriker.last_name,
  }));
}, [nonStriker]);

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
        team_id: battingTeam,
        runs_scored: runs,
        fours_count: 0,
        sixers_count: 0,
        dismissal: 0,
        fifty_scored: 0,
        balls_faced:1,
        century_scored: 0
      }
    ]);

    setBowlerData((prevArray) => [
      ...prevArray,
      {
        player_id: bowler.id, // Use the current striker's id
        team_id: bowlingTeam,
        overs_bowled:1,
        wickets_taken: 0,
        runs_conceded: runs
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

     changeStriker(runs)
  

    }
  };

const changeStriker=(runs)=>{
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

  const addFourDataForBatsman = (runs) => {

    setBatsmanData((prevArray) => [
      ...prevArray,
      {
        player_id: strikerScore.id, // Use the current striker's id
        team_id: battingTeam,
        runs_scored: runs,
        fours_count: 1,
        sixers_count: 0,
        dismissal: 0,
        fifty_scored: 0,
        balls_faced:1,
        century_scored: 0
      }
    ]);

    setBowlerData((prevArray) => [
      ...prevArray,
      {
        player_id: bowler.id, // Use the current striker's id
        team_id: bowlingTeam,
        overs_bowled:1,
        wickets_taken: 0,
        runs_conceded: 4
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
        team_id: battingTeam,
        runs_scored: runs,
        fours_count: 0,
        sixers_count: 1,
        dismissal: 0,
        fifty_scored: 0,
        balls_faced:1,
        century_scored: 0
      }
    ]);

    setBowlerData((prevArray) => [
      ...prevArray,
      {
        player_id: bowler.id, // Use the current striker's id
        team_id: bowlingTeam,
        overs_bowled:1,
        wickets_taken: 0,
        runs_conceded: 6
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

    const bowling=await client.post("/insert_baller_data",{
      match_id:route.params.match_id,
      data:bowlerData
     
    });

    if(bowling.data.success){
      console.log("Bowling db updated")
      setBowlerData([])
    }

   } catch (error) {
    console.log(error.message)
   }
  }


  const handleWicketButtonPressed=(wic)=>{
    if(innings && innings=="first"){
      setWicket((prevWicket) => prevWicket + 1);    }
    if(innings && innings=="second"){
      setWicket2((prevWicket) => prevWicket + 1);
    }
    //setWicket((prevWicket) => prevWicket + 1);
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
        dismissal: 1,
        fifty_scored: 0,
        balls_faced:1,
        century_scored: 0
      }
    ]);

    setBowlerData((prevArray) => [
      ...prevArray,
      {
        player_id: bowler.id, // Use the current striker's id
        team_id: bowlingTeam,
        overs_bowled:1,
        wickets_taken: 1,
        runs_conceded: 0
      }
    ]);


    setStrikerScore({
      runs:0,balls:0,id:null,
    first_name:"None",last_name:"None"
    })

   setModalVisible(true);

  }




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
   teamBatting={battingTeam}
   handleInningsFinish={handleInningsFinish}
   />
 </Modal>

 <Modal visible={strikerModalVisible} onRequestClose={() => setStrikerModalVisible(false)}>
   <SecondStriker
   dismissedPlayers={dismissedPlayers} 
   onClose={() => setStrikerModalVisible(false)} 
   match_id={route.params.match_id}
   teamBatting={battingTeam}
 
   />
 </Modal>

 
 <Modal visible={nonstrikerModalVisible} onRequestClose={() => setNonStrikerModalVisible(false)}>
   <SecondNonStriker
   dismissedPlayers={dismissedPlayers} 
   onClose={() => setNonStrikerModalVisible(false)} 
   match_id={route.params.match_id}
   teamBatting={battingTeam}
 
   />
 </Modal>

 <Modal visible={bowlerModal} onRequestClose={() => setBowlerModal(false)}>
   <SelectNextBowler
   onClose={() => setBowlerModal(false)} 
   match_id={route.params.match_id}
   teamBowling={bowlingTeam}
   innings={innings}
 
   />
 </Modal>


   <ImageBackground source={image} resizeMode="cover" style={styles.imagestyle}>
   <View style={styles.mainscore}>
   
   <View style={styles.score}>

  {
    innings && (
      <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>{innings} Innings</Text>
    )
  }
  {inningsFinished && (
        <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Target: {score+1} runs</Text>
      )}
      {
        innings=="first" && (
      
   <Text style={styles.scoretext}>{score}/{wicket}</Text>
  )}

  {
        innings=="second" && (
      
   <Text style={styles.scoretext}>{score2}/{wicket2}</Text>
  )}
   </View>
   </View>
   
    </ImageBackground>
  
   </View>
   
   {
    innings==="first" && (

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
    )}

    {innings=="second" && (
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

    )}
   
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
     onPress={() => handleWidePress(1)}
     >
     <Text style={styles.buttonText}>Wide</Text>   
     </TouchableOpacity>

     <TouchableOpacity style={[styles.button]}
     onPress={() => handleWidePress(1)}
     >
     <Text style={styles.buttonText}>No Ball</Text>   
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

     {inningsFinished && (
      <TouchableOpacity onPress={()=>SecondInningsStriker()} style={[styles.button]}>
     <Text style={styles.buttonText}>Choose Striker</Text>   
     </TouchableOpacity>
    
      )}
      
     {inningsFinished && (
      <TouchableOpacity onPress={()=>SecondInningsNonStriker()} style={[styles.button]}>
     <Text style={styles.buttonText}>Choose Non Striker</Text>   
     </TouchableOpacity>
    
      )}

 
    
     
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
