import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './assets/components/MainNavigator';
import React from 'react';


import LoginProvider from './assets/context/LoginProvider';

export default function App() {

  return (

    <LoginProvider>
    
   
    <NavigationContainer>

     <MainNavigator/>

    </NavigationContainer>

    </LoginProvider>
  
  
    
  );
}



