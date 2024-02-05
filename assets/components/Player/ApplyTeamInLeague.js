import { View, Text,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLogin } from "../../context/LoginProvider";
import client from '../../api/client';
import Apploader from '../Apploader';


const ApplyTeamInLeague = ({route,navigation}) => {
  const { profile, setLoginPending, loginPending } = useLogin();

    const [league,setLeague]=useState([]);
    const [team,setTeam]=useState({})
    const [notify,setNotify]=useState('')
    const [registeration,setRegisteration]=useState(false)
    const [teams_full,setTeams_Full]=useState(false)

    const fetchLeague=async ()=>{
        
        const res=await client.get(`/get-league-details/${route.params.league_id}`);
        if(res.data.success){
             setLeague(res.data.leagueDetails);
         if(res.data.leagueDetails[0].num_of_teams==res.data.leagueDetails[0].teams_joined){
          setTeams_Full(true)
         }

         }else{
           console.log('No League Found');
         }
        
    }

    const fetchTeamDetails=async ()=>{
        const res=await client.get(`/my_Team/${route.params.team_id}`);
        if(res.data.success){
             setTeam(res.data.team);
            
         }else{
           setTeam({})
         }
        
    }
     const JoinLeague=async ()=>{
      setLoginPending(true);
      const res = await client.post("/register-team", {
        league_id: route.params.league_id,
        team_id:route.params.team_id
      
     });
     if(res.data.success){
        setLoginPending(false);
        fetchRegisterationDetails()
        setNotify("Team Registered");
     }
     if (!res.data.success){
      if(res.data.teams_full==1){
        setTeams_Full(true)
      }
      setLoginPending(false)

     }
     }

//check if team already registered in this league or not
     const fetchRegisterationDetails=async ()=>{
      const res=await client.get(`/check-reg-in-league/${route.params.league_id}/${route.params.team_id}`);
      if(res.data.success){
           if(res.data.registeration){
            setRegisteration(true);
           }else{
            setRegisteration(false);
           }
       }
     };

     const PlayerList=()=>{
      navigation.navigate('player_list',{
        league_id:route.params.league_id,
        team_id:route.params.team_id
      });
     }


    useEffect(()=>{
      fetchLeague();
      fetchTeamDetails();
      fetchRegisterationDetails();
    },[])




  return (
    <View style={styles.container}>
    {
      loginPending? <Apploader/>:null
  }


      {league && league.length > 0 && (
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
      </ImageBackground>
      )}

      {
        team? (

           ( !registeration && !teams_full)? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{backgroundColor:'green',paddingVertical:10,borderRadius:10}}
              onPress={JoinLeague}
              >
              <Text style={{color:'white',fontWeight:'bold',margin:5}}>Register your Team {team.name} in This League</Text>
              </TouchableOpacity>
              </View>

            ):null
             
            
      
        ):null}

        {
          registeration?(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Your Team {team.name} is been registered </Text>
            <TouchableOpacity onPress={PlayerList}
            style={{paddingHorizontal:25,backgroundColor:'lightblue',
            paddingVertical:10,borderRadius:10,elevation:10,marginTop:20}} 
            >
            <Text>Need more Players in your team? Start Bidding</Text>
            </TouchableOpacity>
            </View>
            ):null
        }

        {

          
          teams_full?( 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{textAlign:'center' ,fontSize:18,fontWeight:'bold'}}>Teams full</Text>
            </View>
            ):null
            
  
        }


      
    </View>
  )
}

export default ApplyTeamInLeague

const styles= StyleSheet.create({


    container:{
        flex:1,
    },
    details:{
        fontSize:20,
        fontWeight:'bold'

    }


});