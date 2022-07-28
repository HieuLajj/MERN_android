
import React, {useEffect,useState,useRef,useContext} from 'react';
import COLORS from '../components/colors';
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
import {useNotes} from '../components/NoteProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {listbyuser,byDay,byMonth} from '../api/api_expense'
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import { findFocusedRoute } from '@react-navigation/native';

const NoteScreen= ({navigation}) => {

  const [netInfo,setNetInfo] = useState('');

  useEffect(()=>{
    const data = NetInfo.addEventListener((state)=>{
      setNetInfo(`connectionType: ${state.type} IsConnecte ?: ${state.isConnected}`)
    });
    return()=>{
      data()
    }
  },[])
  const handleGetNetInfo = () => {
    NetInfo.fetch().then((state)=>{
      console.log(state)
      alert(`connectionType: ${state.type} IsConnecte ?: ${state.isConnected}`)
    })
  }

   // const [notes, setNotes] = useState([]);
    const { notes, setNotes} = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);
    //const [notes, setNotes] = useNotes();
    const [reset,setReset] = useState(false)
     
    const sheetRef = useRef(null);
    const fall = new Animated.Value(1);
    const dropdownRef = useRef({});
    var result;
    const [inputs, setInputs] = useState({
      id: Date.now(),
      title: '',
      description: '',
      time:  Date.now(),
    });

    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState,[input]:text}));
    };
    const handleOnSubmit = async()=>{
       //addExpense(info.token,inputs)
       console.log(inputs);
       const updatedNotes = [...notes,inputs];
       setNotes(updatedNotes)
       await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes));
       setReset(!reset)
       sheetRef.current.snapTo(1)             
       setInputs("")
    }
    const handleOnSearchInput = async text => {
      setSearchQuery(text);
      if (!text.trim()) {
        console.log('aaaa');
        setSearchQuery('');
        setResultNotFound(false);
        return await findNotes();
      }
      const filteredNotes = notes.filter(note => {
        if (note.title.toLowerCase().includes(text.toLowerCase())) {
          return note;
        }
      });
  
      if (filteredNotes.length) {
        setNotes([...filteredNotes]);
      } else {
        setResultNotFound(true);
      }
    };
    const handleOnClear = async () => {
      setSearchQuery('');
      setResultNotFound(false);
      await findNotes();
    };
    const findUser = async () =>{
         result = await AsyncStorage.getItem('user');
         console.log(result);
    }
    const findNotes = async()=>{
      const result = await AsyncStorage.getItem('notes');
      console.log(result);
      if(result !== null) setNotes(JSON.parse(result));
    }
    const info = useSelector((state)=>state.personalInfo)
    useEffect(() => {
     //findUser()
     findNotes();
    }, [])
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected2?", state.isConnected);
      return state.isConnected;
    });
    unsubscribe();
    const renderInner = () =>(
      
      <View style={styles2.panel}>
            <View style={{marginTop:10}}>
            <TextInput 
              placeholder='title'
              style={{
                height:40,  
                width:styless.widowWidth-60,
                padding:10,
                borderColor: COLORS.blue,
                borderWidth:1, 
                marginLeft:10,    
              }}
              multiline= {true}
              borderBottomWidth={3}
              borderLeftWidth={3}
              value = {inputs.title}
              editable={true}
              numberOfLines={1}
              onChangeText = {(text) => handleOnChange(text,'title')}
              ></TextInput>
              <TextInput 
              placeholder='note'
              style={{
                height:100,  
                width:styless.widowWidth-60,
                padding:10,
                borderColor: COLORS.blue,
                borderWidth:1, 
                marginLeft:10, 
                marginTop:10,   
              }}
              multiline= {true}
              borderBottomWidth={3}
              borderLeftWidth={3}
              value = {inputs.description}
              editable={true}
              numberOfLines={4}
              onChangeText = {(text) => handleOnChange(text,'description')}
              ></TextInput>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
              <TouchableOpacity onPress={()=>{
                  handleOnSubmit()
                  //addExpense(info.token,inputs)
                  // console.log(inputs);
                  // const updatedNotes = [...notes,inputs];
                  // setNotes(updatedNotes)
                  // await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes));
                  // setReset(!reset)
                  // sheetRef.current.snapTo(1)             
                  // setInputs("")
                }}
                >
                <Text style={{fontSize:20}}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  sheetRef.current.snapTo(1)
                  setInputs("")
                  }}>
               <Text style={{fontSize:20}}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
    const renderHeader = ()=>(
      <View style={styles2.header}>
         <View style={styles2.panelHeader}>
            <View style={styles2.panelHandle}>
              
            </View>
         </View>
     </View>
    );
  const openNote = (note)=>{
    navigation.navigate('NoteList',{note})
  }
  return (
    <View style={styles.container}>
        <BottomSheet
        snapPoints={[225,0]}
        ref={sheetRef}
        renderContent={renderInner}
        renderHeader= {renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false} 
        />
        <SearchBar value={searchQuery} onChangeText={handleOnSearchInput}  onClear={handleOnClear} containerStyle={{margin:10}}/>
        <FlatList data={notes}
                  numColumns = {2}
                  columnWrapperStyle={{justifyContent:'space-between',margin:10}}
                  keyExtractor={item => item.id}
                  renderItem={({item})=> <Note onPress={()=>{
                    openNote(item)
                  }} item={item}/>}
        />
        {/* {unsubscribe?<Text>fddffwe</Text>:<Text>ko co mang</Text>} */}
        {/* <Button title='hoe' onPress={()=>{handleGetNetInfo()}}></Button> */}
        <Text>{netInfo}</Text>
        {!notes.length ?  <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
           <Text style={styles.emptyHeader}>Add Notes</Text>
        </View>: null
        }
       
        <TouchableOpacity 
              style={{
              position: 'absolute',
              right:20,
              bottom:20,
            }}
            onPress={()=>{sheetRef.current.snapTo(0)}}
            >
           <AddButton2 name={'plus'} color={COLORS.blue}/>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
    //  paddingHorizontal: 20,
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
  });
  const styles2 = StyleSheet.create({
    panel: {
      backgroundColor: COLORS.white,
      paddingHorizontal:20,
    },
    header: {
      backgroundColor: COLORS.blue,
      shadowColor: COLORS.black,
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLORS.black,
      marginBottom: 10,
    },
    panelTitle: {
      backgroundColor:'blue',
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      backgroundColor:'red',
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: COLORS.brown3,
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
    dropdown3BtnStyle: {
      width: '40%',
      height: 50,
      backgroundColor: COLORS.white,
      paddingHorizontal: 0,
      borderRadius: 5,
    },
    dropdown3BtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdown3BtnImage: {width: 40, height: 40, resizeMode: 'cover'},
    dropdown3BtnTxt: {
      color: COLORS.brown4,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 12,
    },
    dropdown3DropdownStyle: {backgroundColor: 'slategray'},
    dropdown3RowStyle: {
      backgroundColor:COLORS.white,
      borderBottomColor: COLORS.brown2,
      height: 50,
    },
    dropdown3RowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3RowTxt: {
      color: COLORS.brown4,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 12,
    },
  })
  
export default NoteScreen;
