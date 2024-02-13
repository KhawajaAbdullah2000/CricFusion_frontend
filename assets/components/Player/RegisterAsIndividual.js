import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Apploader from '../Apploader';
const RegisterAsIndividual = ({route,navigation}) => {

  const {setLoginPending, loginPending} = useLogin();
  const [player,setPlayer]=useState([]);
  const [bid,setBid]=useState(null)
const [currentBid,setCurrentBid]=useState(null)
  const [league,setLeague]=useState([]);
  const [status,setStatus]=useState(false) //whether player is registered or not

  const fetchLeagueDetails=async(league_id)=>{
    setLoginPending(true)
    const res=await client.get(`/get-league-details/${league_id}`);
    if(res.data.success){
   setLeague(res.data.leagueDetails)
    setLoginPending(false);

     }
      else{
        setLoginPending(false);
      }
  
  };


  
  const CheckRegistration=async(league_id,player_id)=>{
try {
  setPlayer([])
  setLoginPending(true)
  const res=await client.get(`/check-player-reg-in-league/${league_id}/${player_id}`);
console.log(res.data.message);
if(res.data.success){
 setStatus(true)
 await getPlayerCard()
 setLoginPending(false);
  }
} catch (error) {
  console.log(error.message)
  setLoginPending(false);
}
  
  };

  const getPlayerCard=async()=>{
 try {
  setPlayer([])
  setLoginPending(true);
  const playerBidding=await client.get(`/player/${route.params.player_id}/${route.params.league_id}`)
  if (playerBidding.data.success){
    setPlayer(playerBidding.data.player)
    
  setBid(playerBidding.data.player[0].current_bid)
  setCurrentBid(playerBidding.data.player[0].current_bid)
  setLoginPending(false);
  }else{
    setLoginPending(false);
  }
  
 } catch (error) {
  console.log(error.message)
  setLoginPending(false);
 }
  }


  const RegisterAsIndividual=async()=>{
    setLoginPending(true)
    const res=await client.post('register-as-individual',{
      league_id: route.params.league_id,
      player_id:route.params.player_id
   });

    if(res.data.success){
   setStatus(true)
    setLoginPending(false);

     }
      else{
        setStatus(false)
        setLoginPending(false);
     
      }
  

  }

const AcceptBid=async(registeration_id,player_id,team_id)=>{

try {
  console.log("At acept bid")
  const res=await client.get(`/accept-bid/${registeration_id}/${player_id}/${team_id}`)
if (res.data.success){
  console.log("suuccess bid")
  console.log(res.data.newplayer)
  CheckRegistration(route.params.league_id,player_id)
}
else{
  console.log(res.data.mesage)
}
} catch (error) {
  console.log("In try catch eror")
}

}

  useEffect(()=>{
    console.log("at useEffect of register: "+route.params.player_id)
    fetchLeagueDetails(route.params.league_id);
    CheckRegistration(route.params.league_id,route.params.player_id)
  },[]);





  return (
      <View style={{ flex: 1 }}>

      {
        loginPending?<Apploader/>:null
      }

      {
        league.length?

        <ImageBackground
          source={require('../../../assets/leagueBanner.jpg')}
          style={{ flex: 1, resizeMode: 'cover', position: 'absolute', height: '60%', width: '100%' }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>{league[0].name}</Text>
  
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Organized by: {league[0].League.name}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Starting from :
              {new Date(league[0].startsAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </ImageBackground>:null 
            }
  
            {
              status==false || player.length<1 ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',textAlign:'center' }}>Register As an Individual Player to be eligible for Auction</Text>

          <TouchableOpacity onPress={RegisterAsIndividual} style={{backgroundColor:'yellow',width:150,height:40,justifyContent:'center',alignItems:'center',elevation:20,borderRadius:10,marginTop:20}}>
          <Text style={{fontWeight:'bold'}}>Register for Auction</Text>
          </TouchableOpacity>

        </View>:
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      
  

<View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
      </View>

      

      <View style={styles.ratingsContainer}>
    
      <Text style={styles.ratingText}>{player[0].PlayerDetails.first_name} {player[0].PlayerDetails.last_name}</Text>
        <Text style={styles.ratingText}>Batting Rating: 82</Text>
        <Text style={styles.ratingText}>Bowling Rating: 78</Text>
        <Text style={styles.ratingText}>Fielding Rating: 80</Text>
        <Text style={styles.ratingText}>Base Price: 1000PKR</Text>
        <Text style={styles.ratingText}>Current Bid:{player[0].current_bid} PKR</Text>
   


        {
          player[0].bidding_team!=null?(
            <Text style={styles.ratingText}>By: {player[0].BiddingTeam.name}</Text>
          )
          
          :(
            <Text style={styles.ratingText}>No bids by any team yet</Text>

          )
        }


       {
        player[0].bidding_team!=null & player[0].status==0? (
          <TouchableOpacity onPress={()=>AcceptBid(player[0]._id,player[0].PlayerDetails._id,player[0].bidding_team)} style={{width:90,height:30,backgroundColor:'#44D177',marginLeft:10,
  justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:10,elevation:10}}>
  <Text style={{color:'white',fontWeight:'bold'}}>Accept</Text>
  </TouchableOpacity>
        ):(null)
       }
       {
        player[0].status==1?(
          <TouchableOpacity style={{width:90,height:30,backgroundColor:'#44D177',marginLeft:10,
          justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:10,elevation:10}}>
          <Text style={{color:'white',fontWeight:'bold'}}>Sold</Text>
          </TouchableOpacity>
        ):(null)
       }


      </View>

   
   



    </View>

    


  



        </View>
      }
      </View>
    );

}

const styles=StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    position:'absolute',
    bottom:50
  
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: 'black',
    marginBottom: 20,
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

export default RegisterAsIndividual