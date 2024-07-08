import React, {Fragment, useCallback, useRef, useState} from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    SafeAreaView
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import utils from "../../utils";

const MainFooter = (props) => {

    const user = useSelector((state) => state.user);

    const {screen} = props
    const navigation = useNavigation();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);
    const isMounted = useRef(true);
    const [menu, setMenu] = useState('home');
    const dispatch = useDispatch();
    const {height, width} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const {colors, sizes, fonts} = useTheme();


    const getAccountType = () => {
        if (user?.account_type === 'Agent') {
            return 'Agent'
        } else if (user?.account_type === 'Landlord') {
            return 'Landlord'
        } else {
            return 'Delegate'
        }
    }


    const AuthNavigate = (screen) => {
        if (isLoggedIn) {
            navigation.navigate(screen)
        } else {
            navigation.navigate(utils.screens.login)
        }
    }


    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {
                if (isMounted.current) {

                    (async () => {
                        //await dispatch(MarketActions.getUserCart())
                    })();

                    return () => {
                        isMounted.current = false;
                    }
                }
            }
        }, [])
    );

    const photo = user.photo ? {uri: user.photo} : utils.images.user


    const Menu = ({icon, title, active, onPress, showUser, showBadge, value, Icon}) => {
        const getValue = parseInt(value) || 0

        const size =  utils.isIOS? 25 : 19;
        const color = "#717171d6"

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPress}
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >

                    <Icon name={icon} size={size} color={active ? colors.primary : color}/>

                    {(showBadge && getValue > 0) &&
                        <Badge
                            value={value}
                            containerStyle={{
                                top: -6,
                                right: -10
                            }}
                        />
                    }

                    <Text
                      style={{
                          color: active ? colors.primary : color,
                          fontSize: utils.isIOS? 14 : 12,
                          fontFamily: fonts.PlusJakartaSansMedium,
                          lineHeight: utils.isIOS? 16 : 15
                      }}
                    >{title}</Text>

                </View>
            </TouchableOpacity>
        )
    }


    const Badge = ({containerStyle, value = null}) => {
        return (
            <Fragment>
                {(value && value !== null && value !== 0) &&
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
                }
            </Fragment>
        )
    }


    const navPaddingVertical = 5
    const navHeight = utils.isIOS? 58 : 50;
    const fullNavHeight = navHeight + insets.bottom;
    const bg = 'white'


    //console.log("")
    //console.log("insets.bottom: ", insets.bottom)
    //console.log("Full NavHeight: ", fullNavHeight)

    return (
        <Fragment

        >

            <View style={{
                height: fullNavHeight,
                //backgroundColor: colors.red
            }}/>

            <View
                style={{
                    //height:  navHeight,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: bg,
                    elevation: 5,
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.22,
                    shadowRadius: 3,
                }}
            >


                <View
                    style={{
                        height: navHeight,
                        flex: 1,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: sizes.containerPadding
                        //backgroundColor: 'red'
                    }}
                >

                    <Menu
                        title="Home"
                        active={utils.screens.home === screen}
                        onPress={() => {
                            navigation.navigate(utils.screens.home)
                        }}
                        Icon={FontAwesome}
                        icon={'home'}
                    />


                    <Menu
                        title="Money"
                        active={utils.screens.money === screen}
                        Icon={FontAwesome6}
                        icon={'money-bill-transfer'}
                        onPress={() => {
                            navigation.navigate(utils.screens.money)
                        }}
                        showBadge
                        //value={user?.appointments}
                    />

                    <Menu
                        title="Crypto"
                        active={utils.screens.crypto === screen}
                        Icon={FontAwesome}
                        icon={'btc'}
                        onPress={() => {
                            navigation.navigate(utils.screens.crypto)
                        }}
                        showBadge
                        //value={user?.appointments}
                    />

                    <Menu
                        title="Gift Cards"
                        active={utils.screens.gift_card_trade === screen}
                        Icon={FontAwesome5}
                        icon={'ticket-alt'}
                        onPress={() => {
                            navigation.navigate(utils.screens.gift_card_trade)
                        }}
                        showBadge
                        //value={user?.appointments}
                    />


                    {/*<Menu
                        title="History"
                        active={utils.screens.history === screen}
                        Icon={FontAwesome}
                        icon={'history'}
                        onPress={() => {
                            navigation.navigate(utils.screens.history)
                        }}
                        //showBadge
                        //value={user?.favourites}
                    />*/}

                    <Menu
                        title="Menu"
                        active={utils.screens.menu === screen}
                        Icon={Entypo}
                        icon={'menu'}
                        onPress={() => {
                            navigation.navigate(utils.screens.menu)
                        }}
                        showBadge
                        //value={user?.appointments}
                    />


                </View>

                <View style={{height: insets.bottom, width: '100%',  }}/>

            </View>

        </Fragment>
    )
}

const styles = StyleSheet.create({})

export default MainFooter
