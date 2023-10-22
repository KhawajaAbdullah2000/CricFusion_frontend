import {Text, View,Dimensions,TextInput } from 'react-native';


export default function FormInput(props) {
    const label=props.label;
    let checklabel=false;
    if (label=='Password' || label=='Confirm Password'){
         checklabel=true;
    }
    return (
        
        
    <View style={{width:Dimensions.get('window').width,paddingHorizontal:20,marginBottom:10}}>
    <Text style={{fontWeight:'bold',fontSize:17,marginBottom:5}}>{props.label}</Text>
     <TextInput secureTextEntry={checklabel} placeholder={props.placeholder} style={{borderWidth:1,borderColor:'#1b1b33',
     height:35,borderRadius:8,fontSize:16,paddingLeft:10,marginTop:5}} />
      
    </View>
       
 
    );
  
}
