import React from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';

import {useSelector} from "react-redux";
import { Button } from 'react-native-paper';
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const ButtonUI = ({
                      label=null, containerStyle, style, labelStyle, onPress,
                      loading=false, disabled=false, icon="", buttonColor,
                      textColor='white', mode="contained"
                  }) =>{

    const {colors, sizes, fonts} = useTheme();

    return(
        <Button
            loading={loading}
            disabled={disabled}
            uppercase={false}
            icon={icon}
            mode={mode} //'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
            buttonColor={buttonColor || colors.primary}
            textColor={textColor}
            contentStyle={{
                ...containerStyle
            }}
            style={{
                height: 34,
                width: 100,
                ...style
            }}
            labelStyle={{
                marginTop: 5.5,
                fontFamily: fonts.poppinsMedium,
                ...labelStyle
            }}
            onPress={onPress}
        >
            {label}
        </Button>
    )
}

export default ButtonUI
