import React from 'react';
import {Text, View, TextInput} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import {useSelector} from "react-redux";

const FormInputUI = (props) => {
    const {
        containerStyle, label, placeholder, inputStyle, prependComponent,
        appendComponent, onChange, secureTextEntry,
        keyboardType = 'default',
        autoComplete = 'off',
        autoCapitalize = 'none',
        errorMessage = '',
        value
    } = props

    const isDarkMode = useSelector((state) => state.app.isDarkMode)

    return (
        <View
            style={{
                marginBottom: 14,
                ...containerStyle
            }}
        >

            {/* Label and Error message */}
            <View
                style={{
                    //flexDirection: 'row',
                    //justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: isDarkMode? COLORS.darkColor1:COLORS.lightColor1,
                        ...FONTS.body4
                    }}
                >
                    {label}
                </Text>
            </View>


            {/* Text input */}
            <View
               style={{
                   flexDirection: 'row',
                   height: 45,
                   paddingHorizontal: SIZES.padding,
                   marginTop: 3,
                   borderRadius: SIZES.radius,
                   borderColor: errorMessage? 'red' : (isDarkMode? COLORS.darkCard:COLORS.lightCard),
                   borderWidth: 1,
                   backgroundColor: isDarkMode? COLORS.darkCard:COLORS.lightCard
               }}
            >
                {prependComponent}

                  <TextInput
                     style={{
                         flex: 1,
                         ...inputStyle,
                         backgroundColor: isDarkMode? COLORS.darkCard:COLORS.lightCard,
                         color: isDarkMode? COLORS.darkColor2:COLORS.lightColor2,
                         fontSize: 16
                     }}
                     placeholder={placeholder}
                     placeholderTextColor={COLORS.gray}
                     secureTextEntry={secureTextEntry}
                     keyboardType={keyboardType}
                     autoComplete={autoComplete}
                     autoCapitalize={autoCapitalize}
                     onChangeText={(value)=>onChange(value)}
                     value={value}
                  />

                {appendComponent}
            </View>

            {errorMessage?
                <Text
                    style={{
                        ...FONTFAMILY.poppinsRegular,
                        color: COLORS.red,
                        marginBottom: -12,
                    }}
                >
                    {errorMessage}
                </Text> : null
            }

        </View>
    )
}

export default FormInputUI