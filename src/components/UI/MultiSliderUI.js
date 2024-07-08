import React, {useEffect, useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import {Image, View, StyleSheet, Text} from 'react-native';
import {COLORS, FONTS, ICONS, SIZES} from "../../constants";

const MultiSliderUI = (props) =>{
    const { onChange, postFix, preFix, min, max, values } = props

    return(
         <MultiSlider
            values={values}
            sliderLength={SIZES.width - (SIZES.padding * 2) - 80}
            min={min}
            max={max}
            step={1}
            markerOffsetY={20}
            selectedStyle={{
                backgroundColor: COLORS.primary
            }}
            trackStyle={{
                backgroundColor: COLORS.lightGray2,
                height: 8,
                borderRadius: 8
            }}
            minMarkerOverlapDistance={50}
            onToggleTwo={(values)=>onChange(values)}
            customMarker={(e)=>{
                return(
                    <View
                      style={{
                          //height: 100,
                          alignItems: 'center',
                          justifyContent: 'center',

                      }}
                    >
                        <View
                            style={{
                                height: 25,
                                width: 25,
                                borderRadius: 15,
                                borderWidth: 4,
                                marginTop: -16,
                                borderColor: COLORS.white,
                                backgroundColor: COLORS.primary,
                                ...styles.shadow
                            }}
                        />
                        <Text style={{
                            marginTop: -5,
                            color: COLORS.darkGray,
                            ...FONTS.body3,
                            //fontSize: 15
                        }}>
                            {preFix}{e.currentValue}{postFix}
                        </Text>
                    </View>
                )
            }}
         />
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.1
    }
})

export default MultiSliderUI