import {
    View, Text, TouchableOpacity,
} from 'react-native';
import {Image} from 'expo-image';

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
import React from "react";
import BillWidget from "../widget/BillWidget";

const HomePayBillsSection = ({}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation();



    return (
        <View
            style={{
                marginHorizontal: utils.sizes.containerPadding,
                marginTop: utils.isIOS ? 25 : 21
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center"
                }}
            >

                <Text
                    style={{
                        ...utils.style.h1
                    }}
                >
                    Pay Bills
                </Text>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{}}
                    onPress={() => {
                        navigation.navigate(utils.screens.bills)
                    }}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                            fontSize: utils.isIOS ? 14 : 12
                        }}
                    >
                        View All
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginTop: 12
                }}
            >
                <BillWidget
                    color={colors.success}
                    icon={utils.icons.airtime}
                    bg="rgba(40, 62, 180, 0.1)"
                    title="Airtime"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />
                <BillWidget
                    color={colors.success}
                    icon={utils.icons.internet}
                    bg="rgba(5, 132, 255, 0.1)"
                    title="Internet Data"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />

                <BillWidget
                    color={colors.success}
                    icon={utils.icons.electricity}
                    bg="rgba(242, 195, 28, 0.1)"
                    title="Electricity"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />
                <BillWidget
                    color={colors.success}
                    icon={utils.icons.water_bill}
                    bg="rgba(57, 163, 248, 0.1)"
                    title="Water Bill"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />
                <BillWidget
                    color={colors.success}
                    icon={utils.icons.travel}
                    bg="rgba(83, 61, 234, 0.2)"
                    title="Travel"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />

                <BillWidget
                    color={colors.success}
                    icon={utils.icons.film}
                    bg="rgba(245, 149, 0, 0.1)"
                    title="Film"
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    onPress={() => {

                    }}
                />


            </View>


        </View>
    )
}

export default HomePayBillsSection