import { View, Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'

import client from '../../api/client';
import { useLogin } from "../../context/LoginProvider";







export default function ViewTeam({route,navigation}) {
  const {profile,token}=useLogin();
  const [team,setTeam]=useState({})
  const [players,setPlayers]=useState([])


const fetchTeamDetails=async ()=>{
  const res=await client.get(`/my_Team/${route.params.team_id}`);
         if(res.data.success){
              setTeam(res.data.team)
          }
        
}

const fetchPlayers=async()=>{
try {
  const res=await client.get(`/players-in-team/${route.params.team_id}`);
  if(res.data.success){
    setPlayers(res.data.players)
    
  }
  
} catch (error) {
  console.log(error.message)
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

const AddPlayers=(city)=>{
  navigation.push('add_players',
  {
    city:city,
    team_id:route.params.team_id
 }
 );
}


  useEffect(() => {
    fetchTeamDetails();
    fetchPlayers();
   },[]);


  return (
    <View style={styles.container}>
{
  team.captain_id==profile._id && (
    <View style={{marginTop:10,flexDirection:'row',justifyContent: 'flex-end',marginRight:20}}> 
    <TouchableOpacity style={{backgroundColor:'green',width:'50%',height:38,justifyContent:'center',borderRadius:20}}>
    <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Recommended Team</Text>
    </TouchableOpacity>
    </View>


  )
}

 
      {
        team? (
        <View style={styles.teamname}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>Team Name:{team.name}</Text>
      {
        team.slogan ?  <Text style={{color:'purple',fontSize:20}}>{team.slogan}</Text> :null

      }
      

    {

      team.captain_id==profile._id ?(
        <View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 20}}>
        <TouchableOpacity style={{paddingHorizontal: 25, backgroundColor: '#32ed76', paddingVertical: 10, borderRadius: 10, elevation: 10}} onPress={() => FindNearbyLeagues(profile.city)}>
          <Text>Find Nearby Leagues</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={{marginLeft: 10, paddingHorizontal: 25,
           backgroundColor: '#32ed76', paddingVertical: 10, borderRadius: 10, elevation: 10}}
           onPressIn={()=>AddPlayers(profile.city)}>
          <Text>Add Players</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      
      
      ):null
    }


    <Text style={{marginTop:30,fontSize:25,fontWeight:'500',marginBottom:5}}>Players</Text>

  
   
    
    {team && players && players.length > 0 ? (
      <FlatList
        data={players}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
        
          <View style={{flex:1,flexDirection:'row',marginTop:8}}>
            <Text style={{backgroundColor:'#44D177',width:200,textAlign:'center'}}>{item.player.first_name} {item.player.last_name}</Text>
            {
              item.player_id==team.captain_id?(
               <Text style={{fontWeight:'500',backgroundColor:'#44D177',width:20}}>C</Text>
              ):null
            }
     
          </View>
        )}
      />
    ) : (
      <Text>No players available</Text>
    )}
 
  


    
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
          marginTop: 20
        },
        playerContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'lightgreen',
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        },
        playerInfo: {
          flex: 1,
          justifyContent: 'center',
        },
        playerName: {
          fontWeight: 'bold',
        },
        captainText: {
          fontWeight: '500',
          alignSelf: 'flex-end',
        }
       

});