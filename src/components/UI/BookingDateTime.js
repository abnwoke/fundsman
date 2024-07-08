import {Card, RadioButton} from 'react-native-ui-lib';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, ImageBackground, Text, Image, TouchableOpacity, View} from 'react-native';

import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const BookingDateTime = ({label, value, containerStyle, onPress, iconStyle, labelStyle, valueStyle}) => {
    const {colors, sizes, fonts} = useTheme();
    
    return (
        <TouchableOpacity
            aciveOpacity={0.5}
            onPress={onPress}
            style={{
                paddingHorizontal: 17,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: colors.primaryTransparent60,
                marginRight: 13,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                ...containerStyle
            }}
        >
            <Image
                source={utils.icons.angle_down}
                style={{
                    width: 14,
                    height: 14,
                    tintColor: colors.primary,
                    marginRight: 10,
                    marginLeft: -3,
                    ...iconStyle
                }}
            />


            <View

            >

                <Text
                    style={{
                        color: colors.gray70,
                        fontSize: 10,
                        lineHeight: 13,
                        fontFamily: fonts.poppinsMedium,
                        ...labelStyle
                    }}
                >{label}</Text>

                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 12,
                        lineHeight: 14,
                        fontFamily: fonts.poppinsBold,
                        ...valueStyle
                    }}
                >{value}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default BookingDateTime