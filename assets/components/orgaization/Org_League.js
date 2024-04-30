import { View, Text ,StyleSheet,FlatList,Image,TouchableOpacity,Modal,TextInput,ScrollView} from 'react-native'
import React ,{ useEffect,useState }from 'react'
import {useLogin} from '../../context/LoginProvider';
import client from '../../api/client';

import { Share } from 'react-native';

//import {Share} from 'react-native-share';

const Org_League = ({route,navigation}) => {
  const { profile, setLoginPending, loginPending ,setContextLeague_id} = useLogin();
const [league,setLeague]=useState([]);
const [teams,setTeams]=useState([]);
const [modalVisible,setModalVisible]=useState(false)
const [value, onChangeText] =useState('Type your message');



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

const promoteLeague=async (league_id)=>{

  const options={
    message:value

  }
  
  Share.share(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
  setModalVisible(false);
}

 const randomNumber = Math.floor(Math.random() * 3) + 1;
 


const scheduleMatches=(league_id)=>{

setContextLeague_id(league_id);
  
  navigation.push('Schedule_League');

  //  navigation.push('Schedule_League',
  //        {
  //           league_id:league_id
  //       }
  //        );


}


  
  const renderItem = ({ item }) => (

    <View style={styles.card}>

<Image source={require('../../teamlogo.png')} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
               

</View>

  );

    

  useEffect(()=>{
    console.log("At use effect of org-leagues")
    fetchLeagueDetails(route.params.league_id);
    fetchTeamsRegistered(route.params.league_id)
  },[]);


  return (


    <View style={styles.container}>

  

    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
    <View style={{backgroundColor:'#44D177',height:50,width:100,justifyContent:'center',
    alignItems:'center',alignSelf:'flex-end',marginEnd:20,borderRadius:20}}>
    <Text style={{fontWeight:'bold'}}>Promote League</Text>
    </View>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => scheduleMatches(route.params.league_id)}>
    <View style={{backgroundColor:'#44D177',height:50,width:100,justifyContent:'center',
    alignItems:'center',alignSelf:'flex-end',marginEnd:20,borderRadius:20,marginTop:20}}>
    <Text style={{fontWeight:'bold'}}>Schedule Matches</Text>
    </View>
    </TouchableOpacity>

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

     <Modal
     animationType="slide"
     transparent={false}
     visible={modalVisible}
     onRequestClose={() => {
         setModalVisible(false);
     }}
     >
 
     <ScrollView>

     <View style={styles.centeredView}>

     <Text style={{fontWeight:'bold',fontSize:20,marginTop:40}}>Promote Your League</Text>

     <Text style={{alignSelf:'flex-start',marginLeft:40,marginTop:20,fontWeight:'bold'}}>Type your meesage</Text>
     <TextInput
     editable
     multiline
     onChangeText={text => onChangeText(text)}
     value={value}
     style={{width:'80%',borderWidth:1,borderColor:'#1b1b33',height:50,marginTop:10}}
   />
   <View style={{flexDirection:'row',marginTop:10,alignSelf:'flex-end'}}>

   <TouchableOpacity
       onPress={()=>setModalVisible(false)}>
       <View style={{backgroundColor:'blue',borderRadius:20,width:120,height:40,justifyContent:'center'}}>
       <Text style={{textAlign:'center',color:'white'}}>Cancel</Text>
       </View>
   </TouchableOpacity>

   <TouchableOpacity
   onPress={()=>promoteLeague(route.params.league_id)}>
   <View style={{backgroundColor:'#44D177',borderRadius:20,width:120,height:40,justifyContent:'center'}}>
   <Text style={{textAlign:'center',color:'white'}}>Share</Text>
   </View>
</TouchableOpacity>


   </View>

 
   
     </View>
     </ScrollView>
 
     </Modal>
    
  
  
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
    borderRadius: 10,
    width:'100%',
    alignItems:'center'
   
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  title: {
  width:'50%',

paddingVertical:10, 
 textAlign: 'center',
    backgroundColor: '#44D177',

  },

 

  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 200,
   paddingBottom:100,
    backgroundColor:'grey'
},


});





export default Org_League;

