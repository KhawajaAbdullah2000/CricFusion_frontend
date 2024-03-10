import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import client from '../../../api/client'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Toss = ({route,navigation}) => {
    const [team1,setTeam1]=useState(null)
    const [team2,setTeam2]=useState(null)
    const [matchDetails,setMatchDetails]=useState(null)
    const [teamWonToss,setTeamWonToss]=useState(null)
    const [toss,setToss]=useState(null)
    const fetchData=async()=>{
        try {
         const res=await client.get(`/playing_eleven/${route.params.match_id}`);
         if (res.data.success){
             setTeam1(res.data.team1_name)
             setTeam2(res.data.team2_name)
         }
         
        } catch (error) {
         console.log(error.message)
        }
     
         }

         const fetchPlayingEleven=async()=>{
            try {
             const res=await client.get(`/get_playing_elevens/${route.params.match_id}`);
             if (res.data.success){
                 setMatchDetails(res.data.match_details)
             }
             
            } catch (error) {
             console.log(error.message)
            }
         
             }
     
             const selectTeam=(team_id)=>{
                setTeamWonToss(team_id)
             }

             const tossDecision=(decision)=>{
                setToss(decision)
             }

    useEffect(()=>{
        fetchData();
        fetchPlayingEleven()
    },[])

    const goToScoring=()=>{
      navigation.navigate("choose_striker",{
        match_id:route.params.match_id,
        teamWonToss:teamWonToss,
        toss:toss

      });
    }


  return (
    <View style={{flex:1}}>
    {
        team1 && team2 && (
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:30}}>{team1.name} vs {team2.name}</Text>
        )
    }
    <Text style={{fontWeight:'500',marginBottom:20,marginLeft:20,fontSize:20}}>Who won the toss</Text>

    {
       team1 && team2 && matchDetails && (

            
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>

           <TouchableOpacity onPress={()=>selectTeam(matchDetails.team1_id)} 
           style={{width:150,backgroundColor:'lightblue',height:'80%',justifyContent:'center',
           borderWidth:teamWonToss==matchDetails.team1_id?3:0

         }}>

               <Text style={{textAlign:'center'}}>{team1.name}</Text>
        </TouchableOpacity>


        
      <TouchableOpacity onPress={()=>selectTeam(matchDetails.team2_id)}
       style={{width:150,backgroundColor:'lightblue',height:'80%',justifyContent:'center',
       borderWidth:teamWonToss==matchDetails.team2_id?3:0
    }}>

      <Text style={{textAlign:'center'}}>{team2.name}</Text>
 </TouchableOpacity>
    


            </View>

           
 
            
        )
    }

    <Text style={{fontSize:20,fontWeight:'bold',marginBottom:30,paddingHorizontal:20}}>Winner of the toss elected to?</Text>

    {
        team1 && team2 && matchDetails && (
 
             
             <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
 
            <TouchableOpacity onPress={()=>tossDecision(1)} 
            style={{width:150,backgroundColor:'#27AE60',height:'20%',justifyContent:'center',
            borderWidth:toss==1?3:0
 
          }}>
 
                <Text style={{textAlign:'center'}}>Batting</Text>
         </TouchableOpacity>
 
 
         
       <TouchableOpacity onPress={()=>tossDecision(2)}
        style={{width:150,backgroundColor:'#27AE60',height:'20%',justifyContent:'center',
        borderWidth:toss==2?3:0
     }}>
 
       <Text style={{textAlign:'center'}}>Bowling</Text>
  </TouchableOpacity>

 
             </View>
 
            
  
             
         )
     }

     <TouchableOpacity onPress={()=>goToScoring()} style={{width:'100%',backgroundColor:'yellow',height:50,justifyContent:'center'}}>
     <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Lets Play</Text>
     </TouchableOpacity>
 

      
    </View>
  )
}

export default Toss