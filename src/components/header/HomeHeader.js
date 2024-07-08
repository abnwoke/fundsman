import React, {Fragment, useState, useMemo} from "react";
import {Image, Text, TouchableOpacity, Pressable, StyleSheet, StatusBar} from "react-native";
import {View} from "react-native-ui-lib";
import _ from 'lodash';

import {Select, Menu} from "native-base";
import {useSelector} from "react-redux";
import {useNavigation, DrawerActions, useTheme} from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import utils from "../../utils";
import LocationModal from "../modals/LocationModal";


const HomeHeader = ({isBack, title, steps, showLocationLabel= true, hideCart = false, hideNotification = false,}) => {
    const insets = useSafeAreaInsets();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const location = useSelector((state) => state.app?.location);
    const navigation = useNavigation();
    const photo = user.photo ? {uri: user.photo} : utils.images.user;

    const {colors, sizes, fonts} = useTheme();
    // const { pushToken } = usePushNotification();

    const [showLocations, setShowLocations] = useState(false);

    //console.log("")


    const Badge = ({containerStyle, value = null}) => {
        return (
            <Fragment>
                {(value && value !== null && value !== 0) ?
                    <View
                        style={{
                            backgroundColor: colors.danger,
                            height: 20,
                            width: 20,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            right: 0,
                            top: 7,
                            ...containerStyle
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: fonts.poppinsMedium,
                                color: colors.white
                            }}
                        >{value}</Text>
                    </View>
                    : null
                }
            </Fragment>
        )
    }

    const Menu = ({onPress, icon, Icon, showBadge, value, containerStyle}) => {

        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.5}
                style={{
                    height: 38,
                    width: 38,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: "center",
                    ...containerStyle
                }}
            >
                <View>
                    {/*<Image
                        source={icon}
                        style={{
                            width: 26,
                            height: 26,
                            tintColor: 'rgb(115, 142, 180)'
                        }}
                    >
                    </Image>*/}
                    <Icon name={icon} size={24} color={colors.white}/>
                    {(showBadge) &&
                        <Badge
                            value={value}
                            containerStyle={{
                                top: -6,
                                right: -10
                            }}
                        />
                    }
                </View>
            </TouchableOpacity>
        )
    }

    const LocationName = ({name, next}) =>{

        return(
            <Text
                style={{
                    fontSize: 12,
                    fontFamily: fonts.kronaOneRegular
                }}
            >{name}{next&&","} </Text>
        )
    }

    const LocationMenu = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                 setShowLocations(true)
                }}
                activeOpacity={0.5}
                style={{
                    height: 38,
                    //width: 38,
                    //borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: "center",
                    flexDirection: 'row',
                    //...containerStyle
                }}
            >
                <Image
                    source={utils.icons.location_fill}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: 'rgb(114,114,186)'
                    }}
                />
                {(location && showLocationLabel && utils.isIOS) &&
                    <View
                      style={{
                          flexDirection: 'row',
                          marginBottom: -4,
                          marginRight: 4,
                      }}
                    >
                        {location?.locality?.name?
                            <LocationName
                                name={location?.locality?.name}
                                //next={location?.city?.name}
                            />
                            :
                            <LocationName
                                name={location?.city?.name}
                                //next={location?.city?.name}
                            />
                        }
                        {/*<LocationName name={location?.city?.name} next={undefined} />*/}
                    </View>
                }
            </TouchableOpacity>
        )
    }


    const AuthNavigate = (screen) => {
        if (auth.isLoggedIn) {
            navigation.navigate(screen)
        } else {
            navigation.navigate(utils.screens.login)
        }
    }


    const height = 50;
    const main_height = height + insets.top;
    const bg = colors.primary;


    const LocationModalComponent = useMemo(() => {
        if(!showLocations) return null
        return(
            <LocationModal
                showModal={showLocations}
                setShowModal={setShowLocations}
            />
        )
    }, [showLocations]);

    return (
       <Fragment>

           <StatusBar
               barStyle={'light-content'}
               backgroundColor={colors.primary}
               translucent={utils.isIOS? true:false}
               hidden={false}
           />


           <View
               style={{
                   // position: utils.isIOS? 'absolute' : undefined,
                   top: 0,
                   height: utils.isIOS? main_height : height,
                   left: 0,
                   right: 0,
                   zIndex: 999,
                   width: '100%',
                   backgroundColor: bg,
               }}
           >

               {utils.isIOS && <View style={{height: insets.top}}/>}



               <View
                   style={{
                       height: height,
                       justifyContent: 'space-between',
                       flexDirection: 'row',
                       width: '100%',
                       alignItems: 'center',
                       paddingHorizontal: sizes.containerPadding,
                       paddingVertical: sizes.containerPadding - 12,
                       backgroundColor: bg,
                       borderBottomWidth: 1,
                       borderBottomColor: colors.gray = 3
                   }}
               >

                   {isBack &&
                       <View
                           style={{
                               flexDirection: 'row',
                               alignItems: 'center'
                           }}
                       >

                           <TouchableOpacity
                               activeOpacity={0.5}
                               style={{
                                   marginRight: 5
                               }}
                               onPress={() => {
                                   navigation.goBack();
                               }}
                           >
                               <Image
                                   source={utils.icons.back}
                                   style={{
                                       width: 22,
                                       height: 22,
                                       tintColor: colors.text,
                                   }}
                               />
                           </TouchableOpacity>

                           <View>

                               <Text
                                   style={{
                                       fontSize: utils.isIOS? 15 : 14,
                                       lineHeight: 22,
                                       marginBottom: -2,
                                       fontFamily: fonts.kronaOneRegular,
                                       color: colors.text
                                   }}
                               >{title}</Text>

                               {steps &&
                                   <Text
                                       style={{
                                           fontSize: 13,
                                           lineHeight: 15,
                                           marginTop: 4,
                                           marginBottom: -4,
                                           fontFamily: fonts.kronaOneRegular,
                                           color: colors.gray70
                                       }}
                                   >{steps}</Text>
                               }
                           </View>

                       </View>
                   }


                   {!isBack &&
                       <TouchableOpacity
                           style={{
                               flexDirection: 'row',
                               alignItems: 'center',
                           }}
                           onPress={() => {
                               navigation.openDrawer();
                           }}
                       >
                           <Image
                               source={photo}
                               style={{
                                   width: 30,
                                   height: 30,
                                   marginRight: 10
                                   //marginTop: -3
                               }}
                           />
                           <View>
                               <Text
                                 style={{
                                     color: colors.white,
                                     fontSize: 15,
                                     lineHeight: 16,
                                     fontFamily: utils.fonts.PlusJakartaSansSemiBold
                                 }}
                               >Abraham Nwoke</Text>

                               <Text
                                   style={{
                                       color: colors.white,
                                       lineHeight: 14,
                                       fontSize: utils.isIOS? 13:12,
                                       fontFamily: utils.fonts.PlusJakartaSansMedium
                                   }}
                               >Let's exchange your money</Text>
                           </View>
                       </TouchableOpacity>
                   }


                   <View
                       style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}
                   >



                       <Menu
                           onPress={() => {
                               navigation.navigate(utils.screens.verify_identify)
                           }}
                           icon={'bell-outline'}
                           Icon={MaterialCommunityIcons}
                           containerStyle={{
                               marginRight: 0
                           }}
                           showBadge
                           value={user?.notifications}
                       />


                       <Menu
                           onPress={() => {
                               navigation.navigate(utils.screens.verify_identify)
                           }}
                           icon={'bell-outline'}
                           Icon={MaterialCommunityIcons}
                           containerStyle={{
                               marginRight: 0
                           }}
                           showBadge
                           value={user?.notifications}
                       />




                   </View>


               </View>



           </View>

       </Fragment>
    )

}


const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#fff",
        padding: 0,
        height: 38,
        width: 38,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    menuIcon: {
        width: 22,
        height: 22,
        //tintColor: colors.primary
    }
});


export default HomeHeader
