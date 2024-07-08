import {StyleSheet} from "react-native";
import React, {useState, memo, Fragment} from "react";
import {useSelector} from "react-redux";
import {Colors, Text, View} from "react-native-ui-lib";
import utils from "../../utils";
import {useTheme} from "@react-navigation/native";

const MessageUI = (({message='', success, containerStyle}) => {
    const {colors, sizes, fonts} = useTheme();

    //csconsole.log("MessageUI")

    if(!message){
        return null
    }


    return (
        <View
          style={{
             ...containerStyle
          }}
        >
            {message &&
            <Text
                style={{
                    fontFamily: fonts.poppinsMedium,
                    fontSize: 15,
                    color: success? colors.success : colors.danger
                }}
            >{message}</Text>
            }
        </View>
    )
});


export default memo(MessageUI)
