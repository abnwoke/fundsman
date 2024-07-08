
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
import ExchangerWidget from "../widget/ExchangerWidget";

const HomeExchangerSection = ({}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation();


    const data = [
        {
            picture: utils.images.user,
            first_name: "Abraham",
            last_name: "Nwoke",
            online: true,
        },
        {
            picture: utils.images.user,
            first_name: "John",
            last_name: "Doe",
            online: false,
        },
        {
            picture: utils.images.user,
            first_name: "Esther",
            last_name: "James",
            online: false,
        },
        {
            picture: utils.images.user,
            first_name: "Joy",
            last_name: "Iaac",
            online: true,
        },
        {
            picture: utils.images.user,
            first_name: "Tony",
            last_name: "Nguyen",
            online: true,
        },
        {
            picture: utils.images.user,
            first_name: "Grace",
            last_name: "Peter",
            online: false,
        },
        {
            picture: utils.images.user,
            first_name: "George",
            last_name: "Godday",
            online: true,
        },
    ]



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
                    Exchangers
                </Text>

                {/*<TouchableOpacity
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
                </TouchableOpacity>*/}
            </View>

            <View
                style={{
                    marginTop: 12
                }}
            >

                {data?.map((data, i)=>(
                    <ExchangerWidget data={data} key={i} />
                ))}


            </View>

        </View>
    )
}

export default HomeExchangerSection