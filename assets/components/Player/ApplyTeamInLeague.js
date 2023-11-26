import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
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


      <Text style={{fontSize:18,fontWeight:'bold',marginTop:30,textAlign:'center'}}>Join League</Text>


      {league && league.length > 0 && (
        <View style={{flex:1,alignSelf:'center',marginTop:30}}>
          <Text style={styles.details}>League Name: {league[0].name}</Text>
          <Text style={styles.details}>Number of Teams: {league[0].num_of_teams}</Text>
          <Text style={styles.details}>Organizad by: {league[0].League.name}</Text>
          <Text style={styles.details}>Starting from: 
          {new Date(league[0].startsAt).toLocaleDateString('en-US',{
            year: 'numeric',
           month: 'long',
          day: 'numeric',
          })}</Text>

         
       
      {
        team? (

           ( !registeration && !teams_full)? (
              <TouchableOpacity style={{backgroundColor:'red',paddingVertical:10,borderRadius:10,marginTop:20}}
              onPress={JoinLeague}
              >
              <Text style={{color:'white',fontWeight:'bold',margin:5}}>Register your Team {team.name} in This League</Text>
              </TouchableOpacity>

            ):null
             
            
      
        ):null}

        {
          registeration?(<Text>Your Team {team.name} is been registered </Text>):null
        }

        {
          
          teams_full?( <Text style={{textAlign:'center' ,fontSize:18,fontWeight:'bold'}}>Teams fulled</Text>):null
            
  
        }




        </View>
      )}
      
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