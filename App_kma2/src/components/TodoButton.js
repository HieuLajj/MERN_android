
import React,{useRef,useEffect,useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './colors'
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
//import Wave from 'react-native-waveview'
import {

  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const TodoButton = ({focused}) =>{
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
                     duration={4000}
                     animation = {focused?startAnimation:endAnimation}
                     >

                        <FontAwesome name='clipboard' size={24} color= {focused? colors.blue: colors.black}></FontAwesome>
                  </Animatable.View>
                 
                   
            </View>
        )
}
export default TodoButton;
