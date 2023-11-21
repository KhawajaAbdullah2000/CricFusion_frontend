import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    Modal,
    FlatList,
    Button
} from "react-native";
import {useLogin} from '../../context/LoginProvider'
import Ionicons from "@expo/vector-icons/Ionicons";
import FormInput from "../FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import Apploader from "../Apploader";
import { useEffect } from "react";
import DateTimePicker,{DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "name must be within 3 to 50 characters")
        .max(50, "name must be within 3 to 50 characters")
        .required("Team Name is required"),
      num_of_teams:Yup.number().required('Write number of teams')

      
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
    const [date, setDate] = useState(new Date(1598051730000))
    const [servererror, setServerError] = useState(''); //for signup of player

    const createLeague = async (values, formikActions) => {

         setLoginPending(true);

          const res = await client.post("/create-league", {
              name: values.name,
              org_id: profile._id,
             num_of_teams:values.num_of_teams,
               startsAt:date
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

      const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          value: date,
          onChange,
          mode: currentMode,
          is24Hour: true,
        });
      };

      const showDatepicker = () => {
        showMode('date');
      };
    

    const fetchLeagues= async()=>{
      setLoginPending(true);
         const res=await client.get(`/org-leagues/${profile._id}`);
         if(res.data.success){
          setLeagues(res.data.leagues)
          setLoginPending(false);

          }else{
            setLoginPending(false);
          }
        
       // console.log("AT fetch teams "+profile._id);
    }


    useEffect(() => {
        fetchLeagues();
    },[]);

    const viewLeague = (league_id) => {
      console.log(league_id);
         navigation.push('Org_League',
         {
           league_id:league_id
        }
        );
      };

    const renderItem = ({ item }) => (
        // const formattedDate = new Date(item.startsAt).toLocaleDateString('en-US', {
        //     weekday: 'long',
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //   });

        <View style={styles.mainmapview}>
        <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>Name: {item.name} </Text>
        <Text style={{fontSize:10,color:'white',fontWeight:'bold',marginLeft:10}}>From: {new Date(item.startsAt).toLocaleDateString('en-US',{
                 year: 'numeric',
                month: 'long',
            day: 'numeric',
               })} </Text>

    <TouchableOpacity style={{backgroundColor:'yellow',borderRadius:15,width:70,justifyContent:'center',
    alignItems:'center',marginEnd:5,elevation:6}}
    onPress={()=>viewLeague(item._id)}>
    <Text style={{fontSize:15}}>View League</Text>
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


    {
        loginPending? <Apploader/>:null
    }
  
      <FlatList
       data={leagues}
     renderItem={renderItem}
       keyExtractor={(item) => item._id}/>

         


            </View>

      <Text>selected: {date.toLocaleString()}</Text>
        

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

                                          
                                                <View style={{marginHorizontal:60}}>
                                                <Button onPress={showDatepicker} title="League Starting Date" 
                                                onBlur={startsAt}
                                                error={touched.startsAt && errors.startsAt}
                                                onChangeText={handleChange("startsAt")}
                                                />
                                                </View>
                   

                                    
                                           

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
  mainmapview:{
    flexDirection:'row',marginTop:20,paddingVertical:25,backgroundColor:'purple',alignItems:'center',justifyContent:'space-between'
  }
});
