import { View, Text,StyleSheet,FlatList,Modal,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Apploader from "../Apploader";
import { useFocusEffect } from '@react-navigation/native';


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


  // useEffect(()=>{
  //   console.log("At schedule screen");
  //   fetchLeagueDetails(contextLeague_id);
  //   fetchLeagueSchedule(contextLeague_id);
   
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      console.log("at fcus effect");
      // This function will be called every time the screen comes into focus
      fetchLeagueDetails(contextLeague_id);
      fetchLeagueSchedule(contextLeague_id);
    }, [contextLeague_id])
  );

  
  const renderItem = ({ item }) => (

    <View>
    
<Pressable style={[styles.row]} onLongPress={()=>console.log(item.venue)}>
     <Text style={styles.col}>{new Date(item.match_date).toLocaleDateString('en-us',{
      'day':'2-digit',
      'month':'short'
    
     })} {new Date(item.match_date).toLocaleString('en-us',{
      
        'hour':'numeric',
       'minute':'numeric',
       'timeZone':'Asia/Karachi'
       })}

     
     </Text>
      <View style={styles.centeredCol}>
        <Text>{item.Team1.name} vs {item.Team2.name}</Text>
      </View>
      <Text style={styles.col}>{item.venue}</Text>
      </Pressable>
    </View>

   

    


             

  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginTop:10}}>League Schedule</Text>


      {

        league.length? (  
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:30,fontWeight:'bold',color:'#44D177'}}>{league[0].name}</Text>
          </View>
       ):null
       }
       <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginTop:6,marginBottom:30}}>Group Stage</Text>

    

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
    flex:1,
    padding:16

  
  
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1, // Add a border bottom for row separation
    borderBottomColor: 'grey', // Border color
    paddingVertical: 8
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  col: {
    flex: 1, // Equal width for each column
    textAlign: 'center',
  },
  centeredCol: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    textAlign: 'center',
  }
})
export default MatchesSchedules