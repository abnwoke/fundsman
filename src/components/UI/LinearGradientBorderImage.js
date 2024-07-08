import React from "react";
import LinearGradient from 'react-native-linear-gradient'
import {FONTFAMILY, SIZES} from "../../constants";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import LinearGradientBackground from "./LinearGradientBackground";

const LinearGradientBorderImage = ({ source, imageStyle, containerStyle}) =>{
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);

    return(
        <LinearGradientBackground
            containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: imageStyle?.borderRadius? imageStyle?.borderRadius:0,
                ...containerStyle
            }}
        >
            <Image
                source={typeof source === 'string' ? {uri: source} : source}
                style={{
                    margin: 1.5,
                    ...imageStyle
                }}
            />
        </LinearGradientBackground>
    )
}

export default LinearGradientBorderImage