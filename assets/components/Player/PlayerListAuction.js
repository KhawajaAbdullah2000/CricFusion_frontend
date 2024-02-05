import { View, Text, Image, FlatList, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import Apploader from '../Apploader';
import { useLogin } from "../../context/LoginProvider";

const PlayerListAuction = ({ route, navigation }) => {
  const { setLoginPending, loginPending } = useLogin();

  const fetchPlayers = async (league_id) => {
    try {
      setLoginPending(true);
      const res = await client.get(`/player-list-for-auction/${league_id}`);
      if (res.data.success) {
        setPlayers(res.data.PlayersInLeague);
        setLoginPending(false);
      } else {
        setLoginPending(false);
      }

    } catch (error) {
      setLoginPending(false);
      console.log(error.message);
    }
  };

  const goToBidding=(player_id)=>{
    navigation.navigate("bid_player",{
      player_id:player_id,
      league_id:route.params.league_id
    })
  }

  useEffect(() => {
    fetchPlayers(route.params.league_id);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/playerAvatar.png')} style={styles.image} />
        </View>

        {/* Player Ratings */}
        <View style={styles.ratingsContainer}>
        <Text style={[styles.ratingText,{textDecorationLine:'underline',color:'green'}]}>{item.Player.first_name} {item.Player.last_name}</Text>
          <Text style={styles.ratingText}>Batting Rating: 82</Text>
          <Text style={styles.ratingText}>Bowling Rating: 78</Text>
          <Text style={styles.ratingText}>Fielding Rating: 80</Text>
          <Text style={styles.ratingText}>Base Price: 1000PKR</Text>
          <Text style={styles.ratingText}>Current Bid: No bids yet</Text>
          <TouchableOpacity onPress={()=>goToBidding(item.player_id)} style={{backgroundColor:'lightgreen',width:80,height:30,justifyContent:'center',
          alignItems:'center',borderRadius:8,elevation:10}}>
          <Text style={{fontWeight:'bold'}}>Bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const [players, setPlayers] = useState([]);

  if (loginPending) {
    return <Apploader />;
  }

  return (


    <View style={styles.container}>
    <Text style={styles.headerText}>Players Auction! Start Bidding</Text>


      {players && players.length > 0 && (
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2} // Set the number of columns to 2
        />
      )}
      </View>
   
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; // Assuming 20px margin on both sides

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16

  },
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

export default PlayerListAuction;
