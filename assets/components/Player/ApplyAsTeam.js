import { View, Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLogin } from "../../context/LoginProvider";
import client from '../../api/client';


const ApplyAsTeam = ({route,navigation}) => {
    const {profile,token}=useLogin();
    const [leagues,setLeagues]=useState([]);

 const fetchLeagues=async ()=>{
    const res=await client.get(`/nearby-leagues/${route.params.city}`);
         if(res.data.success){
              setLeagues(res.data.leagues);
          }else{
            console.log('No League Found');
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


    
    const renderItem = ({ item }) => (
    
        <View style={styles.mainmapview}>
        <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>Name: {item.name} </Text>
        <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>From: {new Date(item.startsAt).toLocaleDateString('en-US',{
                 year: 'numeric',
                month: 'long',
               day: 'numeric',
               })} </Text>

    <TouchableOpacity style={{backgroundColor:'yellow',borderRadius:15,width:70,marginEnd:5,elevation:6,width:80}}
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
  }







});