import { View, Text,StyleSheet,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client'
import { useLogin } from '../../context/LoginProvider'
import Apploader from '../Apploader'

const RecommendTeam = ({route}) => {
    const [team,setTeam]=useState(null)
    const {loginPending,setLoginPending}=useLogin()
    const [batsman,setBatsman]=useState([])
    const [bowler,setBowler]=useState([]);


    const fetchTeamDetails=async ()=>{
try {
  const res=await client.get(`/my_Team/${route.params.team_id}`);
  if(res.data.success){
       setTeam(res.data.team)
   }
} catch (error) {
  console.log(error.message)
}
        
}

const fetchBatsman=async()=>{
 try {
  const res=await client.get(`/recommend/${route.params.team_id}`);
  if(res.data.success){
    setBatsman(res.data.recommendedPlayers)
    
  }
  
 } catch (error) {
  console.log(error.message)
 }

}

const fetchBowler=async()=>{
  try {
   const res2=await client.get(`/recommend_bowler/${route.params.team_id}`);
   if(res2.data.success){
     setBowler(res2.data.recommendedPlayers)
     
   }
   
  } catch (error) {
   console.log(error.message)
  }
 
 }


useEffect(() => {
    fetchTeamDetails();
    fetchBatsman()
    fetchBowler()
    
   },[]);

   const formatNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };


  return (
    <View style={{flex:1,alignItems:'center'}}>
    {
      loginPending? <Apploader/>:null
    }
   
      {
        team!=null && (
    <View style={styles.teamname}>
          <Text style={{fontSize:25,fontWeight:'bold'}}>Team Name:{team.name}</Text>
     
      {
        team.slogan ?  <Text style={{color:'purple',fontSize:20,textAlign:'center'}}>{team.slogan}</Text> :null

      }
      </View>

        )
      }

        {

      batsman && batsman.length>0 && (
   <Text style={{textAlign:'center',fontWeight:'bold',fontSize:18,marginBottom:10}}>Recommended Batsman</Text>
      )
    }


    {
      batsman && batsman.length > 0 && (
        <FlatList style={styles.flatListContainer}
          data={batsman}
          keyExtractor={(item) => item.player_id}
          renderItem={({ item }) => (
            item.ewma_score > 0.1 ? (
              <View style={styles.playerItem}>
                <Text style={styles.playerText}>{item.player_details.first_name} {item.player_details.last_name}</Text>
                <Text style={styles.playerText}>EWMA Score: {formatNumber(item.ewma_score)}</Text>
              </View>
            ) : null
          )}
        />
      )
    }


      {

        bowler && bowler.length>0 && (
     <Text style={{textAlign:'center',fontWeight:'bold',fontSize:18,marginBottom:10}}>Recommended Bowlers</Text>
        )
      }
  
  
      {
        bowler && bowler.length > 0 && (
          <FlatList style={styles.flatListContainer}
            data={bowler}
            keyExtractor={(item) => item.player_id}
            renderItem={({ item }) => (
              item.ewma_score > 0.1 ? (
                <View style={styles.playerItem}>
                  <Text style={styles.playerText}>{item.player_details.first_name} {item.player_details.last_name}</Text>
                  <Text style={styles.playerText}>EWMA Score: {formatNumber(item.ewma_score)}</Text>
                </View>
              ) : null
            )}
          />
        )
      }

      
    </View>
  )
}

const styles=StyleSheet.create({

        teamname:{
          flex:1,
          marginTop:5
        
        },
     
        playerItem: {
          backgroundColor: '#f0f0f0', 
          padding:20,  
          borderRadius: 10, 
          marginBottom: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 5, 
        },
        playerText: {
          fontSize: 16,  // Adjusted for better readability
          color: '#333'  // Darker text for better contrast
        },
  flatListContainer: {
    maxHeight: 300,  // Adjust based on your UI needs
  },
       

});

export default RecommendTeam