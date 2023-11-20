import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    Modal,
    FlatList
} from "react-native";
import {useLogin} from '../../context/LoginProvider'
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
      num_of_teams:Yup.number().required('Write number of teams'),
      startsAt: Yup.date().required("Starting Date of League")
      
});

export default function Leagues({ route, navigation }) {
    const { profile, token, setLoginPending, loginPending } = useLogin();
    const [modalVisible, setModalVisible] = useState(false);
    const [leagues,setLeagues]=useState([]);

    const leagueInfo = {
        name: "",
        num_of_teams: "",
        startsAt:""

    };
    const [servererror, setServerError] = useState(""); //for signup of player

    const createLeague = async (values, formikActions) => {
        setLoginPending(true);
        const res = await client.post("/create-league", {
            name: values.name,
            org_id: profile._id,
            num_of_teams:values.num_of_teams,
            startsAt:values.startsAt
         }
        );
        if (res.data.success) {
            formikActions.setSubmitting(false);
            setLoginPending(false);
            setModalVisible(false);
            fetchLeagues();
        }
        if (!res.data.success) {
            setServerError(res.data.message);
            setLoginPending(false);
        }
    };

    const fetchLeagues= async()=>{
      //console.log(leagues);
         const res=await client.get(`/org-leagues/${profile._id}`);
         if(res.data.success){
          setLeagues(res.data.leagues)
          console.log("Leagues set");
          }
        
       // console.log("AT fetch teams "+profile._id);
    }


    useEffect(() => {
        console.log("At use Effect of Leagues");
        fetchLeagues();
    },[]);

    const handleButtonClick = (league_id) => {
      console.log(league_id);
      //   navigation.navigate('ViewTeamDrawer',
      //    {
      //     screen: 'ViewTeam', 
      //     params: { team_id } },
      //  );
      };

    const renderItem = ({ item }) => (
        <View style={{flexDirection:'row',marginTop:70,marginLeft:20}}>
        <Text style={{fontSize:15,backgroundColor:'red'}}>Name: {item.name} </Text>
    <TouchableOpacity style={{backgroundColor:'yellow',borderRadius:10,width:70,justifyContent:'center',alignItems:'center'}}
    onPress={()=>handleButtonClick(item._id)}>
    <Text>View League</Text>
    </TouchableOpacity>
      </View>    
      
      );


    //const {routeuser,routetoken}=route.params;
    return (
        <View style={styles.container}>
        
            <View style={{ flex: 1, marginTop: 30 }}>
           
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
                    My Leagues
                </Text>
                <TouchableOpacity
                    style={styles.create_btn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text>
                        Create new League
                        <Ionicons name="add" size={20} color="green" />
                    </Text>
                </TouchableOpacity>
            
        
         </View>

         <View style={styles.table}>
         {/* Table Head */}
         <View style={styles.table_head}>
             <View style={{ width: '15%'}}>
                 <Text style={styles.table_head_captions}>No.</Text>
             </View>
             <View style={{ width: '45%'}}>
                 <Text style={styles.table_head_captions}>League Name</Text>
             </View>
             <View style={{ width: '45%'}}>
                 <Text style={styles.table_head_captions}>Actions</Text>
             </View>
         </View>

        

    
    </View>

  
      <FlatList
       data={leagues}
     renderItem={renderItem}
       keyExtractor={(item) => item._id}/>

         
                

          

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
                        initialValues={leagueInfo}
                        validationSchema={validationSchema}
                        onSubmit={createLeague}
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
                            const { name, num_of_teams,startsAt } = values;

                            return (
                            
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
                                                Create League
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
                                                    placeholder="Enter Unique League Name"
                                                    onChangeText={handleChange("name")}
                                                />
                                                <FormInput
                                                    label="Number of Teams"
                                                    value={num_of_teams}
                                                    onBlur={handleBlur("num_of_teams")}
                                                    error={touched.num_of_teams && errors.num_of_teams}
                                                    placeholder="Optional"
                                                    onChangeText={handleChange("num_of_teams")}
                                                />

                                                <FormInput
                                                label="Starting Date"
                                                value={startsAt}
                                                onBlur={handleBlur("startsAt")}
                                                error={touched.startsAt && errors.startsAt}
                              
                                                onChangeText={handleChange("startsAt")}
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
        width: 170,
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
    table_head: {
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      borderColor: '#ddd', 
      padding: 7,
      backgroundColor: '#3bcd6b'
  },
  table_head_captions:{
      fontSize: 15,
      color: 'white'
  },
  
  table_body_single_row:{
      backgroundColor: '#fff',
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      borderColor: '#ddd', 
      padding: 7,
  },
  table_data:{  
      fontSize: 11,
  },
  table: {
      margin: 15,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      backgroundColor: '#fff',
  }, 
});
