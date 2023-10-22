import { StyleSheet, Text, View,Image } from 'react-native';

export default function Logo(props) {
    const {width,height}=props;
  return (
    <View >
    <Image source={require('../Logo.png')} style={{width,height}} resizeMode="contain"></Image>

    </View>
    
  );

}

const styles = StyleSheet.create({

});
