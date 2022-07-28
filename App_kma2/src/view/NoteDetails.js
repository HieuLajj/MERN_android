import { View
       , Text
       , StyleSheet
       , ScrollView
       ,TouchableOpacity
       ,Alert
       ,ImageBackground
       ,TextInput
       } from 'react-native'
import React,{useState,useRef} from 'react'
import { colors } from '../components/salon2'
import {useNotes} from '../components/NoteProvider'
import COLORS from '../components/colors'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AddButton2 from '../components/AddButton2'
import styless from '../components/styless';
import BottomSheet from 'reanimated-bottom-sheet';
import Note from '../components/Note';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NoteDetails = (props) => {
  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const dropdownRef = useRef({});
  var result;
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
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

  const handleUpdate = async () => {
    sheetRef.current.snapTo(1)             
    setInputs("")
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = inputs.title;
        n.description = inputs.description;
        n.time = Date.now();
        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes } = useNotes();
  const formatDate = (ms) =>{
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
  
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  }
  
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };
  const displayDeleteAlert = () =>{
    Alert.alert('Bạn có chắc chắn không!','Hành động này sẽ xóa ghi chú của bạn ngay lập tức!',[
      {
        text: 'Xóa',
        onPress:deleteNote        //()=>{console.log('delete note')}
      },
      {
        text: 'Không',
        onPress:()=>{
          console.log("no thanks")
        }
      }
    ],{
      cancelable: true,
    })
  }
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
                 handleUpdate()
               // handleOnSubmit()
                //addExpense(info.token,inputs)
                // console.log(inputs);
                // const updatedNotes = [...notes,inputs];
                // setNotes(updatedNotes)
                // await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes));
                // setReset(!reset)
                //  sheetRef.current.snapTo(1)             
                //  setInputs("")
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <ImageBackground
          source={
          require('../images/paper.png')} 
          style={{flex:1,paddingHorizontal: 20,paddingVertical:70}}>
      
      <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.description}</Text>
      <TouchableOpacity 
              style={{
              position: 'absolute',
              right:100,
              bottom:20,
            }}
            onPress={()=>{displayDeleteAlert()}}
            >
           <AddButton2 name={'remove'} color={COLORS.red}/>
      </TouchableOpacity>
      <TouchableOpacity 
              style={{
              position: 'absolute',
              right:20,
              bottom:20,
            }}
            onPress={()=>{
              sheetRef.current.snapTo(0)
              handleOnChange(note.title,'title')
              handleOnChange(note.description,'description')
            }}
            >
           <AddButton2 name={'edit'} color={COLORS.darkBlue}/>
      </TouchableOpacity>
      
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
     // paddingHorizontal: 15,
    },
    title:{
      fontSize:30,
      color: COLORS.blue,
      fontWeight: 'bold',
    },
    desc:{
      fontSize:20,
      opacity:1    
    },
    time:{
        textAlign:'right',
        fontSize:12,
        opacity:0.5    
    }
})

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


export default NoteDetails