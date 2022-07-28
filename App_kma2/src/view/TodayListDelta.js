import React, {useEffect,useState} from 'react';
import COLORS from '../components/colors';
import {useDispatch,useSelector} from 'react-redux';
import ItemBox3 from '../components/ItemBox3';
import {listbyuser,byDay,byMonth,DayinMonth} from '../api/api_expense'
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'
import {
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
  Image,
} from 'react-native';
import styless from '../components/styless';


const TodayListDelta= ({navigation,route}) => {
  const[lists,setLists] = useState([]);
  const info = useSelector((state)=>state.personalInfo)
  const {e} = route.params.mm;
  console.log("Faewfăèwèăèăèăèaew");
  console.log(e.dateString);//e.dateString
//   const day = route.params.data;
//   console.log(item)
//   console.log(day)
useEffect(() => {
 
  DayinMonth(info.token,e.dateString).then((data)=>{
    
    setLists(data.exp.map((item,index)=>({
      ...item,
      color: colors[index%colors.length],
      image: images2[item.title],
    })))
  })
  console.log("------------------------")
  //console.log(lists)

}, [])
  return (
    <View style={{flex:1}}>
       <ImageBackground
          source={
            require('../images/hoadongtien.png')}>
      <View style={{height:'20%',justifyContent:'center', alignItems:'center'}}>
      <ImageBackground
           resizeMode="cover"
          source={
            require('../images/hoadaofree.png')}
            style={{width:'100%',height:"100%",justifyContent:'center', alignItems:'center'}}
            >
            
        <View>
          <Text style={styles.name}>{e.dateString}</Text>
          {/* <Image source={item.image} style={styles.image}/> */}
        </View>
      </ImageBackground>
       
      </View>
      <View style={{
        height:'75%',
        width:'90%',
        backgroundColor: COLORS.brown1,
        marginHorizontal:20,
        borderRadius:30,
        shadowColor:'#000',
        shadowOffset:{
          width:0,
          height:6,
        },
        shadowOpacity:0.37,
        shadowRadius:8,

      }}>
        <Text style={{padding:20,fontSize:25, fontWeight:'500'}}>Last Records</Text>
        <View style={{borderBottomWidth:2, width:'90%', opacity:0.5, marginHorizontal:20}}></View>
        { lists.length ?
        <FlatList
            data={lists}
            keyExtractor = {item => item._id}
            contentContainerStyle={{padding:5,paddingBottom:20,}}
            renderItem={({item,index})=>{
               return <ItemBox3 data={item} 
               handleDelete={()=>deleteItem(item._id,index)}
               handleUpdate={()=>updateItem(item._id)}
              />
            }}
            
            />
           : <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20,opacity:0.5}}>no infomation</Text>
              </View>
          }
      </View>
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
  bg: {
    position:'absolute',
    width: styless.widowWidth,
    height: styless.widoHeight,
    backgroundColor:'red',
    transform: [{translateY: styless.widoHeight/2}],
  }
}
)

export default TodayListDelta;
