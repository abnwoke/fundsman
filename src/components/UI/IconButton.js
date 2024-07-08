import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {COLORS} from "../../constants";

const IconButton = (props) =>{
    const { icon, containerStyle, iconStyle, onPress } = props

    return(
        <TouchableOpacity
         style={{
             borderWidth: 2,
             borderRadius: 10,
             borderColor: COLORS.gray2,
             ...containerStyle
         }}
         onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 23,
                    height: 23,
                    tintColor: COLORS.gray2,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default IconButton