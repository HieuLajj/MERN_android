
import React, {useEffect,useState,useRef,useContext} from 'react';
import COLORS from '../components/colors';
import {useDispatch,useSelector} from 'react-redux';
import Animated, {Easing} from 'react-native-reanimated'
import ItemBox2 from '../components/ItemBox2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import AddButton2 from '../components/AddButton2';
import SelectDropdown from 'react-native-select-dropdown';
import styless from '../components/styless';
import BottomSheet from 'reanimated-bottom-sheet';
import NetInfo from "@react-native-community/netinfo";
import Note from '../components/Note';
import {useNotes} from '../components/NoteProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {listbyuser,byDay,byMonth} from '../api/api_expense'
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'
import FbSearchBar from '../components/FbSearchBar';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { findFocusedRoute } from '@react-navigation/native';

const {Value,timing} = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const GlobalScreen= () => {
  const info = useSelector((state)=>state.personalInfo)
  return (
    <View style={styles.container}>

        <FbSearchBar statement = {info}/>
        
        <View style={styles.fake_post}/>
        <View style={styles.fake_post}/>
        <View style={styles.fake_post}/>
    </View>
  );
};
const styles = StyleSheet.create({
    fake_post:{
        backgroundColor: '#e4e6eb',
        height:200,
        margin:16,
        borderRadius:16,
    },
    header: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
    //  paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
    },
    emptyHeader: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    addBtn: {
      position: 'absolute',
      right: 15,
      bottom: 50,
      zIndex: 1,
    },
  });
  
  
export default GlobalScreen;
