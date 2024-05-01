import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';


const Profile = ({ route,navigation }) => {
  const [isAvailable, setIsAvailable] = useState(null);
  const [stats,setStats]=useState(null);
  const [playerDetails,setPlayerDetails]=useState(null);
  const {profile}=useLogin();



  useEffect(()=>{
    console.log("current status: ",isAvailable)
  },[isAvailable])

  useEffect(()=>{
fetchStats()
  },[])

  const fetchStats=async()=>{
  try {
     const res=await client.get(`/user_stats/${profile._id}`);
     if(res.data.success){
     // console.log(res.data.performance)
      setStats(res.data.performance);
      setPlayerDetails({first_name:res.data.first_name,
      last_name:res.data.last_name,matches_played:res.data.matches_played})
      setIsAvailable(res.data.status)
     }
    
  } catch (error) {
    console.log(error.message)
  }
  }

  const handleToggleAvailability = async(current_status) => {
    const res=await client.put(`/update_status/${profile._id}`,{
      status:!current_status
    });
 if (res.data.success){
  console.log("status updated")
  setIsAvailable(prevState => !prevState);

 }



 
};

const formatNumber = (number) => {
        return parseFloat(number).toFixed(2);
      };

  return (
    <ScrollView style={styles.container}>
    {
      playerDetails!=null && isAvailable!=null && (
      <View style={styles.header}>
    
        <Text style={styles.name}>{playerDetails.first_name} {playerDetails.last_name}</Text>


        <Switch
        onValueChange={()=>handleToggleAvailability(isAvailable)}         
         value={isAvailable}
       trackColor={{false:'red',true:'green'}}
        />
      </View>
    )
  }
      {
        stats!=null && playerDetails!=null &&(
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Stats</Text>
        <Text style={styles.stats}>Matches Played: {playerDetails.matches_played}</Text>

        <Text style={styles.stats}>Runs Scored: {stats.total_runs_scored}</Text>
        <Text style={styles.stats}>Batting Average {formatNumber(stats.batting_average)}</Text>
        <Text style={styles.stats}>Batting Strike Rate:  {formatNumber(stats.batting_strike_rate)}</Text>
        <Text style={styles.stats}>Total 4's count: {stats.total_fours_count}</Text>
        <Text style={styles.stats}>Total 6's count: {stats.total_sixers_count} </Text>
        <Text style={styles.stats}>Overs bowled: {stats.total_overs_bowled} </Text>
        <Text style={styles.stats}>Wickets taken: {stats.total_wickets_taken} </Text>
        <Text style={styles.stats}>Bowling Average: {formatNumber(stats.bowling_average)} </Text>
        <Text style={styles.stats}>Batting Rating: {stats.batting_rating} </Text>
        <Text style={styles.stats}>Bowling Rating: {stats.bowling_rating} </Text>
      </View>
        )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9', // light green background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4caf50', // vibrant green
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32', // dark green
  },
  stats: {
    fontSize: 16,
    padding: 5,
    color: '#388e3c', // medium green
  },
});

export default Profile;
