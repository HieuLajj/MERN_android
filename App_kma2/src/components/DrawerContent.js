import React from 'react';
import {logoutUser} from "../api/api_user"
import {Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper'
import {View, Text, StyleSheet,ImageBackground,Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
export function DrawerContent(props){
    const info = useSelector((state)=>state.personalInfo)
    const[isDarkTheme,setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
    } 
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                   <View style={styles.userInfoSection}>
                    <ImageBackground
                      source={
                        require('../images/anhdep.jpg')
                      }

                      // image: require('../images/image_select/ic_Clothes.png')
                      style={{flex:1, paddingLeft: 20,}}>
                     
                        <View style={{flexDirection:'row', marginTop:15}}>
                            <Avatar.Image source={{
                                  uri: info.avatar
                            }}
                            size={50}
                            />
                            <View style={{marginLeft:15,flexDirection:'column'}}>
                              <Title style={styles.title}>{info.name}</Title>
                              <Caption style={styles.caption}>{info.email}</Caption> 
                            </View>
                        </View> 
                    </ImageBackground>
                   </View>
                  <Drawer.Section style={styles.drawerSection}>
                   <DrawerItem
                      icon={({color,size}) =>(
                          <Icon
                              name='home-outline'
                              color={color}
                              size={size}
                          />)
                      }
                      label="Home"
                      onPress={()=>{props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                      icon={({color,size}) =>(
                          <Icon
                              name='account-settings-outline'
                              color={color}
                              size={size}
                          />)
                      }
                      label="Settings"
                      onPress={()=>{props.navigation.navigate('SettingTab')}}
                    />       
                   </Drawer.Section>
                   <Drawer.Section title='Preferences'>
                      <TouchableRipple onPress={()=>toggleTheme()}>
                        <View style={styles.preference}>
                          <Text>Dark Theme</Text>
                          <View pointerEvents='none'>
                           <Switch value={isDarkTheme}/> 
                          </View>
                        </View>
                      </TouchableRipple>
                   </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color,size}) =>(
                        <Icon
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />)
                    }
                    label="Signs Out"
                    onPress={()=>{                      
                        Alert.alert('Thông báo!','Đăng xuất khỏi hệ thống!',[
                          {
                            text: 'Đồng ý',
                            onPress: ()=>{logoutUser().then((data)=>{
                                              if(data==true){
                                                console.log("hahahahaha");
                                                props.navigation.navigate('Login')
                                              }      
                             })}
                          },
                          {
                            text: 'Thoát',
                            onPress:()=>{
                              console.log("no thanks")
                            }
                          }
                        ],{
                          cancelable: true,
                        })               
                    }}
                />
            </Drawer.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      flex:1,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
