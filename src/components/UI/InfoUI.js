import {Image, Text, TouchableOpacity, View} from "react-native";
import {COLORS, FONTS} from "../../constants";
import React from "react";

import {useSelector} from "react-redux";

const InfoUI = (props) => {
    const {
        title, description, icon, containerStyle, onPress, right
    } = props;

    const isDarkMode = useSelector((state) => state.app.isDarkMode)

    return (
        <View
            activeOpacity={0.4}
            onPress={onPress}
            style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode? COLORS.darkCard : COLORS.lightCard,
                alignItems: 'center',
                ...containerStyle
            }}
        >

            <View
              style={{
                  flex: 1
              }}
            >

                <View
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                  }}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            fontSize: 15,
                            color: isDarkMode? COLORS.darkColor1 : COLORS.lightColor1
                        }}
                    >{title}</Text>

                    {right?
                        <View>
                            <Text
                                style={{
                                    ...FONTS.h4,
                                    fontSize: 15,
                                    color: isDarkMode? COLORS.darkColor2 : COLORS.lightColor2
                                }}
                            >{right}</Text>
                        </View> : null
                    }

                </View>

                {description?
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: isDarkMode? COLORS.darkColor2 : COLORS.lightColor2,
                            fontSize: 12,
                            lineHeight: 15
                        }}
                        numberOfLines={2}
                    >{description}</Text> : null
                }

            </View>
        </View>
    )
}

export default InfoUI
