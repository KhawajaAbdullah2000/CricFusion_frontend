import { View, Text } from 'react-native'
import React from 'react'

const Org_League = ({route}) => {
  return (
    <View>
      <Text style={{margin:10}}>Org_League: {route.params.league_id}</Text>
    </View>
  )
}

export default Org_League