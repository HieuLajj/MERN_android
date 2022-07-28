import React, {useEffect,useState,useRef} from 'react';
import COLORS from '../components/colors';
import {useDispatch,useSelector} from 'react-redux';
import ItemBox3 from '../components/ItemBox3';
import ItemBox4 from '../components/ItemBox4';
import {useNotes} from '../components/NoteProvider';
import AddButton2 from '../components/AddButton2';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import {listbyuser,byDay,byMonth,DayinMonth} from '../api/api_expense'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'
import styless from '../components/styless';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const Offline= ({navigation,route}) => {
  //const { spend, setSpend} = useNotes();
  const [spend, setSpend] = useState([]);
  const findSpend = async()=>{
    const result = await AsyncStorage.getItem('spends');
    console.log(result);
    if(result !== null){ 
     // setSpend(JSON.parse(result))
      setSpend(JSON.parse(result).map((item,index)=>({
        ...item,
        color: colors[index%colors.length],
        image: images2[item.title],
      })))
    
    };
  }
  useEffect(() => {
    //findUser()
    findSpend();
  }, [])
 // const [lists,setLists] = useState([]);

  // useEffect(() => {
  //  // listbyuser(info.token,page).then((data)=>{
  //   setLists(spend.map((item,index)=>({
  //     ...item,
  //     color: colors[index%colors.length],
  //     image: images2[item.title],
  //   })))
  //   // }
  //   // )
  
  // }, [reset])
  const [reset,setReset] = useState(false);
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);
  const dropdownRef = useRef({});
  const [inputs, setInputs] = useState({
    title: 'Other',
    description: '',
    amount:''
  });
  const handleOnChange = (text,input) => {
    setInputs(prevState=>({...prevState,[input]:text}));
  };
  const handleOnSubmit = async()=>{

    console.log(inputs);
    const updatedNotes = [...spend,inputs];
    setSpend(updatedNotes.map((item,index)=>({
      ...item,
      color: colors[index%colors.length],
      image: images2[item.title],
    })))
   // setSpend(updatedNotes)
    await AsyncStorage.setItem('spends',JSON.stringify(updatedNotes));
    setReset(!reset)
    sheetRef.current.snapTo(1)             
    setInputs("")
  }

  


  const renderInner = () =>(
    <View style={styles2.panel}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TextInput 
            keyboardType='numeric'
            placeholder='amount'
            style={{
              fontSize:20,
              marginLeft: 10,
              height:45,
              paddingHorizontal: 10,
              width: '40%',
              borderBottomWidth:2,
              borderBottomColor:COLORS.blue,
            }}
            value = {inputs.amount}
            multiline={true}
            numberOfLines={1}
            onChangeText = {(text) => handleOnChange(text,'amount')}
          ></TextInput>
          <Text>       
            <SelectDropdown         
              data={countriesWithFlags}
              ref={dropdownRef} 
              onSelect={(selectedItem, index) => {
                //console.log(selectedItem, index);
                console.log(selectedItem.title);
                handleOnChange(selectedItem.title,'title')
            }}
              buttonStyle={styles2.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles2.dropdown3BtnChildStyle}>
                    {selectedItem ? (
                      <Image source={selectedItem.image} style={styles2.dropdown3BtnImage} />
                    ) : (
                      <Ionicons name="cart-outline" color={COLORS.brown4} size={32} />
                    )}
                    <Text style={styles2.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select'}</Text>
                    <FontAwesome name="chevron-down" color={COLORS.brown4} size={18} />
                  </View>
                );
              }}
              dropdownStyle={styles2.dropdown3DropdownStyle}
              rowStyle={styles2.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles2.dropdown3RowChildStyle}>
                    <Image source={item.image} style={styles2.dropdownRowImage} />
                    <Text style={styles2.dropdown3RowTxt}>{item.title}</Text>
                  </View>
                );
              }}
            />

          </Text>
          </View>
          <View style={{marginTop:10}}>
            <TextInput 
            placeholder='note'
            style={{
              height:60,  
              width:styless.widowWidth-60,
              padding:10,
              borderColor: COLORS.blue,
              borderWidth:1, 
              marginLeft:10,    
            }}
            multiline= {true}
            borderBottomWidth={3}
            borderLeftWidth={3}
            value = {inputs.description}
            editable={true}
            numberOfLines={2}
            onChangeText = {(text) => handleOnChange(text,'description')}
            ></TextInput>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <TouchableOpacity onPress={()=>{
                handleOnSubmit()
              }}
              >
              <Text style={{fontSize:20}}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                sheetRef.current.snapTo(1)
                setInputs("")
                dropdownRef.current.reset() 
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
    <View style={{flex:1}}>
      <ImageBackground
          source={
            require('../images/tree.png')}
            resizeMode="repeat"
          style={{ 
          flex:1 
          }}
          >
      <View style={{height:'20%',justifyContent:'center', alignItems:'center'}}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image source={require('../images/offline.png')} style={styles.image}/>
      </View>
       
      </View>
      <View style={{
        height:'70%',
        width:'90%',
        backgroundColor: COLORS.brown1,
        marginHorizontal:25,
        borderRadius:30,
        shadowColor:'#000',
        shadowOffset:{
          width:0,
          height:6,
        },
        shadowOpacity:0.37,
        shadowRadius:8,

      }}>
        <Text style={{padding:20,fontSize:25, fontWeight:'500'}}>Spending</Text>
        <View style={{borderBottomWidth:2, width:'90%', opacity:0.5, marginHorizontal:20}}></View>
        { spend.length ?
        <FlatList
            data={spend}
            keyExtractor = {item => item.description}
            contentContainerStyle={{padding:5,paddingBottom:20,}}
            renderItem={({item,index})=>{
               return <ItemBox4 data={item} 
              />
            }}        
            />
           : <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20,opacity:0.5}}>no infomation</Text>
              </View>
          }
      </View>
      <TouchableOpacity 
              style={{
              position: 'absolute',
              right:styless.widowWidth/2-30,
              bottom:50,
            }}
            onPress={()=>{sheetRef.current.snapTo(0)}}
            >
            <AddButton2 name={'plus'} color={COLORS.blue}/>
      </TouchableOpacity>
      <BottomSheet
        snapPoints={[195,0]}
        ref={sheetRef}
        renderContent={renderInner}
        renderHeader= {renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false} 
        />
    </ImageBackground>
   
    </View>
  );
};
const styles = StyleSheet.create({
  
  body_title : {
    height:45,
    flexDirection: 'row',
    //paddingTop: 0,
    //padding: 20,
    paddingLeft:20,
    paddingBottom:5,
    justifyContent:'space-between',
  },
  name:{
    fontWeight:'700',
    fontSize:30,
    color:'black'
  },
  image:{
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    color: 'red',
    fontWeight:'bold',
    fontSize:20
  },
  list:{
    flex:1,
    flexGrow:1,
  },
  bg: {
    position:'absolute',
    width: styless.widowWidth,
    height: styless.widoHeight,
    backgroundColor:'red',
    transform: [{translateY: styless.widoHeight/2}],
  }
}
)
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


export default Offline;
