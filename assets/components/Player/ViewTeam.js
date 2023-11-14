import { View, Text } from 'react-native'
import React from 'react'

export default function ViewTeam({route}) {

  return (
    <View>
      <Text>View Team for Team ID: {route.params.team_id}</Text>
    </View>
  )
}