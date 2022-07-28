
import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Button3 from '../components/Button3';
import COLORS from '../components/colors';

//import Wave from 'react-native-waveview'
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';



const SettingScreen= (props) => {
  const info = useSelector((state)=>state.personalInfo)
  const [text, onChangeText] = React.useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("INFO",info)
  },[])
  return (
      <View style={{backgroundColor:COLORS.brown1,flex:1}}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20,
                        fontWeight:'bold',
                        color:COLORS.black,
                        marginTop:10,
                        }}>
             Settings
          </Text>
        </View>
        <View style={{marginTop:10}}>
          <Button3 title="Account" iconName="account"  onPress={()=>{props.navigation.navigate('SettingAccount')}}/>
          <Button3 title="System" iconName="store-settings"  onPress={()=>{}}/>
        </View>
        {/* <Text>{info.email}</Text>
        <Text>{info.name}</Text>
        <Text>{info.phone}</Text>
        <Text>{info.token}</Text>
        <Text>fawefae</Text>
        <Text>{info.avatar}</Text> */}
        
       {/* <TextInput
         style={{height:40,width:100 ,margin:12, borderWidth:1, padding:10}}
         onChangeText={onChangeText}
         autoCapitalize="none"
         value={text}
       />
       <TouchableOpacity
        onPress={()=>{dispatch(updateEmail(text))}}
        style={{backgroundColor:'red'}}
       >
         <Text>Thay doi</Text>
       </TouchableOpacity> */}
      </View>
  
  );
};


export default  SettingScreen;
