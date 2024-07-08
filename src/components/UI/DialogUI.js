import {Dialog} from "react-native-ui-lib";

import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const DialogUI = (props) => {
    const {
        visible,
        onDismiss,
        onConfirm,
        onConfirm2,
        ignoreBackgroundPress = false,
        title = null,
        message = null,
        confirmText="YES",
        confirmText2= null,
        dismissText="No",
    } = props

    const {colors, sizes, fonts} = useTheme();

    return (
        <Dialog
            useSafeArea
            visible={visible}
            onDismiss={() => onDismiss()}
            ignoreBackgroundPress={ignoreBackgroundPress}
            containerStyle={{
                backgroundColor: colors.white,
                marginBottom: 20,
                borderRadius: 12
            }}
        >
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >


                {title &&
                    <Text
                        style={{
                            color: colors.text,
                            fontFamily: fonts.poppinsMedium,
                            paddingTop: 10,
                            paddingHorizontal: 10,
                            textAlign: "center",
                            fontSize: 17
                        }}
                    >{title}</Text>
                }


                {message &&
                    <Text
                        style={{
                            color: colors.text2,
                            fontFamily: fonts.poppinsMedium,
                            paddingVertical: 0,
                            paddingHorizontal: 10,
                            fontSize: 13
                        }}
                    >{message}</Text>
                }


                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 20,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => onDismiss()}
                    >
                        <Text
                            style={{
                                color: colors.danger,
                                fontFamily: fonts.poppinsSemiBold,
                                fontSize: 15,
                                marginRight: 30
                            }}
                        >{dismissText.toUpperCase()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => onConfirm()}
                    >
                        <Text
                            style={{
                                color: colors.primary,
                                fontFamily: fonts.poppinsSemiBold,
                                fontSize: 15,
                            }}
                        >{confirmText.toUpperCase()}</Text>
                    </TouchableOpacity>


                    {confirmText2 &&
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => onConfirm2()}
                        >
                            <Text
                                style={{
                                    color: colors.primary,
                                    fontFamily: fonts.poppinsSemiBold,
                                    fontSize: 15,
                                    marginLeft: 30
                                }}
                            >{confirmText2.toUpperCase()}</Text>
                        </TouchableOpacity>
                    }

                </View>

            </View>
        </Dialog>
    )
}


export default DialogUI
