import { StyleSheet, Text, View,Dimensions,TouchableOpacity,ScrollView, KeyboardAvoidingView } from 'react-native';
import FormInput from './FormInput';

export default function LoginAsOrg() {
  return (
<KeyboardAvoidingView style={{alignItems:'center'}}>
    <View style={{alignItems:'center',width:Dimensions.get('window').width}}>
    <Text style={{fontSize:20,fontWeight:'bold',marginBottom:20,marginTop:15}}>Login as Organization</Text>
</View>

{/* <FormInput label='First Name' placeholder=''/> 
<FormInput label='Last Name' placeholder=''/>  */}

<FormInput label='Org Email' placeholder='Enter your email'/> 
<FormInput label='Password' placeholder='*****'/> 
{/* <FormInput label='Confirm Password' placeholder='*****'/>  */}



<TouchableOpacity style={styles.submitBtn}>
<Text>Signup</Text>
</TouchableOpacity>



</KeyboardAvoidingView>

    
  );

}

const styles = StyleSheet.create({
    headerbtn:{
        height:45,
        width:'50%',
        backgroundColor:'#1b1b33',
        justifyContent:'center',
        alignItems:'center',
    },
    submitBtn:{
      height:45,
      paddingHorizontal:50,
      backgroundColor:'lightgreen',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      shadowColor:'darkgreen',
      shadowOffset:{
        width:0,height:8
      },
      shadowOpacity: 0.43,
      shadowRadius:8,
      elevation:15,
      
    }
});
