import React from 'react';
import styless from '../components/styless'
import colors  from '../components/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../components/colors';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';

const Button3 = ({title,iconName, onPress=()=>{}}) =>{

    return(
        <TouchableOpacity
            activeOpacity={0.7}
            style= {styles.button_3}
            onPress={onPress}
            >
              <View style={{ flexDirection: 'row'}}>
                <Icon name={iconName} size={25} style={{ marginLeft:10, color: COLORS.black}}/>
                <Text style = {styles.text_3}> {title} </Text>
              </View>
              <Icon name="arrow-right" size={25} style={{ marginRight:10, color: COLORS.black}}/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button_3 : {
        shadowColor: "#000",
        borderStyle:'solid',
        borderWidth: 1,
        marginTop:10,
        borderColor: colors.darkBlue,
        height: 40,
        width: styless.widowWidth - 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: 20,
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
        backgroundColor: COLORS.white,
        borderRadius: 6,
    },
    text_3 : {
        fontWeight:'bold',
        color: COLORS.black,
        fontSize: 16,
        marginLeft:10,

    },
})
export default Button3;