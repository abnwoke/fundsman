import React, {Fragment} from "react";
import {Shadow} from "react-native-shadow-2";
import {useWindowDimensions, View} from "react-native";
import {useSelector} from "react-redux";
import {lightTheme} from "../../constants";

const FooterWrapper = ({children}) =>{
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);
    const {height, width} = useWindowDimensions();

    const isIOS = Platform.OS === 'ios'

    return(

        <Fragment>
            <View style={{height: isIOS? 18 : 50}}/>
            <Shadow
                size={[width, 50]}
                startColor={'rgba(0,0,0,0.02)'}
                distance={1.5}
                viewStyle={{
                    backgroundColor: appTheme.footerBackground,
                }}
                containerStyle={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        //height: 50,
                        //overflow: 'hidden',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        //width: '100%',
                        //backgroundColor: '#fff',
                        backgroundColor: lightTheme.footerBackground,
                        borderTopWidth: 1,
                        borderTopColor: lightTheme.lineDivider,
                        paddingVertical: isIOS? 10 : 5,
                        paddingBottom: isIOS? 10 : 4,
                        //paddingTop: 6
                    }}
                >
                    {children}
                </View>
            </Shadow>
        </Fragment>
    )
}

export default FooterWrapper
