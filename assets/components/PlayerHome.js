import React,{useEffect} from "react";
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image} from "react-native";
import { useLogin } from "../context/LoginProvider";


export default function PlayerHome({route,navigation}) {
  const {profile,token}=useLogin();

  const posts = [
    { username: 'Pepsi', postText: 'Pepsi Premiere League (PPL) League starting from 25th Decemebr,2023', timestamp: '2 hours ago' },
    // Add more posts as needed
  ];



    //const {routeuser,routetoken}=route.params;
  return (
    <ScrollView style={styles.container}>
    



    {posts.map((post, index) => (
      <View key={index} style={styles.postContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.userInfoContainer}>
            <Image style={styles.userImage} source={require('../../assets/pepsiLogo.png')} />
            <Text style={styles.username}>{post.username}</Text>
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
        <Text style={styles.postText}>{post.postText}</Text>
        {/* Like and Comment buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleLike(post)}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleComment(post)}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  postText: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#517fa4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
