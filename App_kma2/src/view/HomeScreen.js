import React, {useRef,useEffect,useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import COLORS from '../components/colors'
import {useSelector} from 'react-redux';
import {byCategory,addExpense} from '../api/api_expense'
import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppCongratulation from '../components/AppCongratulation';
import {colors,images2,countriesWithFlags} from '../components/salon2';
import AddButton2 from '../components/AddButton2';
import Animated from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';
import styless from '../components/styless';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { LinearGradient } from 'react-native-svg';
const TODAY = 'TODAY';
const MONTH = 'MONTH';
export default HomeScreen =( {navigation,route} )=>{
  const [congPending, setCongPending] = useState(false);
  const [reset,setReset] = useState(false)
  const [lists,setLists] = useState([]);
  const [lists2,setList2s] = useState([]);
  const [listsDay,setListsDay] = useState([]);
  const [listsMonth,setListsMonth] = useState([]);
  const [day, setday] = useState(TODAY);
  const [money,setMoney] = useState(0);
  const [moneyDay, setMoneyDay] = useState(0);
  const [moneyMonth, setMoneyMonth] = useState(0);
  const [refreshControl,setRefreshControl] = useState(false)
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);
  const dropdownRef = useRef({});
  const info = useSelector((state)=>state.personalInfo)
  var texttien = info.avg-moneyDay;
  const findSpend = async()=>{
    const result = await AsyncStorage.getItem('spends');
    if(result.length != 0){ 
      setList2s(JSON.parse(result))
    };
  }
  const deleteSpend = async() =>{
    const resule4 = await AsyncStorage.setItem('spends',JSON.stringify([]));
    setList2s([])
  }
  // const updateOffline = () =>{
  //   if(lists2.length!==0){
  //     memorySpend();
  //    }
  // }
  // setTimeout(updateOffline,8000);
  useEffect(() => {
    findSpend();
    texttien= info.avg-moneyDay
    byCategory(info.token).then((data)=>{
      
     
    setLists(data.exp.today.map((item,index)=>({
        ...item,
        color: colors[index%colors.length],
        image: images2[item._id],
        key:index,
    })))
    if(data.exp.totalday!=undefined){
      setMoney(data.exp.totalday.total)}
    })},[])
  useEffect(() => {
    
    texttien= info.avg-moneyDay
    byCategory(info.token).then((data)=>{
      setLists(data.exp.today.map((item,index)=>({
        ...item,
        color: colors[index%colors.length],
        image: images2[item._id],
        key:index,
      })))
      if(data.exp.totalday!=undefined){
        setMoney(data.exp.totalday.total)}
      setListsDay(data.exp.today.map((item,index)=>({
        ...item,
        color: colors[index%colors.length],
        image: images2[item._id],
        key:index,
      })))
      if(data.exp.totalday!=undefined){
      setMoneyDay(data.exp.totalday.total)
    }
    
      setListsMonth(data.exp.month.map((item,index)=>({
        ...item,
        color: colors[index%colors.length],
        image: images2[item._id],
        key:index,
      })))
      if(data.exp.totalmonth!=undefined){
      setMoneyMonth(data.exp.totalmonth.total)
    }
      if(day==TODAY && listsDay!=""){
        setLists(listsDay)
        setMoney(moneyDay)
      }
      if(day==MONTH && listsDay!=""){
        setLists(listsMonth)
        setMoney(moneyMonth)
      }
    })
  },[reset])
  const [inputs, setInputs] = useState({
    title: 'Other',
    description: '',
    amount:''
  });
  const handleOnChange = (text,input) => {
    setInputs(prevState=>({...prevState,[input]:text}));
  };
  


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
                setCongPending(true)
                addExpense(info.token,inputs)
                setReset(!reset)
                sheetRef.current.snapTo(1)
                dropdownRef.current.reset() 
                setInputs("")
              }}
              style={styles.button}
              >
                
              <Text style={{
                fontSize:20,
                fontWeight:'bold',
                color:'#ffff'
              }}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                sheetRef.current.snapTo(1)
                setInputs("")
                dropdownRef.current.reset() 
                }}
              style={styles.button2} 
            >
             <Text style={{
                fontSize:20,
                fontWeight:'bold',
                color:'#ffff'
             }}>Cancel</Text>
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
  const disCongApp =()=>{
    setTimeout(function () {
      setCongPending(false);
    }, 2000);
  }
  const memorySpend = () =>{
    Alert.alert('Ban co du lieu offline!','ban co muon cap nhap ngay lap tuc!',[
      {
        text: 'Đồng ý',
        onPress:()=>{
          console.log("tienhanh")
           console.log(lists2)
          lists2.forEach(element => {
            console.log(element);
            addExpense(info.token,element)
            console.log("tien hanh them hang loat")
          });
          deleteSpend();
        }
      },
      {
        text: 'Không',
        onPress:()=>{
          deleteSpend();
        }
      },
      {
        text: 'Để sau',
        onPress:()=>{
          console.log("no thanks")
        }
      }
    ],{
      cancelable: true,
    })
  }
  return (

    <View style={styles.container}>
      <View style={{height:"25%"}}>
        
        <ImageBackground
          source={
            require('../images/tienao.png')}
          style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.text_1}>My Budget</Text>
            <Text
              style={{
              color: texttien <(0.5*info.avg) ? "#FF7700": "#0028FF",
              fontSize: 45,
              fontWeight: '700'
             }
            }
            >${texttien}</Text>
            {lists2.length!==0 ? <TouchableOpacity 
              style={{
                position: 'absolute',
                right:20,
                bottom:'50%',
              }}
              onPress={()=>{memorySpend()}}
            >
               <Image source={ require('../images/chuong1.png')} style={{width: 100, height: 100}} />
            </TouchableOpacity> : null}
        </ImageBackground>
        {/* <TouchableOpacity 
          style={{
            position: 'absolute',
            right:30,
            bottom:30,
          }}
        >
          <Text>Hieulai</Text>
        </TouchableOpacity> */}
    
      </View>

      <View style={styles.body}>
        <View style={styles.body_title}>
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity
              onPress = {()=>{setday(TODAY), setReset(!reset)}}
              style={{alignContent:'center',justifyContent:'center'}}
              disabled = {day === TODAY ? true : false}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  color:day === TODAY ? COLORS.blue: COLORS.black,
                  opacity: day === TODAY ? 1 : 0.5,
                }}
              >TODAY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {{
                marginLeft: 20,
                salignContent:'center',
                justifyContent:'center'
              }}
              onPress = {()=>{setday(MONTH), setReset(!reset)}}
              disabled = {day === MONTH ? true : false}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  color:day === MONTH ? COLORS.blue: COLORS.black,
                  opacity: day === MONTH ? 1 : 0.5,
                }}
              >MONTH</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text 
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color:"red",
              paddingRight:15,
            }}
            >{money}</Text>
          </View>
          
        </View>
        <View style={styles.list}>
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
          {lists.length ? 
           
          <FlatList
            data={lists}
            keyExtractor = {item => item.key}
            contentContainerStyle={{padding:5,paddingBottom:20,}}
            renderItem={({item})=>{
              return <TouchableOpacity onPress={()=>{navigation.navigate('SalonList',{dataitem: {item},data: day});}} style={{flex:1,marginBottom:5}}>
                  <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={[StyleSheet.absoluteFillObject,{backgroundColor:item.color,
                                  borderRadius:10,}]}/>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                      <Text style={styles.name}>{item._id}</Text>
                      <Image source={item.image} style={styles.image}/>
                    </View>
                    <Text style={styles.text}>-{item.total}</Text>
                  </View>
              </TouchableOpacity>
            }}
            refreshControl = {
              <RefreshControl refreshing = {refreshControl} onRefresh={()=>{
                setRefreshControl(true)
                setReset(!reset)
                setRefreshControl(false)
              }} colors={['red']}
              />
            }
            />
            : <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20,opacity:0.5}}>no infomation</Text>
              </View>
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
      </View>
      {congPending ? <AppCongratulation disCongApp={disCongApp} />
      : null}
    </View>
    );  
}
const styles = StyleSheet.create({
  container : {
    flex:1 ,
    backgroundColor: COLORS.brown2,
  },
  text_1 :{
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  text_2 :{
    //color: COLORS.white,
    fontSize: 45,
    fontWeight: '700'
  },
  body : {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  body_title : {
    height:45,
    flexDirection: 'row',
    paddingLeft:20,
    paddingBottom:5,
    justifyContent:'space-between',
  },
  name:{
    fontWeight:'700',
    fontSize:18,
    color:COLORS.black,
  },
  image:{
    width: 60,
    height: 60,
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
  button:{
    marginLeft:10,
    alignItems: 'center',
    borderWidth:0,
    borderRadius: 8,
    width:100,
    backgroundColor:'#2EFE9A',
  },
  button2:{
    marginRight:10,
    alignItems: 'center',
    borderWidth:0,
    borderRadius: 8,
    width:100,
    backgroundColor:'#FF0040',
  }
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
