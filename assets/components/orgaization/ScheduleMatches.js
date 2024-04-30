import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image,Modal,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import FormInput from "../FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Apploader from "../Apploader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker,{DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const validationSchema = Yup.object({
  venue: Yup.string().min(3, "venue must be within 3 to 50 characters")
  .max(50, "name must be within 3 to 50 characters")
  .required("Venue is required")

    
});


const ScheduleMatches = ({route}) => {


  const {contextLeague_id,loginPending,setLoginPending}=useLogin()


const [teams,setTeams]=useState([]);

const [team1,setTeam1]=useState(null);
const [team2,setTeam2]=useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [servererror, setServerError] = useState(''); 
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const [matchDate,setMatchDate]=useState(null);



const matchInfo = {
  venue: "",
  match_date: null

};


const fetchTeamsRegistered=async(league_id)=>{

 const res=await client.get(`/teams-in-leagues/${league_id}`);
//console.log(res2.data.teams_in_leagues);
   if(res.data.success){ 

     setTeams(res.data.teams_in_leagues)

   }else{
        console.log("no team found")
      setTeams([]);
     setLoginPending(false);

  //  }

  }
}

useEffect(()=>{

  fetchTeamsRegistered(contextLeague_id)

    // fetchTeamsRegistered(route.params.league_id)
  },[]);



 const chooseTeam1=(team_id)=>{
    if(team1!=team_id){
        setTeam1(team_id);
    }else{
      setTeam1(null)
    }
 
    

 }

 const chooseTeam2=(team_id)=>{
    if(team2!=team_id){
        setTeam2(team_id);
    }else{
        setTeam2(null)
    }

 }
 

  const renderItem = ({ item }) => (

   
    <View style={[styles.card]}>
 
    <Image source={require('../../teamlogo.png')} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
                <TouchableOpacity style={styles.btn}
                onPress={()=>chooseTeam1(item.team_id)}
                >
                {
                    team1!=null && team1==item.team_id? 
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold',backgroundColor:'lightgreen'}}>
                    Unselect
                    </Text>
                    :
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>
                    Select Team
                    </Text>

                    
                }

           
             </TouchableOpacity>
</View>



  );


  const renderItem2 = ({ item }) => (

    <View style={styles.card}>
    <Image source={require('../../teamlogo2.png')} style={styles.image} />
    <Text style={[styles.title,{color:'white',fontWeight:'bold',fontSize:15}]}>{item.teams.name}</Text>
   
                <TouchableOpacity style={styles.btn}
                onPress={()=>chooseTeam2(item.teams._id)}
                >
                {
                    team2!=null && team2==item.team_id? 
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold',backgroundColor:'lightgreen'}}>
                    Unselect
                    </Text>
                    :
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>
                    Select Team
                    </Text>

                    
                }
             </TouchableOpacity>



</View>
  );

  const scheduleMatch=async(values, formikActions)=>{
    //console.log(matchDate.toISOString());
    setLoginPending(true);
    const res = await client.post("/schedule-match", {
        league_id: contextLeague_id,
        team1_id:team1,
        team2_id:team2,
        venue:values.venue,
        match_date:matchDate.toISOString()
     }
);
    if (res.data.success) {
      console.log("SUccess");
      setMatchDate(null);
      formikActions.setSubmitting(false);
     setLoginPending(false);
      setModalVisible(false);

       
    }
    if (!res.data.success) {
  
        setServerError(res.data.message);
        setLoginPending(false);
    }

  
  }


  return (
    <View style={styles.container}>

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{fontSize:20,fontWeight:'900',textAlign:'center'}}>Schedule Matches</Text>
      {
        team1!=null && team2!=null && team1!=team2?  
         <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{backgroundColor:'#44D177',borderRadius:10,width:90,textAlign:'center',fontWeight:'bold'}}>Create match</Text>
         </TouchableOpacity>:null
      }
   
      </View>


    <View style={{flex:1,flexDirection:'row'}}>

    {
  
        teams && (
         <FlatList
         data={teams}
        renderItem={renderItem}
         keyExtractor={(item) => item._id}
      
         showsVerticalScrollIndicator={false} 
      
         />
        )
        }  
      


        {
  
            teams && (
             <FlatList
             data={teams}
            renderItem={renderItem2}
             keyExtractor={(item) => item._id}
        
             showsVerticalScrollIndicator={false} 
             
             />
            )
      
            } 
           
            
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
                        initialValues={matchInfo}
                        validationSchema={validationSchema}
                        onSubmit={scheduleMatch}
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
                            const { venue, match_date } = values;

                            const showDatePicker = () => {
                              setDatePickerVisibility(true);
                            };
                          
                            const hideDatePicker = () => {
                              setDatePickerVisibility(false);
                            };
                          
                            const handleDateConfirm = (date,formik) => {
                             my_date=date.toISOString()
                      
                              console.log(my_date);
                              setMatchDate(date)
                              hideDatePicker();
                              //formik.setFieldValue('match_date', date.toISOString());

                             
                            };


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
                                                Schedule Match
                                            </Text>

                                            {servererror ? (
                                                <Text style={{ textAlign: "center", color: "red" }}>
                                                    {servererror}
                                                </Text>
                                            ) : null}

                                            <View style={{ marginBottom: 5 }}>
                                                <FormInput
                                                    label="Venue"
                                                    value={venue}
                                                    onBlur={handleBlur("venue")}
                                                    error={touched.venue && errors.venue}
                                                    placeholder="Enter venue"
                                                    onChangeText={handleChange("venue")}
                                                />
                                       


                                                <View style={{flexDirection:'row'}}>
                                              
                                              <Text style={{fontWeight:'bold',fontSize:17,marginBottom:5,marginLeft:10}}>Match Time</Text>
                                          <TouchableOpacity onPress={showDatePicker}
                                           style={{backgroundColor:'#44D177',width:140,height:30,marginLeft:20,borderRadius:20,
                                           justifyContent:'center'}}>
                                            <Text style={{textAlign:'center'}} >Select</Text>
                                          </TouchableOpacity>
                            

                                  
                                          </View>
                                     
                                          <DateTimePickerModal
                                          isVisible={isDatePickerVisible}
                                          mode="datetime"
                                          onConfirm={handleDateConfirm}
                                          onCancel={hideDatePicker}
                                        />

                                        {
                                          matchDate!=null? <Text style={{fontSize:15,textAlign:'center'}}>
                                          {new Date(matchDate).toLocaleString('en-US',{
                                            year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric'
                                             
                                              
                                           })
                                          }</Text>:null
                                        }


                            
                                
                                       

                    
                                            </View>

                                            
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity
                                                    style={{flex:1,backgroundColor:'#44D177',borderRadius:20,padding:10}}
                                                    onPress={isSubmitting ? null : handleSubmit}
                                                >
                                                    <Text style={{textAlign:'center'}}>Schedule Match</Text>
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

      
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      marginTop:30
     
    },
    card: {
    
        flex:1,
      margin: 10,
      borderRadius: 10
      
  
    },
    image: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
    },
    title: {
     paddingBottom:8,
      textAlign: 'center',
      backgroundColor: 'orange',
  
    },
  
    btn:{
      padding: 10,
      textAlign: 'center',
      backgroundColor: 'yellow',
    elevation:10
    },

    selectedbtn:{
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'lightgreen',
      elevation:10
      },
  
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: 200,
     paddingBottom:100,
      backgroundColor:'red'
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
}
  
  
  });
  

export default ScheduleMatches