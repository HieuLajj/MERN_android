import React, {useState,useRef,useContext,useEffect} from 'react';
import styless from '../components/styless';
import Input from '../components/Input'
import Button2 from '../components/Button2'
import client from '../api/client';
import AppLoader from '../components/AppLoader'
import {updateInfomation,updateEmail, updatePhone,updateName,updateToken,updateAvatar} from '../redux/actions/updateAction'
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser,loginUser2} from "../api/api_user"
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Keyboard, 
    Animated,
    Alert
} from 'react-native';
import Wave from 'react-native-waveview';
import infoLog from 'react-native/Libraries/Utilities/infoLog';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import { multiply } from 'react-native-reanimated';
const SIGN_IN = 'SIGN_IN';
const GET_STARTED = 'GET_STARTED';
export default LoginScreen =( {navigation} )=>{
    const [loginPending, setLoginPending] = useState(false);
    const dispatch = useDispatch();
    const [page, setPage] = useState(SIGN_IN);
    const [keyboardShow, setKeyboardShow] = React.useState();
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setKeyboardShow(true);
          }
          );
          const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setKeyboardShow(false);
          }
          );   
          return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
          };
    },[]);

    
    const topMotion1 = useRef(new Animated.Value(0)).current;
    const topMotion2 = useRef(new Animated.Value(0)).current;
    const Animation_wave = () => {
        Animated.parallel([
            Animated.timing(topMotion1,{
                toValue: -styless.widoHeight * 0.25,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(topMotion2,{
                toValue: styless.widoHeight * 0.25,
                duration: 1000,
                useNativeDriver: false,
            }),
        ]).start();
    }
    
    const Animation_wave_reset = () => {
        Animated.parallel([
            Animated.timing(topMotion1,{
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(topMotion2,{
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }),
        ]).start();
        setPage(SIGN_IN);
    }

    const fetchUser = async() => {
      const token = await AsyncStorage.getItem('token');
      if(token !== null){
        console.log(token);
        loginUser2(token).then((data)=>{
               data.user.avatar?
               dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,data.user.avatar))
               :
               dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,'https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg'))
               if(data.success){
                    navigation.navigate('MyDraw',{token:data.token});
                }          
        })
      }
    }
    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <View style={{ width:'100%' , height:'100%',backgroundColor: "#FCDEC0" }}>
            <View style={styles.Red}>
            <Animated.View style={{marginTop:topMotion1,width: '100%', height: '100%'}}>
                {keyboardShow ? null : <RedComponet page={page} setPage={setPage} Animation_wave={Animation_wave} 
                                                    navigation={navigation} Animation_wave_reset={Animation_wave_reset}/>}
            </Animated.View>
            </View>
            <View style={styles.Green}>
                {page ===SIGN_IN ? <GreenComponet navigation={navigation} setLoginPending={setLoginPending}/> : null}
            </View>

            <View style={styles.Blue}>
                <Animated.View style={{marginTop:topMotion2,width: '100%', height: '100%'}}>
                    {keyboardShow ? null : <BlueComponet/>} 
                </Animated.View>
            </View>
            {loginPending ? <AppLoader/>: null} 
        </View>
    );
}

const RedComponet = ({page,setPage,Animation_wave,navigation,Animation_wave_reset}) => {
//{page,setPage,Animation_wave,navigation}
    const combie = () => {
        setPage(GET_STARTED);
        Animation_wave();
        setTimeout(()=>{ navigation.navigate('Register')},1000);
        setTimeout(Animation_wave_reset,1500);
    }
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>KMA</Text>
                </View>
                <View style={styles.top_button}>
                    <TouchableOpacity 
                        style = {styles._button}
                        onPress = {()=>{setPage(SIGN_IN)}}
                        disabled = {page===SIGN_IN ? true : false}
                        >
                        
                            <Text style={styles._button_text}>Sign In</Text>
                            {
                                page === SIGN_IN ? <View style={styles._button_bottom}></View> : null
                            }
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles._button}
                        onPress={combie}
                        disabled = {page===GET_STARTED ? true : false}>
                        
                            <Text style={styles._button_text}>Get Started</Text>
                            {
                                page === GET_STARTED ? <View style={styles._button_bottom}></View> :null
                            }
                    </TouchableOpacity>
                </View>
            </View>
        </View>    
    );
}

