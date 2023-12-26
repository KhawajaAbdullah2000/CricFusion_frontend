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

      <TouchableOpacity style={{paddingHorizontal:25,backgroundColor:'lightblue',paddingVertical:10,borderRadius:10,elevation:10}} 
      onPress={()=>FindNearbyLeagues(profile.city)}>
      <Text>Find Nearby Leagues</Text>
      </TouchableOpacity>

      
      </View> ):null
    }


    <Text style={{marginTop:30,fontSize:15,fontWeight:'500'}}>Player List </Text>


    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>Name</Text>
      <Text style={styles.headerCell}>Batting Rating</Text>
      <Text style={styles.headerCell}>Bowling Rating</Text>
      <Text style={styles.headerCell}>Fielding Rating</Text>
    </View>

    <View style={styles.dataRow}>
      <Text style={styles.dataCell}>Player 1</Text>
      <Text style={styles.dataCell}>85</Text>
      <Text style={styles.dataCell}>70</Text>
      <Text style={styles.dataCell}>90</Text>
    </View>

    <View style={styles.dataRow}>
      <Text style={styles.dataCell}>Player 2</Text>
      <Text style={styles.dataCell}>78</Text>
      <Text style={styles.dataCell}>85</Text>
      <Text style={styles.dataCell}>80</Text>
    </View>

    {/* Add more rows for other players as needed */}
  </View>



          
        ):null
      }


    </View>

   

  );
}

const styles=StyleSheet.create({
        container:{
        flex:1
  
        },
        teamname:{
          marginTop:40,
          alignItems:'center',
          
        },
        container2: {
          flex: 1,
          padding: 16,
          marginTop: 20,
        },
        headerRow: {
          marginLeft:10,
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingBottom: 6,
          marginTop:20
        },
        headerCell: {
          flex: 1,
          fontWeight: 'bold',
          marginLeft:5
        },
        dataRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          marginLeft:10
        },
        dataCell: {
          flex: 1,
        },

});