import {Image, Text, TouchableOpacity, View} from "react-native";

import React from "react";
import {useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";


const HeaderIcon = ({icon, iconStyle, onPress, showBadge}) => {
    const {colors, sizes, fonts} = useTheme();
    const isDarkMode = useSelector((state) => state.app.isDarkMode)
    const appTheme = useSelector((state) => state.app.appTheme)

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 24,
                    height: 24,
                    tintColor: appTheme.text,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default HeaderIcon
