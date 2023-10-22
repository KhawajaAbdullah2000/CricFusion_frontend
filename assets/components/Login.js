import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Dimensions} from 'react-native';
import React,{useRef,useState} from 'react'
const width=Dimensions.get('window').width

import LoginAsPlayer from './LoginAsPlayer';
import LoginAsOrg from './LoginAsOrg';


export default function Login() {
    const scrollview=useRef();

  return (
    <View style={styles.container}>
        <View style={{height:80}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.heading}>Welcome Back </Text>
            <Text style={[styles.heading,{color:'lightgreen'}]}>Champ</Text>
            </View>
        </View>


    <View style={{flexDirection:'row',paddingHorizontal:20}}>
        <TouchableWithoutFeedback onPress={()=>scrollview.current.scrollTo({x:0})} >
            <View style={styles.headerbtn}>
            <Text style={{color:'white',fontSize:16}}>Login As Player</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={()=>{
            scrollview.current.scrollTo({x:width})
        }
            
        }
             >
            <View style={[styles.headerbtn,{backgroundColor:'#7a766a'}]}>
            <Text style={{color:'white',fontSize:16}}>Login As Organization</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>


            <ScrollView horizontal pagingEnabled ref={scrollview}> 
            
            <ScrollView>
            <LoginAsPlayer/>
            </ScrollView>
          

           <ScrollView>
           <LoginAsOrg/>
           </ScrollView>
           

            </ScrollView>

    </View>
    
  );

}

const styles = StyleSheet.create({
container:{
    flex:1,
    paddingTop:60,
},
heading:{
    fontSize:30,
    fontWeight:'bold',
    color:'#1b1b33',
    textAlign:'center'
},
headerbtn:{
    height:45,
    width:'50%',
    backgroundColor:'#1b1b33',
    justifyContent:'center',
    alignItems:'center',

}

});
