
import React, {useEffect,useState} from 'react';
import COLORS from '../components/colors';
import {useDispatch,useSelector} from 'react-redux';
import ItemBox2 from '../components/ItemBox2';
import {listbyuser,byDay,byMonth} from '../api/api_expense'
import {colors,images2,countriesWithFlags} from '../components/salon2';
//import Wave from 'react-native-waveview'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import styless from '../components/styless';


const Otherpersonal= ({navigation,route}) => {
const {item} = route.params.dataitem;
  return (
    <View style={{flex:1}}>
        <Text>Other personal</Text>
        <Text>{item.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
}
)

export default Otherpersonal;
