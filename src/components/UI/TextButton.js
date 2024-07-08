import React from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
import {COLORS, FONTFAMILY, FONTS, SIZES} from "../../constants";
import {useSelector} from "react-redux";

const TextButton = (props) =>{
    const { text, containerStyle, textStyle, onPress } = props;
    const isDarkMode = useSelector((state) => state.app.isDarkMode)

    return(
        <TouchableOpacity
         activeOpacity={0.5}
         style={{
             borderRadius: 5,
             padding: 5,
             margin: 5,
             marginTop: SIZES.base,
             //width: '30%',
             alignItems: 'center',
             justifyContent: 'center',
             ...containerStyle
         }}
         onPress={onPress}
        >
            <Text
              style={{
                  ...FONTFAMILY.poppinsSemiBold,
                  color: isDarkMode? COLORS.darkColor1:COLORS.lightColor1,
                  ...textStyle
              }}
            >{text}</Text>
        </TouchableOpacity>
    )
}

export default TextButton