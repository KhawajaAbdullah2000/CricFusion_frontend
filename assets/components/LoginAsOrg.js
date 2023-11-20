import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
//import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apploader from "./Apploader";
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "name must be within 3 to 50 characters")
    .max(50, "name must be within 3 to 50 characters")
    .required("First Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  city:Yup.string().trim().required("City is required"),
  password: Yup.string()
    .trim()
    .min(5, "Password is too short")
    .max(30, "Password can be max 30 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password doesnot match"
  ),

});

const logInSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export default function LoginAsOrg({ navigation }) {
  // const [checkapi, setApi] = useState('');
const {setIsLoggedIn,setProfile,setToken,setLoginPending,loginPending,setIsOrgLoggedIn}=useLogin()
  const orgInfo = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city:"",
  };

  const logInOrg = {
    email: "",
    password: "",
  };

  const [showModal, setModal] = useState(false);
  const [servererror, setServerError] = useState(""); //for signup of org
  const [loginservererror, setLoginServerError] = useState(""); //for login of org


  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const signUp = async (values, formikActions) => {
    setLoginPending(true)
    const res = await client.post("/create-org", {
      ...values,
    });
    if (res.data.success) {
      setLoginPending(false)
      formikActions.setSubmitting(false);
    //  formikActions.resetForm();
   
      const signinRes = await client.post("org-signin", {
        email: values.email,
        password: values.password,
      });
      if (signinRes.data.success) {
        console.log("Signed in by: "+signinRes.data.token)
        const SignUpAndLogInToken=signinRes.data.token;
        await AsyncStorage.setItem('org_token',SignUpAndLogInToken)
        console.log("At signup and login line94");
        setIsLoggedIn(false);
        setIsOrgLoggedIn(true);
        setProfile({})
        setProfile(signinRes.data.org)
        setToken(signinRes.data.token)
        setLoginPending(false)
        // navigation.dispatch(
        //   StackActions.replace("playerhome", {
        //     token: signinRes.data.token,
        //     user: signinRes.data.user,
        //   })
        // );
      }
    }
    if (!res.data.success) {
      setServerError(res.data.message);
      setLoginPending(false)
    }
    // formikActions.setSubmitting(false) if no errros in form submission;
    // formikActions.resetForm();
  };

  const signIn = async (values, formikActions) => {
    try {
       setLoginPending(true)
      const res = await client.post("org-signin", {
        ...values,
      });
      if (res.data.success) {
        const logInToken=res.data.token;
        await AsyncStorage.setItem('org_token',logInToken)
        console.log("at orgogin line124");


        formikActions.setSubmitting(false);
        formikActions.resetForm();
        setLoginPending(false)
        setIsLoggedIn(false)
        setIsOrgLoggedIn(true);
        setProfile({})
        setProfile(res.data.org);
        console.log("At signin in settingtoken line132: "+res.data.token);
        setToken(res.data.token)
        //  navigation.dispatch(
        //  StackActions.replace("playerhome", {
        //     routetoken: res.data.token,
        //     routeuser: res.data.user,
        //   })
        //  );
      } else {
        setLoginPending(false)
        setLoginServerError(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>

      <Modal transparent={true} visible={showModal} animationType="slide">
      {
        loginPending? <Apploader/>:null
    }
        <Formik
          initialValues={orgInfo}
          validationSchema={validationSchema}
          onSubmit={signUp}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            isSubmitting,
          }) => {
            const { name, email, password, confirmPassword,city } =
              values;

            return (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ backgroundColor: "lightgreen", padding: 10 }}>
                    <View style={{ position: "absolute", right: 15 }}>
                      <Pressable onPress={() => setModal(false)}>
                  
                          <Ionicons
                            name="close-outline"
                            size={50}
                            color="red"
                          />
                        
                      </Pressable>
                    </View>

                    <Text
                      style={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Signup
                    </Text>

                    {servererror ? (
                      <Text style={{ textAlign: "center", color: "red" }}>
                        {servererror}
                      </Text>
                    ) : null}

                    <View style={{ marginBottom: 5 }}>
                      <FormInput
                        label="Company Name"
                        value={name}
                        onBlur={handleBlur("name")}
                        error={touched.name && errors.name}
                        placeholder="Enter Organization Name"
                        onChangeText={handleChange("name")}
                      />
                    
                      <FormInput
                        autoCapitalize="none"
                        value={email}
                        onBlur={handleBlur("email")}
                        error={touched.email && errors.email}
                        label="Email"
                        placeholder="Enter your email"
                        onChangeText={handleChange("email")}
                      />
                      
                      <FormInput 
                      autoCapitalize="none"
                      value={city}
                      onBlur={handleBlur("city")}
                      error={touched.password && errors.password}
                      label="City"
                      placeholder="Your city"
                      onChangeText={handleChange("city")}
                    />
                    <FormInput
                        autoCapitalize="none"
                        value={password}
                        onBlur={handleBlur("password")}
                        error={touched.password && errors.password}
                        label="Password"
                        placeholder="*****"
                        onChangeText={handleChange("password")}
                      />
                      <FormInput
                        autoCapitalize="none"
                        value={confirmPassword}
                        onBlur={handleBlur("confirmPassword")}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        label="Confirm Password"
                        placeholder="*****"
                        onChangeText={handleChange("confirmPassword")}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.signupBtn}
                      onPress={isSubmitting ? null : handleSubmit}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Signup
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
           
                
              </>
            );
          }}
        </Formik>
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

      {/* //login form */}
      <Formik
        initialValues={logInOrg}
        validationSchema={logInSchema}
        onSubmit={signIn}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isSubmitting,
        }) => {
          const { email, password } = values;

          return (
            <>
              {loginservererror ? (
                <Text style={{ textAlign: "center", color: "red" }}>
                  {loginservererror}
                </Text>
              ) : null}

              <FormInput
                autoCapitalize="none"
                value={email}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
                label="Email"
                placeholder="Enter your email"
                onChangeText={handleChange("email")}
              />
              <FormInput
                autoCapitalize="none"
                value={password}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
                label="Password"
                placeholder="*****"
                onChangeText={handleChange("password")}
              />

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={isSubmitting ? null : handleSubmit}
              >
                <Text>Login</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>

      <View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text
            style={{
              marginTop: 10,
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Dont have an account? Signup
          </Text>
        </TouchableOpacity>
      </View>
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
