import { View, Text,ImageBackground ,TouchableOpacity} from 'react-native'
import React, { useEffect,useState,useRef } from 'react'
import client from '../../../api/client'
import ConfettiCannon from 'react-native-confetti-cannon';
import { useLogin } from '../../../context/LoginProvider';


const WinningTeam = ({route,navigation}) => {
  const {contextLeague_id}=useLogin();


    const [team,setTeam]=useState('');
   
    useEffect(()=>{
        getTeamDetails();

    },[])

    const getTeamDetails=async()=>{
const res=await client.get(`/my_team/${route.params.team_won}`);
try {
  if(res.data.success){
    setTeam(res.data.team)
   // confettiRef.current.start();
}
} catch (error) {
  console.log(error.message)
}
    }
  return (
    <ImageBackground
    source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLkdvb2R3YWxscGFwZXJzLmltYWdlcy5Dcmlja2V0V2FsbHBhcGVyX3NjcmVlbl8wXzE2MDI5NTg4NjNfMDE4/screen-0.jpg?fakeurl=1&type=.jpg' }} // Replace with your image URL or local require
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    resizeMode="cover" // Cover, contain, stretch, repeat, center
  >
  <ConfettiCannon
  count={200}
  fallSpeed={6000}
  origin={{x: -10, y: 0}}
  autoStart={true}
  fadeOut={true}
/>
    {team && (
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black',marginBottom:30 }}>{team.name} Won the match</Text>
    )}
    {
      team && (
        <TouchableOpacity style={{padding:20,backgroundColor:'yellow',marginTop:10}}>
        <Text>Go to Matches</Text>
        </TouchableOpacity>
      )
    }
  </ImageBackground>
  
  )
}

export default WinningTeam