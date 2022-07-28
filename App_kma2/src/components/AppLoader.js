
import React, {useEffect, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
//import LottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native'
import {
  StyleSheet, 
  View,
  Animated,
  Text,
  
  TouchableOpacity,
} from 'react-native';
import COLORS from './colors';
import { current } from '@reduxjs/toolkit';


const AppLoader = () =>{
    return(
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
          <LottieView source={require('../animations/9764-loader.json')}
                       autoPlay
                       loop
          />
        </View>
    )
}
export default AppLoader;

const styles= StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        zIndex:1
    }
})
