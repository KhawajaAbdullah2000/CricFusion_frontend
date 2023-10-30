
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Home from './Home';
import PlayerHome from './PlayerHome';
import { useLogin } from '../context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';



const Stack = createNativeStackNavigator();
const StackNavigator=()=>{
    return (
        <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={{
        headerShown:false
        }}/>
        <Stack.Screen name="login" component={Login} options={{
        headerShown:false
        }}/>

        <Stack.Screen name="playerhome" component={PlayerHome} options={{
        headerShown:false
        }}/>

        </Stack.Navigator>
    )
}

const MainNavigator = () => {
  const {isLoggedIn}=useLogin();
   return isLoggedIn? <DrawerNavigator/>: <StackNavigator/>

}

export default MainNavigator;
