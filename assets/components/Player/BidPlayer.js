import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';

import Apploader from '../Apploader';


const BidPlayer = ({route,navigation}) => {
const [player,setPlayer]=useState([]);
const [bid,setBid]=useState(null)
const [currentBid,setCurrentBid]=useState(null)

const { setLoginPending, loginPending } = useLogin();


const fetchPlayer=async()=>{
  try {
    setPlayer([]);
    setLoginPending(true)
    const res=await client.get(`/player/${route.params.player_id}/${route.params.league_id}`);
    if (res.data.success){
      //console.log(res.data.player)
      setPlayer(res.data.player)
     setBid(res.data.player[0].current_bid)
     setCurrentBid(res.data.player[0].current_bid)
     setLoginPending(false)
    }
    
  } catch (error) {
    console.log(error.message)
    setLoginPending(false)
  }
}

const increaseBid=()=>{
 
  setBid(bid+500)
  
}

const decreaseBid=()=>{
  if (bid-500>=currentBid){
  
    setBid(bid-500)
  }
 
}

const submitBid=async()=>{
  const res=await client.get(`/submit-bid/${route.params.player_id}/${route.params.league_id}/${bid}/${route.params.team_id}`)
  if (res.data.success){
    console.log("done")
  
   fetchPlayer()
}

}

useEffect(()=>{
fetchPlayer()
},[])


  return (

    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    {
      loginPending && <Apploader/>
    }
    {player && player.length > 0 && (

      <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
        </View>

        {/* Player Ratings */}
        <View style={styles.ratingsContainer}>
        <Text style={[styles.ratingText,{textDecorationLine:'underline',color:'green'}]}>{player[0].PlayerDetails.first_name} {player[0].PlayerDetails.last_name}</Text>
          <Text style={styles.ratingText}>Batting Rating: 82</Text>
          <Text style={styles.ratingText}>Bowling Rating: 78</Text>
          <Text style={styles.ratingText}>Fielding Rating: 80</Text>
          <Text style={styles.ratingText}>Base Price: 1000 PKR</Text>
          <Text style={styles.ratingText}>Current Bid: {player[0].current_bid} PKR </Text>
          {
            player[0].BiddingTeam && 
            <Text style={styles.ratingText}>By: {player[0].BiddingTeam.name} </Text>
          }
        
        

{
  bid!=null &&
  <View style={{flexDirection:'row',marginTop:10,marginBottom:5}}>

  <TouchableOpacity onPress={()=>decreaseBid()} style={{width:30,height:30,backgroundColor:'red',marginRight:10,borderRadius:30,
  justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontWeight:'bold'}}>-</Text>
  </TouchableOpacity>

  <Text style={{fontSize:18}}>{bid}</Text>

  <TouchableOpacity onPress={()=>increaseBid()} style={{width:30,height:30,backgroundColor:'green',marginLeft:10,borderRadius:30,
  justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontWeight:'bold'}}>+</Text>
  </TouchableOpacity>
  </View>

}

{
  bid!=null && 
  <View>
  <TouchableOpacity onPress={()=>submitBid()} style={{width:90,height:30,backgroundColor:'#44D177',marginLeft:10,
  justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:10,elevation:10}}>
  <Text style={{color:'white',fontWeight:'bold'}}>Submit Bid</Text>
  </TouchableOpacity>

  </View>
}
          


          
      
        </View>
      </View>
    </View>

     
    )}
 
    </View>
  )
}
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; // Assuming 20px margin on both sides
const styles = StyleSheet.create({

  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom:10
  },
  cardContainer: {
    marginBottom: 20,
    width: cardWidth,
    borderWidth:1,
    marginHorizontal:2
  },
  imageContainer: {
    overflow: 'hidden',
    borderColor: 'black',
    marginBottom: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',  
  },
  image: {
    width: 100,
    height: 100,
  },
  ratingsContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BidPlayer