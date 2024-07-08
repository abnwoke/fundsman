import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {memo} from "react";
import {useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const MenuUI = ({title, description, icon, iconStyle, containerStyle, onPress, right, active}) => {
    const { colors, sizes, fonts } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={onPress}
            style={{
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                alignItems: 'center',
                backgroundColor: active? colors.primaryTransparent20 : colors.transparent,
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                style={{
                    width: 25,
                    height: 25,
                    marginRight: 13,
                    tintColor: active? colors.primary : colors.text,
                    ...iconStyle
                }}
            />
            <View
              style={{
                  flex: 1
              }}
            >

                <View
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                  }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.poppinsMedium,
                            fontSize: 15,
                            color: active? colors.primary : colors.text,
                            marginTop: description? null : 4
                        }}
                    >{title}</Text>

                    {right?
                        <View>
                            {right()}
                        </View> : null
                    }

                </View>

                {description?
                    <Text
                        style={{
                            fontFamily: fonts.poppinsMedium,
                            color: active? colors.primary : colors.text,
                            fontSize: 11.5,
                            lineHeight: 15
                        }}
                        numberOfLines={2}
                    >{description}</Text> : null
                }

            </View>
        </TouchableOpacity>
    )
}

export default memo(MenuUI)
