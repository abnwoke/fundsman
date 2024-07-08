import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from "../../constants";

const CustomSwitchUI = (props) => {
    const {value, containerStyle, onChange} = props

    return (
        <TouchableWithoutFeedback
            onPress={() => onChange(!value)}
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <View style={value ? styles.switchOnContainer : styles.switchOffContainer}>
                    <View
                        style={{
                            ...styles.dot,
                            backgroundColor: value ? COLORS.white : COLORS.gray
                        }}
                   />
                </View>
                <Text
                    style={{
                        color: value ? COLORS.primary : COLORS.gray,
                        marginLeft: SIZES.base,
                        ...FONTS.body4
                    }}
                >
                    Save Me
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    switchOnContainer: {
        width: 40,
        height: 20,
        paddingRight: 3,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderWidth: 1
    },
    switchOffContainer: {
        width: 40,
        height: 20,
        paddingRight: 3,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        borderColor: COLORS.gray,
        borderWidth: 1
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6
    }
})

export default CustomSwitchUI