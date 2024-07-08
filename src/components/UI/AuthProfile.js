import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";

const AuthProfile = ({}) =>{
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.user);
    const { colors, sizes, fonts } = useTheme();
    const navigation = useNavigation();
    const photo = user.photo? {uri: user.photo} : utils.images.user

    return(
        <View
            style={{
                backgroundColor: colors.card,
                paddingHorizontal: sizes.padding/2,
                paddingVertical: sizes.padding/2,
                marginVertical: sizes.padding,
                marginHorizontal: sizes.padding,
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
                onPress={() => {navigation.navigate(utils.screens.profile)}}
            >
                <Image
                    source={photo}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 13,
                        borderRadius: 100
                    }}
                />
                <View>

                    <Text
                        style={{
                            marginBottom: -6,
                            color: colors.text2,
                            fontSize: 14,
                            fontFamily: fonts.poppinsMedium,
                        }}
                    >{user.auth_account}</Text>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 15,
                            fontFamily: fonts.poppinsMedium,
                        }}
                    >{user.first_name} {user.last_name}</Text>
                </View>
            </TouchableOpacity>
           {/* <View
              style={{
                  alignItems: "center",
                  marginRight: 5,
              }}
            >
                <Image
                    source={ICONS.logout}
                    style={{
                        width: 18,
                        height: 18,
                        tintColor: colors.text,
                    }}
                />
                <Text
                  style={{
                      fontSize: 11,
                      marginBottom: -5,
                      fontFamily: fonts.poppinsMedium,
                  }}
                >Logout</Text>
            </View>*/}
        </View>
    )
}

export default AuthProfile
