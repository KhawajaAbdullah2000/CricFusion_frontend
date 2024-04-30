import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import client from '../../../api/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useLogin } from '../../../context/LoginProvider'

const ChooseStriker = ({route,navigation}) => {
    const [team1,setTeam1]=useState(null)
    const [team2,setTeam2]=useState(null)
    const [matchDetails,setMatchDetails]=useState(null)
   // const [teamWonToss,setTeamWonToss]=useState(null)
   // const [toss,setToss]=useState(null)
const [teamBatting,setTeamBatting]=useState(null)
const [teamBowling,setTeamBowling]=useState(null)

const {striker ,nonStriker,bowler} = useLogin();



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

      useEffect(() => {
 
        fetchData();
     fetchPlayingEleven();
         }, []);
            
         useEffect(() => {
         if (team1 && team2 && matchDetails) {
                  GetTossDetails();
                }
            }, [team1, team2, matchDetails]);


    const GetTossDetails=()=>{
        console.log("ON toss details");
       

        if (matchDetails.team1_id==route.params.teamWonToss && route.params.toss==1 ){
            setTeamBatting(matchDetails.team1_id)
            setTeamBowling(matchDetails.team2_id)
        }

        if (matchDetails.team1_id==route.params.teamWonToss && route.params.toss==2 ){
            setTeamBatting(matchDetails.team2_id)
            setTeamBowling(matchDetails.team1_id)
        }


        if (matchDetails.team2_id==route.params.teamWonToss && route.params.toss==1 ){
            setTeamBatting(matchDetails.team2_id)
            setTeamBowling(matchDetails.team1_id)
        }

        if (matchDetails.team2_id==route.params.teamWonToss && route.params.toss==2 ){
            setTeamBatting(matchDetails.team1_id)
            setTeamBowling(matchDetails.team2_id)
        }



  }

    const goToScoring=()=>{
      navigation.navigate("scoring",{
        match_id:route.params.match_id,
        teamBatting,
        teamBowling
      });
    }


    const selectStriker=()=>{
        console.log("At select striker function: teamBatting : "+teamBatting)
        console.log("At select striker function: match id : "+route.params.match_id)
  
        navigation.navigate('select_striker',{
          match_id:route.params.match_id,
          teamBatting:teamBatting
    
        })
    
 
    }

    const selectNonStriker=()=>{
      console.log("At select non striker function: teamBatting: "+teamBatting)
      navigation.navigate('select_nonstriker',{
        match_id:route.params.match_id,
        teamBatting:teamBatting
      });
    }

    const selectBowler=()=>{
      navigation.navigate('select_bowler',{
        match_id:route.params.match_id,
        teamBowling:teamBowling
    }
      )
  }
  return (
    <View style={{flex:1}}>
    {
        team1 && team2 && (
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:30}}>
            {team1.name} vs {team2.name}
            </Text>
        )
    }

  

    {
       team1 && team2 && matchDetails && teamBatting && teamBatting==matchDetails.team1_id && (
            <Text style={{fontWeight:'500',marginBottom:20,marginLeft:20,fontSize:20}}>
          {team1.name}-Batting
            </Text>
        )
    }

    {
        team1 && team2 && matchDetails && teamBatting && teamBatting==matchDetails.team2_id && (
             <Text style={{fontWeight:'500',marginBottom:20,marginLeft:20,fontSize:20}}>
           {team2.name}-Batting
             </Text>
         )
     }






    {
       team1 && team2 && matchDetails && (


            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>


           <TouchableOpacity onPress={()=>selectStriker()}
           style={{width:150,backgroundColor:'#44D177',height:'80%',justifyContent:'center'}}>
           <View>
           <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Striker</Text>
           </View>

           {
            striker? (
          <Text style={{textAlign:'center',fontWeight:'bold',fontWeight:'bold'}}>{striker.first_name} {striker.last_name}</Text>
            ): null
           
          }
              
        </TouchableOpacity>



      <TouchableOpacity onPress={()=>selectNonStriker()}
       style={{width:150,backgroundColor:'#44D177',height:'80%',justifyContent:'center'
 }}>

 <View>
 <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Non Striker</Text>
 </View>

    {
      nonStriker? (


    <Text style={{textAlign:'center',fontWeight:'bold'}}>{nonStriker.first_name} {nonStriker.last_name}</Text>
    
      ): null
     
    }
 </TouchableOpacity>



            </View>

            


        )
    }

    
    {
        team1 && team2 && matchDetails && teamBowling && teamBowling==matchDetails.team1_id && (
             <Text style={{fontWeight:'500',marginBottom:20,marginLeft:20,fontSize:20}}>
           {team1.name}-Bowling
             </Text>
         )
         
     }

     {
        team1 && team2 && matchDetails && teamBowling && teamBowling==matchDetails.team2_id && (
             <Text style={{fontWeight:'500',marginBottom:20,marginLeft:20,fontSize:20}}>
           {team2.name}-Bowling
             </Text>
         )
     }


    
    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>



    <TouchableOpacity onPress={()=>selectBowler()}
       style={{width:150,backgroundColor:'#44D177',height:'80%',justifyContent:'center'
 }}>

 <View>
 <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Bowler</Text>
 </View>

    {
      bowler? (


    <Text style={{textAlign:'center',fontWeight:'bold'}}>{bowler.first_name} {bowler.last_name}</Text>
    
      ): null
     
    }
 </TouchableOpacity>






     </View>




     <TouchableOpacity onPress={()=>goToScoring()} style={{width:'100%',backgroundColor:'#85D677',height:50,justifyContent:'center'}}>
     <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Lets Play</Text>
     </TouchableOpacity>



    </View>
  )
}

export default ChooseStriker