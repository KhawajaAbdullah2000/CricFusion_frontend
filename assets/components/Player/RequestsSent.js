import { View, Text,StyleSheet,Dimensions,FlatList,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';

const RequestsSent = () => {

  const {profile}=useLogin();
  const [players,setPlayers]=useState([]);

  const fetchPlayers=async()=>{
    try {
      const res = await client.get(`/requests-sent-by-me/${profile._id}`);
      if (res.data.success){
        setPlayers(res.data.playerRequests)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  

  }

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
        </View>

        <View style={styles.ratingsContainer}>
        <Text style={[styles.ratingText,{textDecorationLine:'underline',color:'green'}]}>{item.RequestTo.first_name} {item.RequestTo.last_name}</Text>
          <Text style={styles.ratingText}>Invite to team: {item.Team.name}</Text>
          <Text style={styles.ratingText}>Status: {item.status}</Text>
        </View>
      </View>
    </View>
  );




  useEffect(()=>{
  fetchPlayers()
  },[])
  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{textAlign:'center',fontWeight:"bold",fontSize:20,marginTop:10,marginBottom:20}}>Requests Sent</Text>


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
 
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom:10
  },
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default RequestsSent