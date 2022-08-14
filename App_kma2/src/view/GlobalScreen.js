
import React, {useEffect,useState,useRef,useContext} from 'react';
import COLORS from '../components/colors';
import {ChatState} from "../Context/ChatProvider"
import { ChakraProvider, slideFadeConfig } from '@chakra-ui/react'
// import {Button} from '@chakra-ui/react'
import GroupChatModal from '../components/GroupChatModal';
import {useDispatch,useSelector} from 'react-redux';
import ItemBox2 from '../components/ItemBox2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import AddButton2 from '../components/AddButton2';
import SelectDropdown from 'react-native-select-dropdown';
import styless from '../components/styless';
import BottomSheet from 'reanimated-bottom-sheet';
import NetInfo from "@react-native-community/netinfo";
import Note from '../components/Note';
import client from '../api/client'
import {useNotes} from '../components/NoteProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {listbyuser,byDay,byMonth} from '../api/api_expense'
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'
import {searchUser} from "../api/api_user"
import FbSearchBar from '../components/FbSearchBar';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import { findFocusedRoute } from '@react-navigation/native';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ModalPopup =({visible, children}) =>{
  useEffect(()=>{
    toggleModal();
  },[visible]);
  const [showModal, setShowModal] =  React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const toggleModal = () =>{
    if(visible){
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }else{
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }
  return <Modal transparent visible={showModal}>
          <View style={styles.modalBackGround}>
            <Animated.View style={[styles.modalContainer,{transform: [{scale: scaleValue}]}]}>
              {children}
            </Animated.View>
          </View>
         </Modal>
}
const GlobalScreen= ({navigation,route}) => {
  const { user, chats, setChats } = ChatState();

  const tello =(item) =>{
    navigation.navigate('OtherPersonal',{dataitem: {item}})
  }
  const openpopup =(item) =>{
    setVisible(true)
  }
  const info = useSelector((state)=>state.personalInfo)
  const [visible, setVisible] = React.useState(false);
  const [textName, onChangeTextName] = React.useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupChatName, setGroupChatName] = useState();
      
  // useEffect(() => {
  //   // Get your data to populate the FlatList, then set your loading state to false
  //   setLoading(false);
  // }, []);
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("nguoi dung nay da co")
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const searchUser2  = async(id,nameuser)=>{
    const config = {
      headers: {
        Authorization: `jwt ${id}`
      },
     };
     try {
      setLoading(true);
      const res = await client.get(`/laihieu/user/searchuser?search=${nameuser}`
      ,
      config
      );
      //console.log("fehu")
      setLoading(false);
      setSearchResult(res.data.slice(0,4))
      console.log("hahahahaa")

      //return await res.data
    } catch (error) {
      console.log(error.message);
    } 
  }

  const handleCreateGroup = async(id,selectedUsers,groupChatName)=>{
    const config = {
      headers: {
        Authorization: `jwt ${id}`
      },
     };
     try {
    
      const {data} = await client.post(`/laihieu/chat/createGroupChat`
      ,{
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
      );
      console.log(data)
      setChats([data, ...chats]);
      console.log("ok")
      // setLoading(false);
      // setSearchResult(res.data.slice(0,4))
      // console.log("hahahahaa")

      //return await res.data
    } catch (error) {
      console.log(error.message);
    } 
  }

  return (
    <View style={styles.container}>

        <FbSearchBar statement = {info} tello = {tello} openpopup={openpopup}/>
        <ModalPopup visible={visible}>
          <View style={{alignItems:'center'}}>
            <View style={styles.modalheader}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <FontAwesome name='close' size={30} color="#000000" ></FontAwesome>
              </TouchableOpacity>
              <View style={{width:'100%',
                            justifyContent:'center',
                            alignItems:'center'
            }}>
                <Text style={{
                    fontSize:25
                    
                }}>Create Group Chat</Text>
              </View>
                  <TextInput  style={styles.textinput_body}
                              placeholder = "Chat Name" 
                              value = {groupChatName}
                              onChangeText={(text) => {setGroupChatName(text)}}      
                  />
                  <TextInput  style={styles.textinput_body}
                              placeholder = "Add Users eg: Lai, Van, Hieu"  
                              value={textName}
                              onChangeText={(text) => {onChangeTextName(text);
                               // setLoading(true);
                              //   searchUser(info.token,text).then((data)=>{
                                    
                                  if(text==""){setSearchResult(null)}else{
                                    searchUser2(info.token,text)
                                  }                      
                              // });  
                             // searchUser2(info.token,text)
                              
                             // setLoading(false);     
                              }}     
                  />
                  {selectedUsers ?
                   
              <FlatList
                    horizontal
                  data={selectedUsers}
                  contentContainerStyle ={{
                      padding:10,
      
                     // paddingTop: StatusBar.currentHeight || 42
                  }}
                  renderItem={({ item,index }) => (
                      // <Text>{item.name}</Text>
                      <TouchableOpacity style={{flexDirection:'row',marginRight:5, padding:5, borderRadius:12, backgroundColor:'rgba(40, 204, 113,0.8)',
                                      shadowColor: "#000",
                                      shadowOffset: {
                                          width: 0,
                                          height:10
                                      },
                                      shadowOpacity: 0.3,
                                      shadowRadius:20,
                                                             
                      }}
                           onPress={()=>{handleDelete(item)} } 
                      >
                     
                          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:12, fontWeight:'700'}}>{item.name}</Text>
                              <FontAwesome name='close' size={10} color='rgba(254, 121, 104,1);' ></FontAwesome>
                             
                          </View>
                      </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.email}
              />
              : <Text></Text>}
              
                  {isLoading ? <Text>dangload</Text>:(
                  
                 // searchResult?
                //  (searchResult?.slice(0,4).map((user2)=>(
                  <FlatList
                  //horizontal
                  data={searchResult}
                  contentContainerStyle ={{
                      padding:20,
                      paddingTop: StatusBar.currentHeight || 10
                  }}
                  renderItem={({ item,index }) => (
                      // <Text>{item.name}</Text>
                      <TouchableOpacity style={{flexDirection:'row', padding:5, marginBottom:5, borderRadius:12, backgroundColor:'rgba(236, 240, 241,0.8)',
                                      shadowColor: "#000",
                                      shadowOffset: {
                                          width: 0,
                                          height:10
                                      },
                                      shadowOpacity: 0.3,
                                      shadowRadius:20,
                                      width:300                       
                      }}
                           onPress={()=>{handleGroup(item)} } 
                      >
                      { item.avatar!=null ?
                      <Image source={{uri:  item.avatar}}
                             style={{
                              width: 30,
                              height: 30,
                              borderRadius: 70,
                              marginRight: 10,
                             }}
                      />:
                      <Image source={require('.././images/koanhdaidien.png')}
                             style={{
                              width: 30,
                              height: 30,
                              borderRadius: 70,
                              marginRight: 10,
                             }}
                      />
                      }
                          <View>
                              <Text style={{fontSize:12, fontWeight:'700'}}>{item.name}</Text>
                              <Text style={{fontSize:10, opacity:.7}}>{item.email}</Text>
                          </View>
                      </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.email}
              />
              //)))
                  
                  )}
                  <TouchableOpacity style={{
                    shadowColor: "#000",
                    borderStyle:'solid',
                    borderWidth: 1,
                    marginTop:10,
                    borderColor: 'white',
                    height: 40,
                    width:100,
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft: 20,
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    elevation: 3,
                    backgroundColor: COLORS.blue,
                    borderRadius: 6,
                  }}
                  onPress={() => {handleCreateGroup(info.token,selectedUsers,groupChatName)
                    setVisible(false)
                  }}
                  >
                    <Text style={{
                      fontWeight:'bold',
                      color:'white',
                    }}>Create Chat</Text>
                  </TouchableOpacity>
              

            </View>
          </View>
        </ModalPopup>
        <View style={styles.fake_post}/>
        <View style={styles.fake_post}/>
        <View style={styles.fake_post}/>
    </View>
  );
};
const styles = StyleSheet.create({
    fake_post:{
        backgroundColor: '#e4e6eb',
        height:200,
        margin:16,
        borderRadius:16,
    },
    header: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      zIndex: 1,
    },
    emptyHeader: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    addBtn: {
      position: 'absolute',
      right: 15,
      bottom: 50,
      zIndex: 1,
    },
    modalBackGround:{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    modalheader: {
      width: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
      backgroundColor:'white'
    },
    textinput_body:{
      marginTop:10,
      fontSize:16,
      //marginLeft: 10,
      height:40,
      paddingHorizontal: 10,
      width: '100%',
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.5)',
      borderRadius: 8,
    }
  });
  
export default GlobalScreen;
