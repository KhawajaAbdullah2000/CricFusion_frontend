import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

const Grid = ({ onScoreChange, onWicketChange }) => {
  const handleButtonPress=(points)=>{
    onScoreChange(points);
  };

  const handleWicketButtonPressed=()=>{
    onWicketChange();
  };
  const buttons = [
    { id: 0, label: '0',value:0 },
    { id: 1, label: '1',value:1 },
    { id: 2, label: '2',value:2 },
    { id: 3, label: '3',value:3 },
    { id: 4, label: '4',value:4 },
    { id: 5, label: '5/7',value:5 },
    { id: 6, label: '6',value:6 },
    { id: 7, label: 'WD (Wide)',value:1 },
    { id: 8, label: 'NB (Noball)',value:1 },
    { id: 9, label: 'UNDO' ,value:0},
    { id: 10, label: 'WICKET', onPress:handleWicketButtonPressed },
    { id: 11, label: 'BYE' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={button.id} style={[styles.button]}
        onPress={() => button.onPress? button.onPress : handleButtonPress(button.value)}
        >
          <Text style={styles.buttonText}>{button.label}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderBlockColor:'#c2c2d6',
  },
  button: {
    width: '25%', // Adjust as needed
    height: '33.3%', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor:'#c2c2d6',
    borderLeftWidth: 0.5,
    borderRightWidth:0.5,
    borderTopWidth:0.5,
    borderEndWidth:0.5,
  },
  buttonText: {
    fontSize: 20,
    color:'#808080',
  },
  
});

export default Grid;