import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image,TouchableWithoutFeedback } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { ScrollView } from 'react-native-gesture-handler';

const ScheduleMatches = ({route}) => {


const [teams,setTeams]=useState([]);

const [team1,setTeam1]=useState(null);
const [team2,setTeam2]=useState(null);
const [borderColor,setBorderColor]=useState(null);





const fetchTeamsRegistered=async(league_id)=>{

 const res=await client.get(`/teams-in-leagues/${league_id}`);
//console.log(res2.data.teams_in_leagues);
   if(res.data.success){ 

     setTeams(res.data.teams_in_leagues)

   }else{
        console.log("no team found")
      setTeams([]);
     setLoginPending(false);

  //  }

  }
}

useEffect(()=>{

    fetchTeamsRegistered(route.params.league_id)
  },[]);



  
 const randomNumber = Math.floor(Math.random() * 3) + 1;
 
 const imageSources = {
   1: require('../../banner1.jpg'),
   2: require('../../banner2.jpg'),
   3: require('../../banner3.jpg'),
 };

 const chooseTeam1=(team_id)=>{
    if(team1!=team_id){
        setTeam1(team_id);
    }else{
        setTeam1(null)
    }

 }

 const chooseTeam2=(team_id)=>{
    if(team2!=team_id){
        setTeam2(team_id);
    }else{
        setTeam2(null)
    }

 }
 

  const renderItem = ({ item }) => (

   
    <View style={[styles.card]}>
 
    <Image source={imageSources[randomNumber]} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
                <TouchableOpacity style={styles.btn}
                onPress={()=>chooseTeam1(item.team_id)}
                >
                {
                    team1!=null && team1==item.team_id? 
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold',backgroundColor:'lightgreen'}}>
                    Unselect
                    </Text>
                    :
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>
                    Select Team
                    </Text>

                    
                }

           
             </TouchableOpacity>
</View>



  );


  const renderItem2 = ({ item }) => (

    <View style={styles.card}>
    <Image source={imageSources[randomNumber]} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
                <TouchableOpacity style={styles.btn}
                onPress={()=>chooseTeam2(item.teams._id)}
                >
                {
                    team2!=null && team2==item.team_id? 
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold',backgroundColor:'lightgreen'}}>
                    Unselect
                    </Text>
                    :
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>
                    Select Team
                    </Text>

                    
                }
             </TouchableOpacity>

</View>
  );


  return (
    <View style={styles.container}>

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{fontSize:20,fontWeight:'900',textAlign:'center'}}>Schedule Matches</Text>
      {
        team1!=null && team2!=null?   <TouchableOpacity>
        <Text style={{backgroundColor:'lightblue',borderRadius:10,width:90,textAlign:'center'}}>Create match</Text>
         </TouchableOpacity>:null
      }
   
      </View>


    <View style={{flex:1,flexDirection:'row'}}>

    {
  
        teams && (
         <FlatList
         data={teams}
        renderItem={renderItem}
         keyExtractor={(item) => item._id}
      
         showsVerticalScrollIndicator={false} 
      
         />
        )
        }  
      



        {
  
            teams && (
             <FlatList
             data={teams}
            renderItem={renderItem2}
             keyExtractor={(item) => item._id}
        
             showsVerticalScrollIndicator={false} 
             
             />
            )
      
            } 
           

        </View>

      
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      marginTop:30
     
    },
    card: {
    
        flex:1,
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
    },

    selectedbtn:{
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'lightgreen',
      elevation:10
      },
  
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: 200,
     paddingBottom:100,
      backgroundColor:'red'
  },
  
  
  });
  

export default ScheduleMatches