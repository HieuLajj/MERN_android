
import React,{useRef,useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './colors'
//import Wave from 'react-native-waveview'
import * as Animatable from 'react-native-animatable';
import {

  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const GlobalButton = ({focused}) =>{
  const startAnimation = {

    0: {
        scale:.5,
    },
  
    1: {
        scale:1.5,
    },
  };
  const endAnimation = {
    from: {
        scale:1.5,
       
    },
    to: {
        scale:1,
       
    },
  };
        return(
            <View style={{position:'absolute', alignItems:'center'}}>
                  
                  <Animatable.View
                     //ref={viewRef}
                     animation = {focused?startAnimation:endAnimation}
                     duration={4000}>
                        <FontAwesome name='group' size={24} color= {focused? colors.blue: colors.black}></FontAwesome>
                  </Animatable.View>
                   
            </View>
        )
}
export default GlobalButton;
