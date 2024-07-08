import {View} from "react-native";
import React from "react";
import {connect, useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";


const DividerUI = (props) =>{
    const { colors, sizes, fonts } = useTheme();


    return(
        <View
            style={{
                backgroundColor: colors.background,
                height: 5
            }}
        />
    )
}

export default DividerUI
