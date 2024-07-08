import React, {Fragment, useState, useMemo} from "react";
import {View, Card} from "react-native-ui-lib";
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import utils from "../../../utils";
import {Image, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const ProfileDetailSection = ({label, value}) => {
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();

    const photo = user.photo ? {uri: user.photo} : utils.images.user;

    return (
        <Card
            style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                borderRadius: 8,
                marginVertical: 4,
                paddingHorizontal: utils.sizes.containerPadding,
                paddingVertical: 10,
                alignItems: "center",
                marginHorizontal: 30,
                backgroundColor: colors.gray1
            }}
        >

            <View>
                <Text
                    style={{
                        color: colors.gray7,
                        fontSize: utils.isIOS ? 16 : 14,
                        lineHeight: 17,
                        fontFamily: utils.fonts.PlusJakartaSansSemiBold
                    }}
                >{label}</Text>

                <Text
                    style={{
                        marginTop: 1,
                        color: colors.black,
                        lineHeight: 18,
                        fontSize: utils.isIOS ? 17 : 15,
                        fontFamily: utils.fonts.PlusJakartaSansMedium
                    }}
                >{value}</Text>
            </View>


            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    flexDirection: 'row'
                }}
            >
                <Text
                    style={{
                        marginTop: 1,
                        color: colors.success,
                        lineHeight: 14,
                        fontSize: utils.isIOS ? 13 : 12,
                        fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                        marginRight: 5
                    }}
                >Copy</Text>
                <Ionicons
                    name="copy"
                    size={15}
                    color={colors.success}
                />
            </TouchableOpacity>

        </Card>
    )
}

export default ProfileDetailSection