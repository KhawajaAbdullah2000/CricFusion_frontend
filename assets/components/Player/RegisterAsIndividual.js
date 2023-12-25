import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Apploader from '../Apploader';
const RegisterAsIndividual = ({route,navigation}) => {

  const {setLoginPending, loginPending} = useLogin();
  const [league,setLeague]=useState([]);
  const [status,setStatus]=useState(false)

  const fetchLeagueDetails=async(league_id)=>{
    setLoginPending(true)
    const res=await client.get(`/get-league-details/${league_id}`);
  //  console.log(res.data.leagueDetails);
    if(res.data.success){
   setLeague(res.data.leagueDetails)
    setLoginPending(false);

     }
      else{
        setLoginPending(false);
      }
  
  };


  
  const CheckRegistration=async(league_id,player_id)=>{
    // console.log(player_id);
    // console.log(league_id)

   setLoginPending(true)
     const res=await client.get(`/check-player-reg-in-league/${league_id}/${player_id}`);
   console.log(res.data.message);
   if(res.data.success){
    setStatus(true)
 setLoginPending(false);

  }
      else{
        setStatus(false)
       setLoginPending(false);
       }
  
  };


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
              status==false? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',textAlign:'center' }}>Register As an Individual Player to be eligible for Auction</Text>

          <TouchableOpacity onPress={RegisterAsIndividual} style={{backgroundColor:'yellow',width:150,height:40,justifyContent:'center',alignItems:'center',elevation:20,borderRadius:10,marginTop:20}}>
          <Text style={{fontWeight:'bold'}}>Register for Auction</Text>
          </TouchableOpacity>

        </View>:
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
<Text style={{fontSize:20,fontWeight:'bold'}}>You Are Registered</Text> 

<Text style={{fontSize:15,fontWeight:'bold'}}>Your Current bidding Status</Text> 

<View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
      </View>

      {/* Player Ratings */}
      <View style={styles.ratingsContainer}>
        <Text style={styles.ratingText}>Batting Rating: 82</Text>
        <Text style={styles.ratingText}>Bowling Rating: 78</Text>
        <Text style={styles.ratingText}>Fielding Rating: 80</Text>
        <Text style={styles.ratingText}>Base Price: 1000PKR</Text>
        <Text style={styles.ratingText}>Current Bid: No bids yet</Text>

      

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
    bottom:70
  
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