import React, {Fragment, useState, useMemo} from "react";
import {View, Card} from "react-native-ui-lib";
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import utils from "../../utils";
import {Image, Text} from "react-native";

const MenuSection = ({label, value, showLabel=true}) =>{
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();

    const photo = user.photo ? {uri: user.photo} : utils.images.user;


    return(
        <Card
           style={{
               flexDirection: "row",
               borderRadius: 0,
               marginVertical: 2,
               paddingHorizontal: utils.sizes.containerPadding,
               paddingVertical: 10,
               alignItems: "center",
               justifyContent: 'space-between'
           }}
        >

            <View>

                {showLabel &&
                    <Text
                        style={{
                            color: colors.gray7,
                            fontSize: utils.isIOS? 16:14,
                            lineHeight: 17,
                            fontFamily: utils.fonts.PlusJakartaSansSemiBold
                        }}
                    >{label}</Text>
                }

                <Text
                    style={{
                        marginTop: 1,
                        color: colors.black,
                        lineHeight: 18,
                        fontSize: utils.isIOS? 17:15,
                        fontFamily: utils.fonts.PlusJakartaSansMedium
                    }}
                >{value}</Text>

            </View>
            <Image
                source={utils.icons.forward}
                style={{
                    width: 15,
                    height: 15,
                    marginRight: 10,
                    tintColor: colors.gray9
                    //marginTop: -3
                }}
            />
        </Card>
    )
}

export default MenuSection