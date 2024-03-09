import { View, Text,FlatList,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'

import client from '../../../api/client'

const Playing_eleven = ({route,navigation}) => {

    const [team1,setTeam1]=useState(null)
    const [team2,setTeam2]=useState(null)
    const [players_team1,setPlayersTeam1]=useState([])
    const [players_team2,setPlayersTeam2]=useState([])
    const [playing_eleven_team1,setPlaying_Team1]=useState([])
    const [playing_eleven_team2,setPlaying_Team2]=useState([])


    useEffect(()=>{
    fetchData()
    },[playing_eleven_team1,playing_eleven_team2])

    const fetchData=async()=>{
   try {
    const res=await client.get(`/playing_eleven/${route.params.match_id}`);
    if (res.data.success){
        setTeam1(res.data.team1_name)
        setTeam2(res.data.team2_name)
        setPlayersTeam1(res.data.players_team1)
        setPlayersTeam2(res.data.players_team2)
    }
    
   } catch (error) {
    console.log(error.message)
   }

    }

    const Add_player_Team1=(player_id)=>{
         // Check if item is already selected
  if (playing_eleven_team1.includes(player_id)) {
    // Item is already selected, remove it
    const newSelectedItems = playing_eleven_team1.filter((selectedItem) => selectedItem !== player_id);
    setPlaying_Team1(newSelectedItems);
   
  } else {
    // Item is not selected, add it
    setPlaying_Team1([...playing_eleven_team1, player_id]);
  }
    }

    const Add_player_Team2=(player_id)=>{
        // Check if item is already selected
 if (playing_eleven_team2.includes(player_id)) {
   // Item is already selected, remove it
   const newSelectedItems = playing_eleven_team2.filter((selectedItem) => selectedItem !== player_id);
   setPlaying_Team2(newSelectedItems);
  
 } else {
   // Item is not selected, add it
   setPlaying_Team2([...playing_eleven_team2, player_id]);
 }
   }

  return (
    <View style={{flex:1}}>

    {
        team1 && team2 && (
            <View>
            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginTop:10}}>{team1.name} vs {team2.name}</Text>
           
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 20}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',marginTop:6,marginBottom:10}}>Select Playing XI</Text>
                
                {
                    playing_eleven_team1.length==11 && playing_eleven_team2.length==11 &&
                    <TouchableOpacity style={{width: 50, height: 30, backgroundColor: '#FF5E63', borderRadius: 10,marginLeft:30,justifyContent:'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white',fontSize:15}}>Next</Text>
                    </TouchableOpacity>

                }
                
              
          </View>
            
            </View>
        )
    }

    <View style={{flex:1,flexDirection:'row'}}>

    <View style={{flex:1,width:'50%',backgroundColor:'lightgreen',alignItems:'center',borderColor:'black',borderRightWidth:1}}>
        {
            team1 && (
                <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>{team1.name}</Text>
            )
        }
           
            
        {
        players_team1 && players_team1.length>0 && (
            <FlatList
                data={players_team1}
                keyExtractor={(item) => item.player_id}
                renderItem={({item}) => (
                <TouchableOpacity onPress={()=>Add_player_Team1(item.player_id)} style={{flex:1,flexDirection:'row',marginTop:8}}>
                    <Text style={[styles.players,
                        playing_eleven_team1.includes(item.player_id) ? styles.selected : styles.unselected,
                    ]}>{item.first_name} {item.last_name}
                    {item.player_id==team1.captain_id? '  C':''}
                    </Text>
                </TouchableOpacity>
                )}
        />
            )
        }

    </View>

   
    <View style={{flex:1,width:'50%',backgroundColor:'lightgreen',alignItems:'center'}}>
    {
        team2 && (
            <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>{team2.name}</Text>

        )
    }
  
    {
        players_team2 && players_team2.length>0 && (
            <FlatList
                data={players_team2}
                keyExtractor={(item) => item.player_id}
                renderItem={({item}) => (
                <TouchableOpacity onPress={()=>Add_player_Team2(item.player_id)} style={{flex:1,flexDirection:'row',marginTop:8}}>
                    <Text style={[styles.players,
                        playing_eleven_team2.includes(item.player_id) ? styles.selected : styles.unselected,
                    ]}>{item.first_name} {item.last_name}
                    {item.player_id==team2.captain_id? '  C':''}
                    </Text>
                </TouchableOpacity>
                )}
        />
            )
        }



    </View>
</View>
     
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
export default Playing_eleven