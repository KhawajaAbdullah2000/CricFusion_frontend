import * as React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();


import { useLogin } from '../context/LoginProvider';
import Matches from './Player/Matches';
import Tournaments from './Player/Tournaments';
import PlayerHome from './PlayerHome';
import Teams from './Player/Teams';
import ViewTeam from './Player/ViewTeam';
import ApplyAsTeam from './Player/ApplyAsTeam';
import ApplyTeamInLeague from './Player/ApplyTeamInLeague';
import Leagues from './Player/Leagues';
import RegisterAsIndividual from './Player/RegisterAsIndividual';
import PlayerListAuction from './Player/PlayerListAuction';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {setIsLoggedIn,setLoginPending,profile,setProfile}=useLogin();

  const SignOut=async ()=>{
    try {
      const token= await AsyncStorage.getItem('token');
      if(token!=null){
      const res= await client.get('/player-logout',{
          Authorization: `JWT ${token}`
        })
        if(res.data.success){
          console.log("at player logout line 37")
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
      <TouchableOpacity onPress={()=>{
        setLoginPending(true)
        console.log("at line 81");
        const isLoggedOut=SignOut();
        if(isLoggedOut){
          setIsLoggedIn(false)
          setProfile({})
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

const TargetStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="teams_page" component={Teams} options={{ headerShown: false}}/>
      <Stack.Screen name="view_team" component={ViewTeam} options={{ headerShown: false}}/>
      <Stack.Screen name="apply_as_team" component={ApplyAsTeam} options={{ headerShown: false}}/>
      <Stack.Screen name="apply_team_in_league" component={ApplyTeamInLeague} options={{ headerShown: false}}/>
      <Stack.Screen name="player_list" component={PlayerListAuction} options={{ headerShown: false}}/>

      
    </Stack.Navigator>
  );
};

const LeagueForIndividualStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="leagues" component={Leagues} options={{ headerShown: false}}/>
      <Stack.Screen name="register_as_individual" component={RegisterAsIndividual} options={{ headerShown: false}}/>


    
    </Stack.Navigator>
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
    <Drawer.Screen component={TargetStackNavigator} name='My Teams' />
    <Drawer.Screen component={LeagueForIndividualStackNavigator} name='Leagues' />


      <Drawer.Screen component={Matches} name='matches' />
      <Drawer.Screen component={Tournaments} name='tournaments' />

    </Drawer.Navigator>


  );
};

export default DrawerNavigator;
 