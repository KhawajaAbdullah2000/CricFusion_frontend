import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'

const RequestsSent = () => {
  return (
    <View style={{flex:1}}>
      <Text style={{textAlign:'center',fontWeight:"bold",fontSize:20,marginTop:10}}>Requests Sent</Text>
    </View>
  )
}

export default RequestsSent