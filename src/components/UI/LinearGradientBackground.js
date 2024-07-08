import React from "react";
import LinearGradient from 'react-native-linear-gradient'
import {useSelector} from "react-redux";

const LinearGradientBackground = ({children, containerStyle}) =>{
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);


    return(
        <LinearGradient
            style={{
                ...containerStyle
            }}
            start={{ x: 0.1, y: 0 }}
            end={{x: 1, y: 1 }}
            colors={[appTheme.primary, '#8881d7', '#3f45fe']}
        >
            {children}
        </LinearGradient>
    )
}

export default LinearGradientBackground