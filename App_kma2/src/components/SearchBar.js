import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from './colors';
const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
      <View style={[styles.container, { ...containerStyle }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          placeholder='Search here..'
        />
        {value ? (
             <FontAwesome name="times" onPress={onClear} color={COLORS.black} size={30} style={styles.clearIcon} />
        ) : null}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    searchBar: {
      borderWidth: 2,
      borderColor: COLORS.darkBlue,
      height: 40,
     // margin:10,
      //marginHorizontal:10,
      borderRadius: 5,
      paddingLeft: 15,
      fontSize: 20,
    },
    container: {
      justifyContent: 'center',
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
    },
  });
  
  export default SearchBar;