import { View, Text,StyleSheet,Dimensions,FlatList,TouchableOpacity,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';

const AddPlayers = ({route,navigation}) => {
    const [players,setPlayers]=useState([]);
    const {profile}=useLogin()

    const fetchPlayers=async()=>{
      try {
        const res=await client.get(`/nearby-players/${route.params.city}`);
        if (res.data.success){
            setPlayers(res.data.players)

        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const sendRequest=async(request_to)=>{
      console.log(request_to)
    try {
      const res=await client.post('send-request',{
        requestor_id:profile._id,
        request_to_id:request_to,
        team_id:route.params.team_id
     });

     if (res.data.success){
      console.log(res.data.playerRequest)
     }
      
    } catch (error) {
      console.log(error.message)
    }
  
    }

    useEffect(()=>{
        fetchPlayers()
    },[])


    
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
        </View>

        {/* Player Ratings */}
        <View style={styles.ratingsContainer}>
        <Text style={[styles.ratingText,{textDecorationLine:'underline',color:'green'}]}>{item.first_name} {item.last_name}</Text>
          <Text style={styles.ratingText}>Batting Rating: 82</Text>
          <Text style={styles.ratingText}>Bowling Rating: 78</Text>
          <Text style={styles.ratingText}>Fielding Rating: 80</Text>


          <TouchableOpacity style={{backgroundColor:'lightgreen',width:105,height:30,justifyContent:'center',
          alignItems:'center',borderRadius:8,elevation:10,marginBottom:8}} onPressIn={()=>sendRequest(item._id)}>
          <Text style={{fontWeight:'bold'}}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <View style={{flex:1,padding:15}}>
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginBottom:10}}>Find Nearby Players</Text>
      
      {players && players.length > 0 && (
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2} // Set the number of columns to 2
        />
      )}


    </View>
  )
}
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; // Assuming 20px margin on both sides
const styles = StyleSheet.create({

    cardContainer: {
      marginBottom: 20,
      width: cardWidth,
      borderWidth:1,
      marginHorizontal:2
    },
    imageContainer: {
      overflow: 'hidden',
      borderColor: 'black',
      marginBottom: 20,
      justifyContent: 'center', // Center vertically
      alignItems: 'center',  
    },
    image: {
      width: 100,
      height: 100,
    },
    ratingsContainer: {
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

export default AddPlayers
