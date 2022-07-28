import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import COLORS from './colors';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { proposalPlugins } from '@babel/preset-env/data/shipped-proposals';
import { Colors } from 'react-native-paper';
//import styles from 'react-date-range/dist/styles';

const ItemBox = (props)=>{

    const rightSwipe =(progress,dragX)=>{

        const scale = dragX.interpolate({
            inputRange:[0,100],
            outputRange: [0,1],
            //extrapolate: 'clamp',
        });

        return(
            <TouchableOpacity onPress={props.handleDelete} style={styles.deleteBox}>
                <Animated.View style={{transform:[{scale:scale}]}}>
                <FontAwesome name='minus-circle' size={40} color={COLORS.black}></FontAwesome>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const leftSwipe =(progress,dragX)=>{

        const scale = dragX.interpolate({
            inputRange:[0,100],
            outputRange: [0,1],
            //extrapolate: 'clamp',
        });

        return(
            <TouchableOpacity onPress={props.handleUpdate} style={styles.deleteBox}>
                <Animated.View style={{transform:[{scale:scale}]}}>
                <FontAwesome name='exchange' size={40} color={COLORS.black}></FontAwesome>
                </Animated.View>
                
            </TouchableOpacity>
        )
    }
    return( <Swipeable
        renderRightActions={rightSwipe}
        renderLeftActions={leftSwipe}
    >
              <View style={{flex:1,marginBottom:5}}>
                 <View style={{padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View style={[StyleSheet.absoluteFillObject,{backgroundColor:'white',
                    borderRadius:10,}]}/>
                  <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                    <View style={{width:50,justifyContent:'center', alignItems:'center'}}>
                      <Text>{props.data.title}</Text>
                      <Image source={props.data.image} style={{height:30,width:30, resizeMode: 'contain',}}/>
                    </View>
                    <View style={{marginLeft:10}}>
                      <Text style={{fontSize:18,fontWeight:'bold'}}>{props.data.description}</Text>
                      <Text>{props.data.created}</Text>
                    </View>
                  </View>
                  <Text>-{props.data.amount}</Text>
              </View>
              </View>
            </Swipeable> 
    )
  }
  const styles = StyleSheet.create({
    deleteBox:{
      width:"20%",
      backgroundColor:COLORS.brown2,
      justifyContent:'center',
      alignItems:'center',
    },
});

export default ItemBox;
