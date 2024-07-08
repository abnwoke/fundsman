import React from "react";
import LinearGradient from 'react-native-linear-gradient'
import {FONTFAMILY, SIZES} from "../../constants";
import {Text, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import LinearGradientBackground from "./LinearGradientBackground";

const LinearGradientOutlineButton = ({ text, textStyle, onpPress, containerStyle}) =>{
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);

    return(
        <LinearGradientBackground
            containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onpPress}
                style={{
                    margin: 1,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2.5,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    ...containerStyle
                }}
            >
                <Text
                    style={{
                        color: appTheme.primary,
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginBottom: -3,
                        fontSize: 12,
                        ...FONTFAMILY.poppinsMedium,
                        ...textStyle
                    }}
                >{text}</Text>
            </TouchableOpacity>
        </LinearGradientBackground>
    )
}

export default LinearGradientOutlineButton