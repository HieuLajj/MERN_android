import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import styless from './styless';
import COLORS from './colors';
const Note = ({item,onPress}) =>{
    const {title,description} = item;
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={3}>{description}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.brown2,
        width: (styless.widowWidth-40)/2,
        padding:8,
        borderRadius:10,
    },
    title:{
        fontWeight: 'bold',
        fontSize:18,
        color: COLORS.blue
    }
})
export default Note;