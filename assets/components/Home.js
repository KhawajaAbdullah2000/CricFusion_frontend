import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Logo from './logo';

export default function Home(props) {
  return (
 
    <View style={styles.container}>
      <Logo width={800} height={260}/>
      <TouchableOpacity style={styles.playbtn} onPress={() =>props.navigation.navigate('login')}>
        <Text>Lets Play</Text>
      </TouchableOpacity>
    </View>
    
  );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        },
        playbtn:{
        backgroundColor:'lightgreen',
        paddingHorizontal:40,
        paddingVertical:15,
        borderRadius:8,
        elevation:8,
        shadowColor:'black',
        }
});
