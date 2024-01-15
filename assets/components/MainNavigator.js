import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Home from "./Home";
import PlayerHome from "./PlayerHome";
import { useLogin } from "../context/LoginProvider";
import DrawerNavigator from "./DrawerNavigator";
import OrgDrawerNavigator from "./OrgDrawerNavigator"

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn ,isOrgLoggedIn} = useLogin();
  console.log("At main navigator: "+isLoggedIn)
  return (
    isLoggedIn ? <DrawerNavigator /> :  isOrgLoggedIn? <OrgDrawerNavigator/>:   <StackNavigator />
  
  )

  
};

export default MainNavigator;
