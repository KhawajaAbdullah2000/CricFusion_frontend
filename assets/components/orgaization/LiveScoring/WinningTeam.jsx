import { View, Text,ImageBackground } from 'react-native'
import React, { useEffect,useState } from 'react'
import client from '../../../api/client'

const WinningTeam = ({route,navigation}) => {

    const [team,setTeam]=useState('')
    useEffect(()=>{
        getTeamDetails();

    },[])

    const getTeamDetails=async()=>{
const res=await client.get(`/my_team/${route.params.team_won}`);
if(res.data.success){
    setTeam(res.data.team)
}
    }
  return (
    <ImageBackground
    source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLkdvb2R3YWxscGFwZXJzLmltYWdlcy5Dcmlja2V0V2FsbHBhcGVyX3NjcmVlbl8wXzE2MDI5NTg4NjNfMDE4/screen-0.jpg?fakeurl=1&type=.jpg' }} // Replace with your image URL or local require
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    resizeMode="cover" // Cover, contain, stretch, repeat, center
  >
    {team && (
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>{team.name} Won the match</Text>
    )}
  </ImageBackground>
  )
}

export default WinningTeam