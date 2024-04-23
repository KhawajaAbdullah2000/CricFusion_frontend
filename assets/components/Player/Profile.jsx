import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:27,marginTop:15}}> My Profile</Text>
    </View>
  )
}

const styles=StyleSheet.create({
 container:{
    flex:1,
    alignItems:'center'
 }

})

export default Profile
