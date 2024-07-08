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
import React from "react";

const HomeActionSection = ({title, menuStyle, menu}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation();

    const Menu = ({onPress, title, Icon, iconName, color}) => {
        return (
            <Card
                activeOpacity={0.8}
                elevation={4}
                style={{
                    alignItems: 'center',
                    padding: 10,
                    width: "48%",
                    flexDirection: "row",
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: utils.isIOS? 12 : 11,
                    ...menuStyle
                    //flex: 1
                }}
                onPress={onPress}
            >

                <Icon name={iconName} size={utils.isIOS ? 20 : 18} color={color}/>

                <Text
                    style={{
                        marginLeft: 10,
                        color: colors.black,
                        fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                        fontSize: utils.isIOS ? 14 : 13,
                        //lineHeight: 14.5,
                        marginTop: utils.isAndroid ? -4 : 0
                    }}
                >{title}</Text>

            </Card>
        )
    }


    return (
        <View
            style={{
                marginHorizontal: utils.sizes.containerPadding,
                marginTop: utils.isIOS? 25 : 21
            }}
        >

            <Text
                style={{
                    ...utils.style.h1
                }}
            >
                {title}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12
                }}
            >
                {menu?.map((m,i)=>(
                    <Menu
                        key={i}
                        color={m.color}
                        title={m.title}
                        iconName={m.iconName}
                        Icon={m.Icon}
                        onPress={m.onPress}
                    />
                ))}
            </View>
        </View>
    )
}

export default HomeActionSection