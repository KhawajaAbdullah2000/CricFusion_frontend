import { View, Text } from 'react-native'
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
    console.log(res.data.team)
}
    }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>WinningTeam MatchId: {route.params.match_id} {route.params.team_won}</Text>
    </View>
  )
}

export default WinningTeam