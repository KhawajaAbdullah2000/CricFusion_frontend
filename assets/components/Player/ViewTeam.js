import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'

import client from '../../api/client';
import { useLogin } from "../../context/LoginProvider";






export default function ViewTeam({route,navigation}) {
  const {profile,token}=useLogin();
  const [team,setTeam]=useState({})


const fetchTeamDetails=async ()=>{
  const res=await client.get(`/my_Team/${route.params.team_id}`);
         if(res.data.success){
              setTeam(res.data.team)
          }
        
}
const FindNearbyLeagues=(city)=>{

  navigation.push('apply_as_team',
  {
    city:city,
    team_id:route.params.team_id
 }
 );

}


  useEffect(() => {

    fetchTeamDetails();
   },[]);


  return (
    <View style={styles.container}>

      {
        team? (
        <View style={styles.teamname}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>Team Name:{team.name}</Text>
      {
        team.slogan ?  <Text style={{color:'purple',fontSize:20}}>{team.slogan}</Text> :null

      }
      

    {

      team.captain_id==profile._id ?(

      <View style={{flexDirection:'row',alignSelf:'flex-end',marginTop:10,marginEnd:20}}>

      <TouchableOpacity style={{paddingHorizontal:25,backgroundColor:'green',paddingVertical:10}} 
      onPress={()=>FindNearbyLeagues(profile.city)}>
      <Text>Find Nearby Leagues</Text>
      </TouchableOpacity>
      
      </View> ):null
    }


    <Text>Player List </Text>



      
          
        </View> ):null
      }


    </View>

   

  );
}

const styles=StyleSheet.create({
        container:{
        flex:1,
        backgroundColor:'orange' 
        },
        teamname:{
          marginTop:40,
          alignItems:'center',
          
        }

});