const GreenComponet = ({navigation,setLoginPending}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const handleOnChange = (text,input) => {
        setInputs(prevState=>({...prevState,[input]:text}));
    };
    const handleError = (error,input)=>{
        setErrors((prevState)=>({...prevState,[input]:error}));
    };

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
    
          handleError('Please input email', 'email');
          isValid = false;
        }else{
          let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
          if(!regex.test(inputs.email)){
            handleError('Please input a valid email', 'email');
            isValid = false;
          }
        }
        if (!inputs.password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (inputs.password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        }
        if (isValid) {
          login(inputs);
        }
    };
    
    const login = async(inputs) => {
        setLoginPending(true)
        console.log(inputs)
        loginUser(inputs).then((data)=>{
            //console.log("adadadadadadad");
            //console.log(data.user.id);
            // AsyncStorage.setItem('user',JSON.stringify({id:data.user.id}));
            //    data.user.avatar?
            //    dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,data.user.avatar))
            //    :
            //    dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,'https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg'))
               
            setLoginPending(false)
            if(data.success){
                Alert.alert('Thông báo!','Đăng nhập thành công!',[
                    {
                      text: 'Tiếp tục',
                      onPress: ()=>{
                        setInputs("")
                        data.user.avatar?
                           dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,data.user.avatar))
                           :
                           dispatch(updateInfomation(data.user.id,data.user.email,data.user.name,data.user.phone,data.token,data.user.avg,'https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg'))
                        navigation.navigate('MyDraw',{token:data.token});}
                    }
                  ],{
                    cancelable: true,
                  })}
                else{
                    Alert.alert('Thông báo!',"Đăng nhập thất bại!",[
                        {
                          text: 'Tiếp tục',
                          onPress: ()=>{}
                        }
                      ],{
                        cancelable: true,
                      })  
                }          
        })
       
    }

    return(
        <View style={styles.body}>
            <Text style={styles.body_text}>Login in your account.</Text>
            <Input 
                iconName="email-outline" 
                placeholder="Email"
                error={errors.email}
                text = {inputs.email}
                onFocus={()=>{
                handleError(null,'email');
                }}
                onChangeText = {(text) => handleOnChange(text,'email')}
            />

            <Input 
                iconName="lock-outline" 
                placeholder="Password"
                error={errors.password}
                text = {inputs.password}
                onFocus={()=>{
                handleError(null,'password');
                }}
                password
                onChangeText = {(text) => handleOnChange(text,'password')}
            />
            <View style= {styles.body_body2}>
                <TouchableOpacity style= {styles.forget_psw2}>
                    <Text style= {styles.forget_psw}>Forget password ?</Text>
                </TouchableOpacity>
            </View>
            <Button2 title="Login" onPress={validate}/>
        </View>
    );
}

const BlueComponet = () => {
    return (
        <View> 
             <Wave
                style={styles.wave}
                H={80}
                waveParams={[
                    {A: 10, T: 702, fill: '#7D5A50'},
                    {A: 15, T: 546, fill: '#E5B299'},
                    {A: 20, T: 390, fill: '#B4846C'},
                ]}
                animated={true}
             />
        </View>
    );
}
const styles = StyleSheet.create({
    Red : {
        width:'100%',
        height:'25%' 
    },
    Green : {
        width:'100%',
        height:'50%',
    },
    Blue : {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    top : {
        width: '100%',
        height: '100%',
    },
    header:{
        width: '100%',
        flex:1,
        backgroundColor: "#7D5A50",
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_text : {
        fontSize: 35,
        fontWeight: '600',
        color: 'white',
    },
    top_button : {
        position:'relative',
        height: 48,
        flexDirection: 'row',
    },
    _button : {
        width: '50%',
        height : '100%',
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor: 'white',
    },
    _button_text : {
        fontSize: 20,
        color: "#7D5A50",
    },
    _button_bottom : {
        height: 3,
        width : '100%',
        backgroundColor: "#7D5A50",
        position: 'absolute',
        bottom:0,
    },
    body : {
        height: '100%',
        width : '100%',
       // borderWidth: 1,
        justifyContent: 'center',

    },
    body_text : {
        fontSize: 24,
        marginLeft : 30,
        marginRight: 30,
    },
    body_body : {
        width: styless.widowWidth - 60,
        marginLeft: 30,
        height: 45,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,

    },
    body_body2 : {
        width: styless.widowWidth - 60,
        marginLeft: 30,
        height:45,
       // marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    forget_psw2 : {
        position: 'absolute',
        right: 0,
    },
    forget_psw : {
        color: '#707070',

    },
    wave: {
        width: styless.widowWidth,
        height: styless.widoHeight * 0.25,
        overflow: 'hidden',
        backgroundColor: '#FCDEC0',
    },
});