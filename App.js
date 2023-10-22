import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './assets/components/Login';
import Home from './assets/components/Home';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        title:"Lets Play",
        headerStyle:{
          backgroundColor:'lightgreen',
        },
        headerTitleStyle:{
          fontSize:20,
          fontWeight:'bold'
        }
      }}>
      <Stack.Screen name="home" component={Home} options={{
      headerShown:false
      
      }}/> 
      <Stack.Screen name="login" component={Login}/>    
      </Stack.Navigator>

  



    </NavigationContainer>
  );
}

