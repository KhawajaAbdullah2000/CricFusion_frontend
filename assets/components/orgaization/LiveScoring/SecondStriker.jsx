import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react'
import client from '../../../api/client';
import { useLogin } from '../../../context/LoginProvider';

const SecondStriker  = ({dismissedPlayers ,onClose,match_id ,teamBatting}) => {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const {setStriker} = useLogin();
    useEffect(() => {
    // Simulate fetching the player list from an API
    fetchPlayers().then((players) => {
      // Filter out dismissed players
      const filteredPlayers = players.filter(player => !dismissedPlayers.includes(player._id));
      if (filteredPlayers.length === 0) {
        onClose(); // Close the modal first, optionally
     
      }
      setAvailablePlayers(filteredPlayers);
    });
  }, [dismissedPlayers]);

  // Placeholder function for fetching players
  async function fetchPlayers() {
    const players=await client.get(`/players_batting_team/${match_id}/${teamBatting}`);
    if (players.data.success){
       // console.log(players.data.team_players)
        return players.data.team_players;
    }


try {
    
} catch (error) {
    console.log(error.message)
}   
  }

  const onSelectPlayer = (player) => {
  setStriker(
    {
        id:player._id,
        first_name:player.first_name,
        last_name:player.last_name
    }

  ); 
  onClose(); // Assuming this closes the modal
};


  return (
    <View style={styles.container}>
      <ScrollView>
        {availablePlayers.map(player => (
          <TouchableOpacity key={player._id} style={styles.playerItem} onPress={() => onSelectPlayer(player)}>
            <Text style={styles.playerText}>{player.first_name} {player.last_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  playerItem: {
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerText: {
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default SecondStriker 