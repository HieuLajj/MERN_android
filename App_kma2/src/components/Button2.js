import React from 'react';
import styless from '../components/styless'
import colors  from '../components/colors'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';

const Button2 = ({title, onPress=()=>{}}) =>{

    return(
        <TouchableOpacity
            activeOpacity={0.7}
            style= {styles.button_2}
            onPress={onPress}
            >
                <Text style = {styles.text_2}> {title} </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button_2 : {
        shadowColor: "#000",
        borderStyle:'solid',
        borderWidth: 1,
        borderColor: colors.darkBlue,
        height: 45,
        width: styless.widowWidth - 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
        backgroundColor: '#7D5A50',
        borderRadius: 6,
    },
    text_2 : {
        fontWeight:'bold',
        color: 'white',
        fontSize: 16,

    },
})
export default Button2;