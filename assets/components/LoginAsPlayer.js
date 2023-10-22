import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginAsPlayer() {
  const [showModal, setModal] = useState(false);
  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Modal transparent={true} visible={showModal} animationType='slide'>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ backgroundColor: "lightgreen", padding: 10 }}>
            <View style={{ position: "absolute", right: 15 }}>
              <TouchableWithoutFeedback onPress={() => setModal(false)}>
                <View>
                  <Ionicons name="close-outline" size={40} color="red" />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <Text
              style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}
            >
              Signup
            </Text>
            <View style={{ marginBottom: 5 }}>
              <FormInput label="First Name" placeholder="" />
              <FormInput label="Last Name" placeholder="" />
              <FormInput label="Email" placeholder="Enter your email" />
              <FormInput label="Password" placeholder="*****" />
              <FormInput label="Confirm Password" placeholder="*****" />
            </View>
            <TouchableOpacity style={styles.signupBtn}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={{
          alignItems: "center",
          width: Dimensions.get("window").width,
          opacity: fadeAnim,
        }}
      >
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 15,
          }}
        >
          Login
        </Text>
      </Animated.View>

      <FormInput label="Email" placeholder="Enter your email" />
      <FormInput label="Password" placeholder="*****" />

      <View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text
            style={{
              marginBottom: 5,
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Dont have an account? Signup
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitBtn}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    height: 45,
    paddingHorizontal: 50,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "darkgreen",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.43,
    shadowRadius: 8,
    elevation: 15,
  },
  signupBtn: {
    height: 40,
    backgroundColor: "darkgreen",
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 90,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.43,
    shadowRadius: 8,
    elevation: 15,
  },
});
