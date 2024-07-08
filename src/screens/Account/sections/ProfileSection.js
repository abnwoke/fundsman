import React, {Fragment, useState, useMemo} from "react";
import {View, Card} from "react-native-ui-lib";
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import utils from "../../../utils";
import {Image, Text} from "react-native";

const ProfileSection = ({}) =>{
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();

    const photo = user.photo ? {uri: user.photo} : utils.images.user;

    return(
        <View
           style={{
               //flexDirection: "row",
               borderRadius: 0,
               marginVertical: 5,
               marginTop: 15,
               paddingHorizontal: utils.sizes.containerPadding,
               paddingVertical: 18,
               alignItems: "center",
           }}
        >
            <Image
                source={photo}
                style={{
                    width: 80,
                    height: 80,
                    marginRight: 10
                    //marginTop: -3
                }}
            />
           {/* <View>
                <Text
                    style={{
                        marginTop: 10,
                        color: colors.black,
                        fontSize: utils.isIOS? 20:18,
                        lineHeight: 21,
                        fontFamily: utils.fonts.PlusJakartaSansSemiBold
                    }}
                >Abraham Nwoke</Text>
            </View>*/}
        </View>
    )
}

export default ProfileSection