import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity,Image  } from 'react-native';
import client from '../../../api/client';
import { useLogin } from '../../../context/LoginProvider';
import Apploader from '../../Apploader';
const MatchDetails = ({route,navigation}) => {

  const [team1,setTeam1]=useState(null)
  const [team2,setTeam2]=useState(null)
  const [overs,setOvers]=useState(null)
  const [oversPerBowler,setOversPerBowler]=useState(null)
  const [selectedBall, setSelectedBall] = useState(null);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const {setLoginPending, loginPending } = useLogin();

  const updateMatchDetails=async()=>{
    try {
      if (overs && oversPerBowler && selectedBall && selectedPitch){
        setLoginPending(true)
      const res=await client.put("/update_match_details",{
        match_id:route.params.match_id,
        overs:overs,
        overs_per_bowler:oversPerBowler,
        ball_type:selectedBall,
        pitch_type:selectedPitch
      });
  
      if (res.data.success){
       // console.log("MAtch details updated. check db")
       setLoginPending(false)
        navigation.navigate("toss",{
          match_id:route.params.match_id
        });

      }
      else{
        setLoginPending(false)
      console.log("Error from backend: "+res.data.message)
      }
    }

    } catch (error) {
      setLoginPending(false)
      console.log("Error at frontend: "+error.message)
    }
  }

  const fetchData=async()=>{
    try {
     const res=await client.get(`/playing_eleven/${route.params.match_id}`);
     if (res.data.success){
         setTeam1(res.data.team1_name)
         setTeam2(res.data.team2_name)
     }
     
    } catch (error) {
     console.log(error.message)
    }
 
     }

     const handleBallPress = (ballType) => {
      setSelectedBall(ballType);
    };

    
    const handlePitchPress = (pitchType) => {
      setSelectedPitch(pitchType);
    };
 

        useEffect(()=>{
          fetchData();
          
    
          },[])



  return (

<View style={{flex:1}}>

{
  loginPending?<Apploader/>:null
}


{
  team1 && team2 && (
    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:20}}> {team1.name} vs {team2.name}</Text>
  )
}



    <View style={styles.container}>
    <Text>{selectedPitch} {selectedBall}</Text>

           <View style={styles.fieldContainer}>
            <Text style={styles.label}>Overs*</Text>
            <TextInput
            style={styles.input}
            value={overs}
            onChangeText={setOvers}
            inputMode='numeric'
            />
            </View>

            <View style={styles.fieldContainer}>
            <Text style={styles.label}>Overs Per Bowler*</Text>
            <TextInput
            style={styles.input}
            value={oversPerBowler}
            onChangeText={setOversPerBowler}
            inputMode='numeric'
            />
           
        </View>



    <View style={styles.fieldContainer}>
    <Text style={styles.label}>Ball Type*</Text>
    
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TouchableOpacity onPress={() => handleBallPress('hard')}>
      <Image
        source={require('../../../images/hardball.png')}
        style={{ width: 50, height: 50, borderColor:'black', borderRadius:50, borderWidth: selectedBall == 'hard' ? 2 : 0 }}
      />
      <Text>Hard</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleBallPress('tennis')}>
      <Image
        source={require('../../../images/tennisball.png')}
        style={{ width: 50, height: 50, borderColor:'black',borderRadius:50, borderWidth: selectedBall == 'tennis' ? 2 : 0 }}
      />
      <Text>Tennis</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleBallPress('other')}>
      <Image
        source={require('../../../images/otherball.png')}
        style={{ width: 50, height: 50, borderColor:'black',borderRadius:50, borderWidth: selectedBall == 'other' ? 2 : 0 }}
      />
      <Text>Other</Text>
    </TouchableOpacity>
  </View>
   
</View>


<View style={styles.fieldContainer}>
<Text style={styles.label}>Pitch type*</Text>

<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
<TouchableOpacity onPress={() => handlePitchPress('rough')}>
  <Image
    source={require('../../../images/rough.jpg')}
    style={{ width: 50, height: 50, borderColor:'black', borderRadius:50, borderWidth: selectedPitch == 'rough' ? 2 : 0 }}
  />
  <Text>Rough</Text>

</TouchableOpacity>

<TouchableOpacity onPress={() => handlePitchPress('cement')}>
  <Image
    source={require('../../../images/cement.jpg')}
    style={{ width: 50, height: 50, borderColor:'black',borderRadius:50, borderWidth: selectedPitch == 'cement' ? 2 : 0 }}
  />
  <Text>Cement</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => handlePitchPress('turf')}>
  <Image
    source={require('../../../images/turf.jpg')}
    style={{ width: 50, height: 50, borderColor:'black',borderRadius:50, borderWidth: selectedPitch == 'turf' ? 2 : 0 }}
  />
  <Text>Turf</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => handlePitchPress('matting')}>
  <Image
    source={require('../../../images/matting.jpg')}
    style={{ width: 50, height: 50, borderColor:'black',borderRadius:50, borderWidth: selectedPitch == 'matting' ? 2 : 0 }}
  />
  <Text>Matting</Text>
</TouchableOpacity>


</View>

</View>


    </View>

   <TouchableOpacity onPress={()=>updateMatchDetails()}  style={{backgroundColor:'green',height:50,justifyContent:'center'}}>
   <Text style={{fontSize:20,color:'white',fontWeight:"bold",textAlign:'center'}}>Next</Text>
   </TouchableOpacity>

 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
 
  },

  fieldContainer: {
    marginTop:20,
    marginBottom:10
  },
  label: {
    marginBottom: 3,
    fontSize: 16,
  },
  input: {
    height: 30,
    width:'50%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    fontSize: 16
  },

});

export default MatchDetails;
