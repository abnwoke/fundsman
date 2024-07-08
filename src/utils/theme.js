import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
    Dimensions, Platform
} from "react-native";



const {width, height} = Dimensions.get("window");
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export const sizes = {
    font: 14,
    radius: 5,
    padding: 9,
    containerPadding: 15,
    fontSize1: 30,
    fontSize2: 22,
    fontSize3: 16,
    fontSize4: 14,
    fontSize5: 12,
    width,
    height
}


export const font_files = {
    /*'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-BoldItalic': require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../../assets/fonts/Poppins-ThinItalic.ttf'),*/
    'KronaOne-Regular': require('../../assets/fonts/KronaOne-Regular.ttf'),


    'PlusJakartaSans-Bold': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.ttf'),
    //'PlusJakartaSans-BoldItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-BoldItalic.ttf'),
    'PlusJakartaSans-ExtraBold': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.ttf'),
    //'PlusJakartaSans-ExtraBoldItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBoldItalic.ttf'),
    'PlusJakartaSans-ExtraLight': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraLight.ttf'),
    //'PlusJakartaSans-ExtraLightItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraLightItalic.ttf'),
    //'PlusJakartaSans-Italic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-Italic.ttf'),
    'PlusJakartaSans-Light': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-Light.ttf'),
    //'PlusJakartaSans-LightItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-LightItalic.ttf'),
    'PlusJakartaSans-Medium': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.ttf'),
    //'PlusJakartaSans-MediumItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-MediumItalic.ttf'),
    'PlusJakartaSans-Regular': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-SemiBold': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.ttf'),
    //'PlusJakartaSans-SemiBoldItalic': require('../../assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBoldItalic.ttf'),
}

export const fonts = {
    PlusJakartaSansLight: "PlusJakartaSans-Light",
    PlusJakartaSansExtraLight: "PlusJakartaSans-ExtraLight",
    PlusJakartaSansRegular: "PlusJakartaSans-Regular",
    PlusJakartaSansMedium: "PlusJakartaSans-Medium",
    PlusJakartaSansSemiBold: "PlusJakartaSans-SemiBold",
    PlusJakartaSansBold: "PlusJakartaSans-Bold",
    PlusJakartaSansExtraBold: "PlusJakartaSans-ExtraBold",


    /*poppinsBlack: "Poppins-Black",
    poppinsBlackItalic: "Poppins-BlackItalic",
    poppinsBold: "Poppins-Bold",
    poppinsBoldItalic: "Poppins-BoldItalic",
    poppinsSemiBold: "Poppins-SemiBold",
    poppinsSemiBoldItalic: "Poppins-SemiBoldItalic",
    poppinsExtraBold: "Poppins-ExtraBold",
    poppinsExtraBoldItalic: "Poppins-ExtraBoldItalic",
    poppinsThin: "Poppins-Thin",
    poppinsThinItalic: "Poppins-ThinItalic",
    poppinsMedium: "Poppins-Medium",
    poppinsMediumItalic: "Poppins-MediumItalic",
    poppinsRegular: "Poppins-Regular",
    poppinsItalic: "Poppins-Italic",
    poppinsLight: "Poppins-Light",
    poppinsLightItalic: "Poppins-LightItalic",
    poppinsExtraLight: "Poppins-ExtraLight",
    poppinsExtraLightItalic: "Poppins-ExtraLightItalic",*/
    kronaOneRegular: "KronaOne-Regular",
};


const general = {
    sizes: sizes,
    fonts: fonts,
}


