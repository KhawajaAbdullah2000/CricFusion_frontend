import * as React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useLogin } from '../context/LoginProvider';
import Matches from './Player/Matches';
import Tournaments from './Player/Tournaments';
import PlayerHome from './PlayerHome';
import Team from './Player/Teams';


const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {setIsLoggedIn,setLoginPending,profile}=useLogin();

  const SignOut=async ()=>{
    try {
      const token= await AsyncStorage.getItem('token');
      if(token!=null){
      const res= await client.get('/player-logout',{
          Authorization: `JWT ${token}`
        })
        if(res.data.success){
          //console.log(res.data.message)
          await AsyncStorage.removeItem('token')
          return true;
        }
      }
      return false;

    } catch (error) {
      console.log('In signout mthod',error.message);
      return false;
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.first_name}</Text>
            <Text>{profile.email}</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={ ()=>{
        setLoginPending(true)
        const isLoggedOut=SignOut();
        if(isLoggedOut){
          setIsLoggedIn(false)
        }
        setLoginPending(false)

      }
 
      
      }
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height:90,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
    
    <Drawer.Screen component={PlayerHome} name='playerhome' />
    <Drawer.Screen component={Team} name='teams' />
      <Drawer.Screen component={Matches} name='matches' />
      <Drawer.Screen component={Tournaments} name='tournaments' />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
 