import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Login from './assets/components/Login';
import Home from './assets/components/Home';
import PlayerHome from './assets/components/PlayerHome';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
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

  



    </NavigationContainer>
  );
}

