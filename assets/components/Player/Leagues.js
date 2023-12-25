import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useLogin } from "../../context/LoginProvider";
import client from '../../api/client';
import Apploader from '../Apploader';


const Leagues = ({route,navigation}) => {
    const {profile,loginPending,setLoginPending}=useLogin();
    const [leagues,setLeagues]=useState([]);

 const fetchLeagues=async ()=>{
    setLoginPending(true)
    try {
      const res=await client.get(`/nearby-leagues/${profile.city}`);
      console.log(res.data.success,+ "at fetch leagues");
           if(res.data.success){
                setLeagues(res.data.leagues);
                setLoginPending(false)
            }else{
              console.log('No League Found');
            }
      
    } catch (error) {
      console.log(error.message)
    }

          
 }

 const Apply=(league_id)=>{
const playerId=profile._id;
  
     navigation.navigate('register_as_individual',{
        league_id:league_id,
        player_id:playerId
     });
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
                 <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>Register for Auction</Text>
                 </TouchableOpacity>
      
    
   </View>

    
    //     <View style={styles.mainmapview}>
    //     <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>Name: {item.name} </Text>
    //     <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>From: {new Date(item.startsAt).toLocaleDateString('en-US',{
    //              year: 'numeric',
    //             month: 'long',
    //            day: 'numeric',
    //            })} </Text>

    // <TouchableOpacity style={{backgroundColor:'yellow',borderRadius:15,width:70,marginEnd:5,elevation:6,width:80}}
    // onPress={()=>Apply(item._id)}>
    // <Text style={{fontSize:15,textAlign:'center'}}>Apply as Team</Text>
    // </TouchableOpacity>
    //   </View>   
      
      );


  return (
    <View style={styles.container}>
      <Text style={{fontSize:18,fontWeight:'bold',marginTop:20,textAlign:'center'}}>Nearby Leagues in {profile.city}</Text>

      

{
    leagues &&  <FlatList
    data={leagues}
  renderItem={renderItem}
    keyExtractor={(item) => item._id}/>
}


     
    </View>

   


  )
}

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
    backgroundColor: '#eee',

  },
  btn:{
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'lightblue',
  elevation:10
  }
  




});


export default Leagues;

