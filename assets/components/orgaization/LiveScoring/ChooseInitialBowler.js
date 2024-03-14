import { View, Text ,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../../api/client'
import { useLogin } from '../../../context/LoginProvider'
import Apploader from '../../Apploader'


const ChooseInitialBowler = ({route,navigation}) => {

  const [players,setPlayers]=useState([])
  const {setLoginPending, loginPending,bowler,setBowler } = useLogin();

  const fetchPlayers=async()=>{
   try {
    setLoginPending(true)
    const players=await client.get(`/players_batting_team/${route.params.match_id}/${route.params.teamBowling}`);
    if (players.data.success){
      setPlayers(players.data.team_players);
      setLoginPending(false)
    }
    else{
      console.log("Error from backend")
      setLoginPending(false)
    }
   } catch (error) {
    console.log(error.message)
    setLoginPending(false)
   }
  }

  useEffect(()=>{
    console.log("At select initial striker component useeffec match id and teamBowling params are :"+
    route.params.match_id+  " "+ route.params.teamBowling

    )
    fetchPlayers()
  },[])




  const selectStriker=(id,first_name,last_name)=>{

    setBowler({
      id: id,
      first_name: first_name,
      last_name: last_name
    });

  }

  const goBackToChooseStriker=()=>{
    navigation.navigate('choose_striker',{
      bowler:bowler,
      match_id:route.params.match_id
    })
  }
  return (
    <View style={{flex:1}}>
    {
      loginPending? <Apploader/>:null
    }
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:20}}>Select Bowler</Text>

      {
        players && players.length>0 && (
          <FlatList
          data={players}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
          <TouchableOpacity onPress={()=>selectStriker(item._id,item.first_name,item.last_name)}
          style={{flex:1,flexDirection:'row',marginTop:8, justifyContent:'center'}}>
          <Text style={[ styles.players,
            bowler.id == item._id ? styles.selected : styles.unselected
          ]}>
            {item.first_name} {item.last_name}
          </Text>
            
          </TouchableOpacity>
          )}
  />
        )
      }

      {
        players && players.length>0 && bowler.id!=null &&(
          <TouchableOpacity onPress={()=>goBackToChooseStriker()} style={{backgroundColor:'green',width:'100%',height:40,justifyContent:'center'}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:"bold",fontSize:20}}>Done</Text>
          </TouchableOpacity>
        )
      }

    </View>
  )
}

const styles=StyleSheet.create({
  players:{
      width:200,
      textAlign:'center',
      textAlignVertical:'center',
      height:30,
      fontWeight:'bold'
     
  },

  selected: {
      backgroundColor:'#7AA7FF'
    },
    unselected: {
   backgroundColor:'#44D177'
    },
})

export default ChooseInitialBowler