import React,{useState} from 'react';
import COLORS from './colors'
import styless from './styless'
import {
    StyleSheet,
    Text,   
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Input = ({
    iconName,
    error,
    password,
    text,
    onFocus=()=>{},
    ...props
}) =>{
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return(
        <View>
            <View style= {[styles.body_body,
             {
                borderColor: error
                  ? COLORS.red
                  : isFocused
                  ? COLORS.darkBlue
                  : COLORS.light,
                alignItems: 'center',
              },       
            ]}>
                <Icon name={iconName} size={25} style={{ marginLeft:10, color: COLORS.darkBlue}}/>
                <TextInput style={styles.textinput_body} secureTextEntry={hidePassword}
                           autoCorrect= {false} onFocus={()=>{onFocus(); setIsFocused(true);}}
                           onBlur={()=>{setIsFocused(false);}} {...props}
                           value={text}
                />
                {password && 
                < TouchableOpacity
                  onPress={()=>setHidePassword(!hidePassword)}
                  style={{
                    height: '100%',
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon 
                        style={{fontSize:22,color: COLORS.darkBlue}} 
                        size={25} 
                        name={hidePassword ? "eye-outline": "eye-off-outline"}/>  
                 </TouchableOpacity>
                }
               
            </View>
            {error && <Text style={{marginLeft: 30, color:COLORS.red, fontSize:13, marginTop:7}}>{error}</Text>}
        </View>  
    );
}
const styles = StyleSheet.create({
    body_body : {
      borderWidth:2,
      width: styless.widowWidth - 60,
      marginLeft: 30,
      height: 45,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
    },
    textinput_body : {
      height: '100%',
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
  })
export default Input
