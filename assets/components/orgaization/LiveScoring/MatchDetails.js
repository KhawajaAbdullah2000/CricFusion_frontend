import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,BackHandler,Alert  } from 'react-native';




const MatchDetails = ({route,navigation}) => {
        useEffect(()=>{
            const backAction = () => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {text: 'YES', onPress: () => GoToPlayingElevel()},
                ]);
                return true;
              };
          
              const GoToPlayingElevel=()=>{
                navigation.navigate('playing_eleven',{
                    match_id:route.params.match_id
                })
              }
              const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
              );
          
              return () => backHandler.remove();
    
                },[])


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [overs,setOvers]=useState(null)

  return (

<View style={{flex:1}}>

<Text>Match Details {route.params.match_id}</Text>

    <View style={styles.container}>

            <View style={styles.fieldContainer}>
            <Text style={styles.label}>Overs</Text>
            <TextInput
            style={styles.input}
            value={overs}
            onChangeText={setOvers}
            inputMode='numeric'
            />
            <View style={styles.underline}></View>
        </View>


    </View>

 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 16,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default MatchDetails;
