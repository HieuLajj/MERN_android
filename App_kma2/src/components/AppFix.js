
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native'
import {
  StyleSheet, 
  View,
  Animated,
  Text,
  
  TouchableOpacity,
} from 'react-native';



const AppFix = () =>{
    return(
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
          <LottieView source={require('../animations/complete.json')}
                       autoPlay = {true}
                       loop = {false}
          />
        </View>
    )
}
export default AppFix;

const styles= StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        zIndex:1
    }
})
