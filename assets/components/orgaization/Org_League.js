import { View, Text ,StyleSheet,FlatList,Image,TouchableOpacity,Scrollable} from 'react-native'
import React ,{ useEffect,useState }from 'react'
import {useLogin} from '../../context/LoginProvider'
import client from '../../api/client'

const Org_League = ({route}) => {
  const { profile, setLoginPending, loginPending } = useLogin();
const [league,setLeague]=useState([]);
const [teams,setTeams]=useState([])


  const fetchLeagueDetails=async(league_id)=>{

    console.log(league_id)
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

  const fetchTeamsRegistered=async(league_id)=>{

    console.log("AT fetch teams "+league_id);
 const res2=await client.get(`/teams-in-leagues/${league_id}`);
//console.log(res2.data.teams_in_leagues);
   if(res2.data.success){ 

     setTeams(res2.data.teams_in_leagues)

   }else{
        console.log("no team found")
      setTeams([]);+
     setLoginPending(false);

  //  }

  }
}

const randomNumber = Math.floor(Math.random() * 3) + 1;
const imageSources = {
  1: require('../../banner1.jpg'),
  2: require('../../banner2.jpg'),
  3: require('../../banner3.jpg'),
};





  
  const renderItem = ({ item }) => (


    <View style={styles.card}>
    <Image source={imageSources[randomNumber]} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
                <TouchableOpacity style={styles.btn}
                onPress={()=>console.log(item.teams._id)}
                >
             <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>View Team</Text>
             </TouchableOpacity>
  

</View>
  );

    

  useEffect(()=>{
    console.log("At use effect of org-leagues")
    fetchLeagueDetails(route.params.league_id);
    fetchTeamsRegistered(route.params.league_id)
  },[]);





  return (
    <View style={styles.container}>
     {
      league.length? (  
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'black'}}>{league[0].name}</Text>

      <Text>Organized by: {league[0].League.name}</Text>
      <Text>Starting from : {new Date(league[0].startsAt).toLocaleDateString('en-US',{
       year: 'numeric',
         month: 'long',
         day: 'numeric',
      })} </Text>
  
  
      <Text style={{fontSize:25,fontWeight:'bold',marginTop:20}}>Teams Registered</Text>
</View>


     ):null
     }


  
  
{
  


  teams && (
   <FlatList
   data={teams}
  renderItem={renderItem}
   keyExtractor={(item) => item._id}
   
   />
  )
  }   


 
  

    </View>
  )
  

};
const styles=StyleSheet.create({
  container:{
    flex:1
   
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10
   
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
   paddingBottom:8,
    textAlign: 'center',
    backgroundColor: 'orange',

  },

  btn:{
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'yellow',
  elevation:10
  }


});





export default Org_League;

