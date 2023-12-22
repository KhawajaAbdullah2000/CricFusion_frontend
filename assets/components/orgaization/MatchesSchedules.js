import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image,Modal,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Apploader from "../Apploader";


const MatchesSchedules = () => {
  const [matches,setMatches]=useState([]);
  const [league,setLeague]=useState({})
  const {contextLeague_id,loginPending,setLoginPending}=useLogin();

  const fetchLeagueDetails=async(league_id)=>{
    
    const res=await client.get(`/get-league-details/${league_id}`);
  
    if(res.data.success){
   setLeague(res.data.leagueDetails)

     }
      else{
        setLeague("Unknown")
      }
  
  };

  //fetch al matches schedule
  const fetchLeagueSchedule=async(league_id)=>{
   
    const res=await client.get(`/league-schedule/${league_id}`);
    if(res.data.success){
      setMatches(res.data.leagueSchedule)

     }
      else{
        setMatches([])
        
      }
  
  }


  useEffect(()=>{
    fetchLeagueDetails(contextLeague_id);
    fetchLeagueSchedule(contextLeague_id);
   
  })

  
  const renderItem = ({ item }) => (

    <View style={{marginTop:20,marginLeft:10}}>
    
    <Text>Team1: {item.Team1.name}</Text>
    <Text>Team1: {item.Team2.name}</Text>
    <Text>{new Date(item.match_date).toLocaleDateString('en-us',{
      'year':'2-digit',
      'month':'short',
      'day':'2-digit'
    })}</Text>

    <Text>{new Date(item.match_date).toLocaleString('en-us',{
     'hour':'numeric',
     'minute':'numeric',
     'timeZone':'Asia/Karachi'
    })}</Text>
    
    </View>
    


             

  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginTop:10}}>League Schedule</Text>

      {

        league.length? (  
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:30,fontWeight:'bold',color:'orange'}}>{league[0].name}</Text>
          </View>
       ):null
       }


    {
  
      matches && (
       <FlatList
       data={matches}
      renderItem={renderItem}
       keyExtractor={(item) => item._id}
    
       />
      )
      }  





      
</View>


 


  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  
  }
})
export default MatchesSchedules