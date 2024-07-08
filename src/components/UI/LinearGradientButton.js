import React from "react";
import LinearGradient from 'react-native-linear-gradient'

const LinearGradientButton = ({children, containerStyle}) =>{

    return(
        <LinearGradient
            colors={['red', 'yellow', 'green' ]}
            style={{
                height: 200,
                width: 350,
                ...containerStyle
            }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
        >
            {children}
        </LinearGradient>
    )
}

export default LinearGradientButton