export const colors = {
    primary: "#504DC0",
    primaryTransparent10: "rgba(59,89,238,0.10)",
    primaryTransparent20: "rgba(59,89,238,0.20)",
    primaryTransparent30: "rgba(59,89,238,0.30)",
    primaryTransparent40: "rgba(59,89,238,0.40)",
    primaryTransparent50: "rgba(59,89,238,0.50)",
    primaryTransparent60: "rgba(59,89,238,0.60)",
    primaryTransparent70: "rgba(59,89,238,0.70)",
    primaryTransparent80: "rgba(59,89,238,0.80)",
    primaryTransparent90: "rgba(59,89,238,0.90)",
    secondary: "rgb(112,143,181)",
    secondary2: "rgb(10,71,110)",

    //Colors
    orange: "#FFA133",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: "#27AE60",
    red: "#FF1717",
    blue: '#0d6efd',
    dark: '#212529',
    light: '#f8f9fa',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    success: '#4BB543',
    white: '#FFFFFF',
    black: "#000000",
    darkBlue: "#111A2C",
    darkGray: "#525C67",

    gray: "#C3C3C3",
    gray1: "#F3F3F3",
    gray2: "#F0FFFB",
    gray3: "#EBF3EF",
    gray4: "#E5E5E5",
    gray5: "#CCCCCC",
    gray6: "#A1A1A1",
    gray7: "#999999",
    gray8: "#7F7F7F",
    gray9: "#666666",
    gray10: "#4C4C4C",
    gray11: "#333333",
    gray12: "#242526",
    gray13: "#191919",

    transparent: 'transparent',

    transparentWhite1: "rgba(255, 255, 255, 0.1)",

    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack2: "rgba(0, 0, 0, 0.2)",
    transparentBlack3: "rgba(0, 0, 0, 0.3)",
    transparentBlack4: "rgba(0, 0, 0, 0.4)",
    transparentBlack5: "rgba(0, 0, 0, 0.5)",
    transparentBlack6: "rgba(0, 0, 0, 0.6)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)",
    transparentBlack8: "rgba(0, 0, 0, 0.8)",
    transparentBlack9: "rgba(0, 0, 0, 0.9)",


    additionalColor4: "#C3C3C3",
    additionalColor9: "#F3F3F3",
    additionalColor11: "#F0FFFB",
    additionalColor13: "#EBF3EF",
}

export const light_theme = {
    statusBarStyle: 'dark-content',
    colors: {
        ...NavigationDefaultTheme.colors,
        ...colors,
        headerBackground: "#fff",
        footerBackground: "#fff",
        statusBarBackground: '#fff',
        background: '#F2F2F2',
        text: '#20303C',
        text2: '#777777',
        text3: '#F2F2F2',
        card: "#fff",
        card2: "rgba(237, 239, 244, 0.6)",
        border: "#DDDDDD",
        lineDivider: "rgba(237, 239, 244, 0.6)",
        placeholder: '#777777',
        shadow: "#000",

    },
    ...general
}


export const dark_theme = {
    statusBarStyle: 'light-content',
    colors: {
        ...NavigationDarkTheme.colors,
        ...colors,
        headerBackground: "rgb(18, 18, 18)",
        footerBackground: "rgb(18, 18, 18)",
        statusBarBackground: "rgb(18, 18, 18)",
        background: "#18171c",
        text: '#EFEFEF',
        text2: '#BABABA',
        text3: '#BABABA',
        card: "#23272a",
        card2: "#191919",
        border: "#232323",
        lineDivider: "#23272a",
        placeholder: '#777777',
        shadow: "#23272a",

    },
    ...general,
}


export const styles = {
    fieldWithUnderline: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 0
    },
    fieldWithOutline: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 12,
        borderRadius: 8
    },
    fieldWithFill: {
        borderWidth: 1,
        //borderColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 12,
        borderRadius: 20,
        height: 40,
    },

    h1: {
        color: colors.black,
        fontFamily:  fonts.PlusJakartaSansBold,
        fontSize:  isIOS ? 16 : 14,
    },
    h2: {fontFamily: fonts.poppinsSemiBold, fontSize: 18, color: '#2E335C', marginTop: 18},
    h3: {fontFamily: fonts.poppinsSemiBold, fontSize: 14, lineHeight: 17},
    h4: {fontFamily: fonts.poppinsMedium, lineHeight: 17, fontSize: 12.5, color: '#777777'},
    body1: {fontFamily: "Poppins-Regular", fontSize: sizes.body1, lineHeight: 36},
}
