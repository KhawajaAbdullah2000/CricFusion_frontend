import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';

const Profile = ({ route,navigation }) => {
  const [isAvailable, setIsAvailable] = useState(false);


  useEffect(()=>{
    console.log("current status: ",isAvailable)
  },[isAvailable])

  const handleToggleAvailability = () => {
   
    //firestore update status
      setIsAvailable(prevState => !prevState);
  
  
  
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Aliuddin</Text>

        <Switch
        onValueChange={handleToggleAvailability}         
         value={isAvailable}
       trackColor={{false:'red',true:'green'}}

        />
        
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cricket Stats</Text>
        <Text style={styles.stats}>Runs Scored: 600</Text>
        <Text style={styles.stats}>Wickets Taken:10</Text>
        <Text style={styles.stats}>Average: 33</Text>
        <Text style={styles.stats}>Strike Rate: 120</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9', // light green background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4caf50', // vibrant green
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32', // dark green
  },
  stats: {
    fontSize: 16,
    padding: 5,
    color: '#388e3c', // medium green
  },
});

export default Profile;
