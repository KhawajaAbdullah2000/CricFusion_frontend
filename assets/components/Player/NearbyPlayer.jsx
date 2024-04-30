import { View, Text,StyleSheet ,Linking,Button} from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Apploader from '../Apploader';



const NearbyPlayer = ({route}) => {
    const [stats,setStats]=useState(null);
const [playerDetails,setPlayerDetails]=useState(null);
const {loginPending,setLoginPending}=useLogin();
    useEffect(()=>{
fetchData()
    },[])

    const fetchData=async()=>{
        try {
            setLoginPending(true)
            const res=await client.get(`/user_stats/${route.params.id}`);
            if(res.data.success){
             setStats(res.data.performance);
             setPlayerDetails({first_name:res.data.first_name,
             last_name:res.data.last_name,matches_played:res.data.matches_played})
             setLoginPending(false)
            }
           
            
        } catch (error) {
            console.log(error.message)
            setLoginPending(false)
        }
    }

    const openWhatsApp = (number, message) => {
        let url = 'whatsapp://send?text=' + encodeURIComponent(message) + '&phone=' + number;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            alert('Please make sure WhatsApp installed on your device');
          }
        }).catch(error => console.error('An error occurred', error));
      };


    const formatNumber = (number) => {
        return parseFloat(number).toFixed(2);
      };

  return (
    <View style={{flex:1,alignItems:'center'}}>
    {
        loginPending? <Apploader/>:null
      }

    {
        playerDetails && playerDetails!=null && (
            <View style={styles.header}>
            <Text style={styles.name}>{playerDetails.first_name} {playerDetails.last_name}</Text>
          </View>
        )
    }

    {
        stats && stats!=null && playerDetails!=null && (
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
            <Text style={styles.stats}>Bowling Average: {stats.bowling_average} </Text>
            <Text style={styles.stats}>Batting Rating: {stats.batting_rating} </Text>
            <Text style={styles.stats}>Bowling Rating: {stats.bowling_rating} </Text>
            <Button
        title="Contact"
        onPress={() => openWhatsApp('923104660654', 'Hello')}
      />
          </View>

        )
    }
    
    </View>
  )
}

const styles = StyleSheet.create({
  
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#4caf50',
      marginTop:20
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

export default NearbyPlayer