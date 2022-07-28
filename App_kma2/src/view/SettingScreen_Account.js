
import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {updateEmail} from '../redux/actions/updateAction'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons' 
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Input from '../components/Input';
import client from '../api/client'
import Button2 from '../components/Button2';
import AppLoader from '../components/AppLoader';
import {
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import COLORS from '../components/colors';
import ImagePicker from 'react-native-image-crop-picker';
import {updateMember} from "../api/api_user"
import {updateInfomation} from '../redux/actions/updateAction'


const SettingScreen_Account= (props) => {
  const [loginPending, setLoginPending] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    avg: 250000,
  });
  const handleOnChange = (text,input) => {
    setInputs(prevState=>({...prevState,[input]:text}));
  };
  const handleOnChange2 = (text,input) => {
    setInputs(prevState=>({...prevState,[input]:parseInt(text)}));
  };
    const info = useSelector((state)=>state.personalInfo)
    const [image, setImage] = useState('https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg');
    const [progress, setProgress] = useState(0)
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          setImage(image.path);
          sheetRef.current.snapTo(1);
        });
      }
    
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
          setImage(image.path);
          uploadProfileImage;
          sheetRef.current.snapTo(1);
        });
      }
      
     const uploadProfileImage = async({image}) => {
        console.log("hahahaffha");
        console.log(image);
        console.log(info.token);
        const formData = new FormData();
        formData.append('profile', {
          name: new Date() + '_profile',
          uri: image,
          type: 'image/jpg',
        });
        try {
          const res = await client.post('/laihieu/user/upload_profile', formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              authorization: `jwt ${info.token}`
            },
          });
          onUploadProgress: ({loaded,total}) => setProgress(loaded / total);
          if (res.data.success){
            console.log("update anh thanh cong")
          }
    
          
          
        } catch (error) {
          console.log(error.message);
        }
      };
    const renderInner = () =>(
        <View style={styles.panel}>
            <View style={{alignItems:'center'}}> 
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}  onPress={choosePhotoFromLibrary}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => sheetRef.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
    const renderHeader = ()=>(
        <View style={styles.header}>
           <View style={styles.panelHeader}>
              <View style={styles.panelHandle}>
                
              </View>
           </View>
       </View>
    );
    const sheetRef = React.useRef(null);

    const fall = new Animated.Value(1);
    // console.log(token);

  return (
    

    <View style={{flex:1,backgroundColor:COLORS.brown1}}>
    <BottomSheet
        snapPoints={[330,0]}
        ref={sheetRef}
        renderContent={renderInner}
        renderHeader= {renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false} 
    />
       <View style={{margin:20}}>
           <View style={{alignItems:'center'}}>
          
              <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
          

                    <View style={{
                      height:100,
                      width:100,
                      borderRadius:15,
                      justifyContent:'center',
                      alignItems:'center',
                  
                    }}>
                    <ImageBackground
                     source={{
                        uri: info.avatar,
                     }}
                     style={{height:100,width:100}}
                     imageStyle={{borderRadius:15}}
                    >
                        <View style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems:'center',
                        }}>
                          <Icon name="camera" size={35} color="#fff" style={{
                            opacity: 0.7,
                            alignItems:'center',
                            justifyContent: 'center',
                            borderWidth:1,
                            borderColor: "#fff",
                            borderRadius:10,

                          }}/>
                        </View>
                    </ImageBackground>
                  </View>
              </TouchableOpacity >
              <View style={{paddingRight:25}} >
                <Input 
                  iconName="email-outline" 
                  placeholder= {info.email}
                  onChangeText = {(text) => handleOnChange(text,'email')}
                />
                <Input 
                  iconName="account-outline" 
                  placeholder= {info.name}
                  onChangeText = {(text) => handleOnChange(text,'name')}
                />
                <Input 
                  keyboardType="numeric"
                  iconName="phone-outline" 
                  placeholder= {info.phone}
                  onChangeText = {(text) => handleOnChange(text,'phone')}
                />
                <Input 
                  iconName="lock-outline" 
                  placeholder="Enter your password"
                  onChangeText = {(text) => handleOnChange(text,'password')}
                 />
                <Input 
                  iconName="bitcoin" 
                  keyboardType = 'numeric'
                  placeholder= {info.avg + ""}
                  onChangeText = {(text) => handleOnChange2(text,'avg')}
                />
                 <View style={{marginTop:20}}>
                   <Button2 title="Submit" onPress={()=>{    
                    setLoginPending(true)                
                    uploadProfileImage({image})
                    
                    if(updateMember(info.token,info.id,inputs))
                    {
                      setTimeout(function () {
                        setLoginPending(false)
                      }, 2000);                  
                    }
                    dispatch(updateInfomation(info.id,inputs.email,inputs.name,inputs.phone,info.token,inputs.avg,image))
                    }}/>
                 </View>
                 
              </View>
             

               {/* <TouchableOpacity  style={styles.panelButton}
                                  onPress={()=>{}}
               >      
                 <Text>Submit</Text>
               </TouchableOpacity>  */}
           </View>
        </View>
        {loginPending ? <AppLoader/>: null} 
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
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
  });
  
export default  SettingScreen_Account;
