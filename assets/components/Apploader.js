import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

export default function Apploader() {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <LottieView source={require('../cricloader.json')} autoPlay loop/>
    </View>

  );
  }
const styles=StyleSheet.create({
    container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1
      }
   }
);
