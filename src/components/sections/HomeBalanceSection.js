import {
    View, Text, TouchableOpacity
} from 'react-native';

import {
    Card
} from "react-native-ui-lib";

import {useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import React, {useState} from "react";
import BalancesSection from "./BalancesSection";

const HomeBalanceSection = ({}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation();
    const [showBalances, setShowBalances] = useState(true)

    const Menu = ({onPress, title, Icon, iconName}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    alignItems: 'center',
                    padding: 10
                }}
                onPress={onPress}
            >

                <Icon name={iconName} size={utils.isIOS ? 28 : 26} color={colors.primary}/>

                <Text
                    style={{
                        color: colors.black,
                        fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                        fontSize: utils.isIOS ? 14 : 12,
                        //lineHeight: 14.5,
                        marginTop: utils.isAndroid ? -2 : 2
                    }}
                >{title}</Text>

            </TouchableOpacity>
        )
    }


    const Balance = ({onPress}) => {
        return(
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                }}
            >

                <View
                    style={{}}
                >
                    <Text
                        style={{
                            color: colors.gray9,
                            fontFamily: utils.fonts.PlusJakartaSansMedium,
                            fontSize: 14,
                            marginBottom: 3
                            //lineHeight: 15
                        }}
                    >Your Balance</Text>

                    <Text
                        style={{
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansBold,
                            fontSize: utils.isIOS ? 17 : 16,
                            lineHeight: utils.isIOS ? 19 : 17
                        }}
                    >GHS446,500,000.99</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            marginRight: 4,
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansBold,
                            fontSize: 13,
                        }}
                    >100000</Text>

                    <Text
                        style={{
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansMedium,
                            fontSize: 13,
                        }}
                    >Point</Text>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View>

            <View
                style={{
                    backgroundColor: colors.primary,
                    width: "100%",
                    height: 60,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    position: 'absolute',
                    left: 0,
                    right: 0
                }}
            />


            <Card
                style={{
                    marginTop: 10,
                    marginHorizontal: utils.sizes.containerPadding,
                }}
                elevation={4}
            >


                {!showBalances && <Balance onPress={()=> {
                    //setShowBalances(true)
                }} />}

                {showBalances && <BalancesSection onPress={()=> {
                    //setShowBalances(false)
                }} />}


                <View
                    style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: colors.gray3
                    }}
                />


                {/*<View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingHorizontal: 15
                    }}
                >

                    <Menu
                        title="Top up"
                        iconName={"arrow-circle-down"}
                        Icon={FontAwesome5}
                        onPress={() => {
                            navigation.navigate(utils.screens.topup)
                        }}
                    />

                    <Menu
                        title="Withdraw"
                        iconName={"arrow-circle-up"}
                        Icon={FontAwesome5}
                        onPress={() => {
                            navigation.navigate(utils.screens.withdraw)
                        }}
                    />

                    <Menu
                        title="Send"
                        iconName={"paper-plane"}
                        Icon={FontAwesome}
                        onPress={() => {
                            navigation.navigate(utils.screens.send)
                        }}
                    />

                    <Menu
                        title="Finance"
                        iconName={"donate"}
                        Icon={FontAwesome5}
                        onPress={() => {
                            navigation.navigate(utils.screens.finance)
                        }}
                    />

                </View>*/}

            </Card>


        </View>
    )
}

export default HomeBalanceSection