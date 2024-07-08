import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from "../../constants";

const TextIconButton = (props) => {
    const {text, containerStyle, iconPosition, textStyle, iconStyle, icon, onPress} = props

    return (
        <TouchableOpacity
            activeOpacity={0.3}
            style={{
                borderRadius: SIZES.base,
                padding: 8,
                margin: 5,
                marginTop: SIZES.base,
                //width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                ...containerStyle
            }}
            onPress={onPress}
        >

            {iconPosition === 'left' &&
            <Image
                source={icon}
                style={{
                    ...styles.image,
                    ...iconStyle
                }}
            />
            }

            <Text
                style={{
                    marginRight: 5,
                    ...FONTS.body3,
                    ...textStyle
                }}
            >{text}</Text>

            {iconPosition === 'right' &&
            <Image
                source={icon}
                style={{
                    ...styles.image,
                    ...iconStyle
                }}
            />
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 15,
        height: 15,
        marginTop: -3,
        tintColor: COLORS.gray,
    }
})

export default TextIconButton