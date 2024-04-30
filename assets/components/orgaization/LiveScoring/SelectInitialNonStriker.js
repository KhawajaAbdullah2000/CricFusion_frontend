import { View, Text ,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../../api/client'
import { useLogin } from '../../../context/LoginProvider'
import Apploader from '../../Apploader'

const SelectInitialNonStriker = ({route,navigation}) => {

  const [players,setPlayers]=useState([])
  const {setLoginPending, loginPending,nonStriker,setNonStriker } = useLogin();

  const fetchPlayers=async()=>{
   try {
    console.log(route.params.teamBatting)
    setLoginPending(true)
    const players=await client.get(`/players_batting_team/${route.params.match_id}/${route.params.teamBatting}`);
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
    fetchPlayers()
  },[])


  const selectStriker=(id,first_name,last_name)=>{

    setNonStriker({
      id: id,
      first_name: first_name,
      last_name: last_name
   
   
    });

  }

  const goBackToChooseStriker=()=>{
    navigation.navigate('choose_striker',{
      nonStriker:nonStriker,
      match_id:route.params.match_id
    })
  }
  return (
    <View style={{flex:1}}>
    {
      loginPending? <Apploader/>:null
    }
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:20}}>Select Non Striker</Text>

      {
        players && players.length>0 && (
          <FlatList
          data={players}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
          <TouchableOpacity onPress={()=>selectStriker(item._id,item.first_name,item.last_name)}
          style={[styles.playerItem, nonStriker.id == item._id ? styles.selected : styles.unselected]}>
          <Text style={[ styles.players
  
          ]}>
            {item.first_name} {item.last_name}
          </Text>
            
          </TouchableOpacity>
          )}
  />
        )
      }

      {
        players && players.length>0 && nonStriker.id!=null &&(
          <TouchableOpacity onPress={()=>goBackToChooseStriker()} style={{backgroundColor:'#85D677',width:'100%',height:40,justifyContent:'center'}}>
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
     fontSize:18
     
  },

  selected: {
      backgroundColor:'#44D177'
    },
    unselected: {
  
    },
    playerItem: {
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SelectInitialNonStriker