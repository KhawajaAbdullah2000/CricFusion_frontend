import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    Modal,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormInput from "../FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import Apploader from "../Apploader";
import { useEffect } from "react";

const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "name must be within 3 to 50 characters")
        .max(50, "name must be within 3 to 50 characters")
        .required("Team Name is required"),
  
});

export default function Teams({ route, navigation }) {
    const { profile, token, setLoginPending, loginPending } = useLogin();
    const [modalVisible, setModalVisible] = useState(false);
    const teamInfo = {
        name: "",
        slogan: "",
    };
    const [servererror, setServerError] = useState(""); //for signup of player

    const createTeam = async (values, formikActions) => {
        setLoginPending(true);
        const res = await client.post("/create-team", {
            name: values.name,
            slogan: values.slogan,
            captain_id: profile._id,
        },
        {
            headers:{
          Authorization: `JWT ${token}`
        }
        }
   );
        if (res.data.success) {
            formikActions.setSubmitting(false);
            setLoginPending(false);
            setModalVisible(false);
        }
        if (!res.data.success) {
            setServerError(res.data.message);
            setLoginPending(false);
        }
    };

    useEffect(() => {
        console.log("USe Effect called on Teams component");
    },[]);

    //const {routeuser,routetoken}=route.params;
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, marginTop: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
                    My Teams
                </Text>

                <View
                    style={{
                        flex: 1,
                        alignItems: "flex-end",
                        marginTop: 15,
                        marginEnd: 7,
                    }}
                >
                    <TouchableOpacity
                        style={styles.create_btn}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text>
                            Create new Team
                            <Ionicons name="add" size={20} color="green" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    {loginPending ? <Apploader /> : null}
                    <Formik
                        initialValues={teamInfo}
                        validationSchema={validationSchema}
                        onSubmit={createTeam}
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
                            const { name, slogan } = values;

                            return (
                                <>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View style={styles.modalView}>
                                            <Text
                                                style={{
                                                    fontSize: 25,
                                                    textAlign: "center",
                                                    fontWeight: "bold",

                                                }}
                                            >
                                                Create Team
                                            </Text>

                                            {servererror ? (
                                                <Text style={{ textAlign: "center", color: "red" }}>
                                                    {servererror}
                                                </Text>
                                            ) : null}

                                            <View style={{ marginBottom: 5 }}>
                                                <FormInput
                                                    label="name"
                                                    value={name}
                                                    onBlur={handleBlur("name")}
                                                    error={touched.name && errors.name}
                                                    placeholder="Enter Unique Team Name"
                                                    onChangeText={handleChange("name")}
                                                />
                                                <FormInput
                                                    label="Slogan"
                                                    value={slogan}
                                                    onBlur={handleBlur("slogan")}
                                                    error={touched.slogan && errors.slogan}
                                                    placeholder="Optional"
                                                    onChangeText={handleChange("optional")}
                                                />
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity
                                                    style={{flex:1,backgroundColor:'green',borderRadius:20,padding:10}}
                                                    onPress={isSubmitting ? null : handleSubmit}
                                                >
                                                    <Text style={{textAlign:'center'}}>Create</Text>
                                                </TouchableOpacity>

                                                <Pressable
                                                    style={[styles.button, styles.buttonClose,{flex:1}]}
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                >
                                                    <Text style={styles.textStyle}>Cancel</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
    },
    create_btn: {
        width: 200,
        height: 45,
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        elevation: 4,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
