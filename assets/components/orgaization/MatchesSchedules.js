import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import { useFocusEffect } from '@react-navigation/native';

const MatchesSchedules = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const { contextLeague_id } = useLogin();

  const fetchMatches = async () => {
    const res = await client.get(`/league-schedule/${contextLeague_id}`);
    if (res.data.success) {
      setMatches(res.data.leagueSchedule);
    } else {
      setMatches([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMatches();
    }, [])
  );

  const StartScoring = (match_id) => {
    navigation.navigate('playing_eleven', {
      match_id: match_id
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{new Date(item.match_date).toLocaleDateString('en-us', {
        month: 'short', day: '2-digit'
      })} {new Date(item.match_date).toLocaleTimeString('en-us', {
        hour: '2-digit', minute: '2-digit', hour12: true
      })}</Text>
      <Text style={styles.column}>{item.Team1.name} vs {item.Team2.name}</Text>
      <Text style={styles.column}>{item.venue}</Text>
      {item.match_status === 0 ? (
        <TouchableOpacity onPress={() => StartScoring(item._id)} style={styles.startButton}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.finishedText}>Finished</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>League Schedule</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerColumn}>Date</Text>
        <Text style={styles.headerColumn}>Match</Text>
        <Text style={styles.headerColumn}>Venue</Text>
        <Text style={styles.headerColumn}>Status</Text>
      </View>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerColumn: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  column: {
    flex: 1,
    textAlign: 'center'
  },
  startButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  finishedText: {
    textAlign: 'center',
    color: 'red'
  }
});

export default MatchesSchedules;
