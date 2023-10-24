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
import { Formik } from "formik";
import * as Yup from 'yup';

const validationSchema=Yup.object({
  firstName:Yup.string().trim().min(3,'name must be within 3 to 50 characters').max(50,'name must be within 3 to 50 characters')
  .required('First Name is required'),
  lastName:Yup.string().trim().min(3,'name must be within 3 to 50 characters').max(50,'name must be within 3 to 50 characters')
  .required('Last Name is required'),
  email:Yup.string().email('Invalid Email').required('Email is required'),
  password:Yup.string().trim().min(5,'Password is too short').max(30,'Password can be max 30 characters').required('Password is required'),
  confirmPassword:Yup.string().equals([Yup.ref('password'),null],'Password doesnot match')

});


const logInSchema=Yup.object({
  
  email:Yup.string().email('Invalid Email').required('Email is required'),
  password:Yup.string().trim().required('Password is required'),

});


export default function LoginAsPlayer() {

const userInfo={
  'firstName':'',
  'lastName':'',
  'email':'',
  'password':'',
  'confirmPassword':''
};

const logInUser={
  'email':'',
  'password':''
};

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

      <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values,formikActions)=>{
        console.log(values);
        formikActions.setSubmitting(false);
      //  formikActions.resetForm();
      }}>
        {
          ({values,errors,handleChange,handleBlur,touched,handleSubmit,isSubmitting})=>{
            const {firstName,lastName,email,password,confirmPassword}=values;

            return (
            <>
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
              <FormInput  label="First Name" value={firstName} onBlur={handleBlur('firstName')} error={touched.firstName && errors.firstName} placeholder="Enter First Name" onChangeText={handleChange('firstName')} />
              <FormInput label="Last Name" value={lastName} onBlur={handleBlur('lastName')} error={touched.lastName && errors.lastName} placeholder="Enter last Name" onChangeText={handleChange('lastName')} />
              <FormInput autoCapitalize='none' value={email} onBlur={handleBlur('email')} error={touched.email && errors.email}  label="Email" placeholder="Enter your email" onChangeText={handleChange('email')} />
              <FormInput autoCapitalize='none' value={password} onBlur={handleBlur('password')} error={touched.password && errors.password} label="Password" placeholder="*****" onChangeText={handleChange('password')} />
              <FormInput autoCapitalize='none' value={confirmPassword} onBlur={handleBlur('confirmPassword')} error={touched.confirmPassword && errors.confirmPassword}  label="Confirm Password" placeholder="*****" onChangeText={handleChange('confirmPassword')} />
            </View>
            <TouchableOpacity style={styles.signupBtn} onPress={isSubmitting?null:handleSubmit} >
              <Text style={{ color: "white", fontWeight: "bold" }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
            
            
            </>
            )
          }
        }
   
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

      
      <Formik initialValues={logInUser} validationSchema={logInSchema} onSubmit={(values,formikActions)=>{
        console.log(values);
        formikActions.setSubmitting(false);
      //  formikActions.resetForm();
      }}>
        {
          ({values,errors,handleChange,handleBlur,touched,handleSubmit,isSubmitting})=>{
            const {email,password}=values;

            return (

          <>
    
    <FormInput autoCapitalize='none' value={email} onBlur={handleBlur('email')} error={touched.email && errors.email}  label="Email" placeholder="Enter your email" onChangeText={handleChange('email')} />
    <FormInput autoCapitalize='none' value={password} onBlur={handleBlur('password')} error={touched.password && errors.password} label="Password" placeholder="*****" onChangeText={handleChange('password')} />

      <TouchableOpacity style={styles.submitBtn} onPress={isSubmitting?null:handleSubmit}>
        <Text>Login</Text>
      </TouchableOpacity>
      </>
            )
          }
        }
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
    // main view



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
