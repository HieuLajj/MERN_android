import React, {Component,useEffect,useState,useRef,useContext} from 'react';
import COLORS from '../components/colors';
import {useDispatch,useSelector} from 'react-redux';
import  Animated,{EasingNode} from 'react-native-reanimated'
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

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
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
import {searchUser} from "../api/api_user"
const {Value,timing} = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class FbSearchBar extends React.Component{
    
    constructor(props){
        super(props)

        //state
        this.state = {
            isFocused: false,
            keyword: '',
            data:[],
        }

        this._input_box_translate_x = new Value(width)
        this._back_button_opacity = new Value(0)
        this._content_translate_y = new Value(height)
        this._content_opacity = new Value(0)
    }

    _onFocus = () =>{
        this.setState({isFocused: true})
        const input_box_translate_x_config = {
            duration:200,
            toValue:1,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const back_button_opacity_config= {
            duration:200,
            toValue:1,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const content_translate_y_config = {
            duration:200,
            toValue:0,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const content_opacity_config = {
            duration:200,
            toValue:1,
            easing: EasingNode.inOut(EasingNode.ease),
        }

        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start();
        timing(this._content_translate_y,content_translate_y_config).start();
        timing(this._content_opacity, content_opacity_config).start();
        this.refs.input.focus();
    }

    _onBlur = () =>{
        this.setState({isFocused: false})
        const input_box_translate_x_config = {
            duration:200,
            toValue:width,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const back_button_opacity_config= {
            duration:50,
            toValue:0,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const content_translate_y_config = {
            duration:200,
            toValue:height,
            easing: EasingNode.inOut(EasingNode.ease),
        }
        const content_opacity_config = {
            duration:200,
            toValue:0,
            easing: EasingNode.inOut(EasingNode.ease),
        }

        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start();
        timing(this._content_translate_y,content_translate_y_config).start();
        timing(this._content_opacity, content_opacity_config).start();
        this.refs.input.blur();
    }
         render(){
            return(
                <>
                    <SafeAreaView style={styles.header_safe_area}>
                        <View style={styles.header}>
                            <View style={styles.header_inner}>
                                <View>
                                    <Image source={require('../images/image_select/community.png')}
                                           style={{width:152, height:30}} 
                                    />
                                    {/* <Text>{this.props.statement.token}</Text> */}
                                </View>
                                <View style={styles.header_inner2}>
                                    <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={"#ccd0d5"}
                                    onPress = {()=>{
                                        this.props.openpopup();
                                    }}
                                    style={styles.search_icon_box} 
                                    >
                                        <FontAwesome name='pencil-square' size={22} color="#000000" ></FontAwesome>

                                    </TouchableHighlight>
                                    <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={"#ccd0d5"}
                                     onPress = {this._onFocus}
                                    style={styles.setting_icon_box} 
                                    >
                                        <FontAwesome name='search' size={22} color="#000000" ></FontAwesome>

                                    </TouchableHighlight>
                                </View>
                                <Animated.View
                                    style={[styles.input_box,{transform:[{translateX:this._input_box_translate_x}]}]}
                                >
                                    <Animated.View style={{opacity:this._back_button_opacity}}>
                                        <TouchableHighlight
                                            activeOpacity={1}
                                            underlayColor={"#ccd0d5"}
                                            onPress = {this._onBlur}
                                            style={styles.back_icon_box}
                                        >
                                            <FontAwesome name='chevron-left' size={22} color="#000000" ></FontAwesome>
                                        </TouchableHighlight>
                                    </Animated.View>
                                    <TextInput
                                        ref = "input"
                                        placeholder='Search'
                                        clearButtonMode='always'
                                        value={this.state.keyword}
                                        onChangeText={(value)=>{this.setState({keyword: value})
                                       // console.log(this.state.keyword);
                                        searchUser(this.props.statement.token,this.state.keyword).then((data)=>{
                                            this.setState({data: data})
                                            console.log(data)
                                        })
                                    }}
                                        style={styles.input}
                                    />
                                </Animated.View>
                            </View>
                        </View>      
                    </SafeAreaView>
                    <Animated.View style={[
                        styles.content,
                        {
                            opacity: this._content_opacity,
                            transform: [{
                                translateY: this._content_translate_y
                            }]
                        }
                    ]}>
                        <SafeAreaView style={
                            styles.content_saft_area
                        }>
                            <View style={styles.content_inner}>
                                <View style={styles.separator}/>
                         
                            
                                {this.state.keyword === ''
                                ?
                                    <View style={styles.image_placeholder_container}>
                                        <Image source={require('../images/find.png')}
                                            style={{width:152, height:152}}
                                        />
                                        <Text>
                                            Enter a few words{"\n"}
                                            to search on KMA
                                        </Text> 
                                    </View>
                                    
                                :
                                    
                                    <View  style={styles.searchitemui}>
                                        {/* <Text style={{marginTop:100}}>oto</Text> */}
                                        <Image source={require('../images/nen73.png')}
                                            style={StyleSheet.absoluteFillObject}
                                            blurRadius = {80}
                                        />
                                        
                                        <FlatList
                                            data={this.state.data}
                                            contentContainerStyle ={{
                                                padding:20,
                                                paddingTop: StatusBar.currentHeight || 42
                                            }}
                                            renderItem={({ item,index }) => (
                                                // <Text>{item.name}</Text>
                                                <TouchableOpacity style={{flexDirection:'row', padding:20, marginBottom:20, borderRadius:12, backgroundColor:'rgba(236, 240, 241,0.8)',
                                                                shadowColor: "#000",
                                                                shadowOffset: {
                                                                    width: 0,
                                                                    height:10
                                                                },
                                                                shadowOpacity: 0.3,
                                                                shadowRadius:20,
                                                }}
                                                    onPress={()=>{this.props.tello(item), console.log("dang an")} } 
                                                >
                                                { item.avatar!=null ?
                                                <Image source={{uri:  item.avatar}}
                                                       style={{
                                                        width: 70,
                                                        height: 70,
                                                        borderRadius: 70,
                                                        marginRight: 10,
                                                       }}
                                                />:
                                                <Image source={require('../images/koanhdaidien.png')}
                                                       style={{
                                                        width: 70,
                                                        height: 70,
                                                        borderRadius: 70,
                                                        marginRight: 10,
                                                       }}
                                                />
                                                }
                                                    <View>
                                                        <Text style={{fontSize:22, fontWeight:'700'}}>{item.name}</Text>
                                                        <Text style={{fontSize:18, opacity:.7}}>{item.email}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item) => item.email}
                                        />
                                    </View>
                                } 
                            
                            </View>

                        </SafeAreaView>
                    </Animated.View>
                </>
            )
         }
  }
  export default FbSearchBar;
  const styles = StyleSheet.create({
    header_safe_area:{
        zIndex:1000,
    },
    header:{
        height:50,
        paddingHorizontal:16,
    },
    header_inner:{
        flex:1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    header_inner2:{       
        flexDirection:"row",
    },
    search_icon_box:{
        width:40,
        height:40,
        borderRadius:40,
        backgroundColor:'#e4e6eb',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    setting_icon_box:{
        width:40,
        height:40,
        borderRadius:40,
        backgroundColor:'#e4e6eb',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    input_box:{
        height: 50,
        flexDirection: 'row',
        alignItems:'center',
        position: 'absolute',
        top: 0 ,
        left : 0,
        backgroundColor: 'white',
        width: width-32,
    },
    back_icon_box:{
        width:40,
        height:40,
        borderRadius:40,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginRight: 5
    },
    input : {
        flex:1,
        height:40,
        backgroundColor:'#e4e6eb',
        borderRadius:16,
        paddingHorizontal:16,
        fontSize: 15,
    },
    content:{
        width: width,
        height: height,
        position: 'absolute',
        left:0,
        bottom: 0,
        zIndex: 999,
    },
    content_saft_area: {
        flex:1,
        backgroundColor: 'white',
    },
    content_inner:{
        flex:1,
        paddingTop: 50,
    },
    separator: {
        marginTop: 5,
        height:1,
        backgroundColor:'#e6e4eb',
    },
    image_placeholder_container:{
        alignItems:'center',
        
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
       
    },
    image_placeholder:{
        width:150,
        height: 113,
        alignSelf: 'center'
    },
    image_placeholder_text:{
        textAlign: 'center',
        color: 'gray',
        marginTop:5
    },
    searchitemui:{
       //lignItems:'center',
        flex:1,
        paddingTop: 50,
        //flexDirection:'column',
        //justifyContent:'center',
    },
    search_item:{
        flexDirection: 'row',
        height:40,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e6e4eb',
        marginLeft:16
    },
    item_icon:{
        marginLeft:15,
    }

  })