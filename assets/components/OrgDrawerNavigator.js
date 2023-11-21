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
import OrganizationHome from "./orgaization/OrganizationHome";
import Leagues from "./orgaization/Leagues";
import Org_League from './orgaization/Org_League';


const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {setIsLoggedIn,setLoginPending,profile,setIsOrgLoggedIn}=useLogin();

  const SignOut=async ()=>{
    try {
      const token= await AsyncStorage.getItem('org_token');
      if(token!=null){

          //console.log(res.data.message)
          await AsyncStorage.removeItem('org_token')
          return true;
        
      }
      return false;

    } catch (error) {
      console.log('In Org signout mthod',error.message);
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
            <Text>{profile.name}</Text>
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
        console.log("logout");
     setLoginPending(true)
        const isLoggedOut=SignOut();
        if(isLoggedOut){
       setIsOrgLoggedIn(false)
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
    <Stack.Screen name="Leagues" component={Leagues} options={{headerShown: false}} />
    <Stack.Screen name="Org_League" component={Org_League} options={{headerShown: false}} />

    </Stack.Navigator>
  );
};

const OrgDrawerNavigator = () => {
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
    
    <Drawer.Screen component={OrganizationHome} name='organizationhome' />

     <Drawer.Screen component={TargetStackNavigator} name='leagues' />
   
    </Drawer.Navigator>


  );
};

export default OrgDrawerNavigator;
 