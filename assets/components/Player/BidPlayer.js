import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';


const BidPlayer = ({route,navigation}) => {
const [player,setPlayer]=useState([]);
const [bid,setBid]=useState(null)

const fetchPlayer=async()=>{
  try {

    const res=await client.get(`/player/${route.params.player_id}/${route.params.league_id}`);
    if (res.data.success){
      //console.log(res.data.player)
      setPlayer(res.data.player)
     setBid(res.data.player[0].current_bid)
  
    }
    
  } catch (error) {
    console.log(error.message)
  }
}

const increaseBid=()=>{
  setBid(bid+500)
}

const decreaseBid=()=>{
  if (bid-500>=1000){
    setBid(bid-500)
  }
 
}

useEffect(()=>{
fetchPlayer()
},[])


  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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