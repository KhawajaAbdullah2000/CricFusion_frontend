import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLogin } from "../../context/LoginProvider";
import client from '../../api/client';


const ApplyAsTeam = ({route,navigation}) => {
    const {profile,token}=useLogin();
    const [leagues,setLeagues]=useState([]);

 const fetchLeagues=async ()=>{
  try {
    const res=await client.get(`/nearby-leagues/${route.params.city}`);
         if(res.data.success){
              setLeagues(res.data.leagues);
          }else{
            console.log('No League Found');
          }
    
  } catch (error) {
    console.log(error.message)
  }
    
          
 }

 const Apply=(league_id)=>{
    navigation.push('apply_team_in_league',{
        league_id:league_id,
        team_id:route.params.team_id
    })
 }

    useEffect(()=>{
      fetchLeagues();
    },[])

    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const imageSources = {
      1: require('../../banner1.jpg'),
      2: require('../../banner2.jpg'),
      3: require('../../banner3.jpg'),
    };
    
    const renderItem = ({ item }) => (
    
      <View style={styles.card}>
      <Image source={imageSources[randomNumber]} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>From: {new Date(item.startsAt).toLocaleDateString('en-US',{
                   year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                  })} </Text>


    <TouchableOpacity style={styles.btn}
    onPress={()=>Apply(item._id)}>
    <Text style={{fontSize:15,textAlign:'center'}}>Apply as Team</Text>
    </TouchableOpacity>
      </View>   
      
      );


  return (
    <View style={styles.container}>
      <Text style={{fontSize:18,fontWeight:'bold',marginTop:20,textAlign:'center'}}>Nearby Leagues in {route.params.city}</Text>

{
    leagues &&  <FlatList
    data={leagues}
  renderItem={renderItem}
    keyExtractor={(item) => item._id}/>
}


     
    </View>

   


  )
}

export default ApplyAsTeam

const styles= StyleSheet.create({

    container:{
        flex:1,

    },
    mainmapview:{
    flexDirection:'row',marginTop:20,paddingVertical:25,backgroundColor:'purple',alignItems:'center',justifyContent:'space-between',
    marginTop:60
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
   paddingBottom:8,
    textAlign: 'center',
    backgroundColor: '#eee'

  },
  btn:{
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'lightblue',
  elevation:10
  }




});