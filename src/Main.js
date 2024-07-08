
import {
    useState,
    useEffect,
    useRef,
    Fragment,
    useCallback
} from 'react';

import {
    Platform,
    StatusBar,
    useColorScheme,
    Appearance,
    ImageBackground,
    View,
    Text
} from 'react-native';

import {SafeAreaProvider} from "react-native-safe-area-context";
import {useFonts} from 'expo-font';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast, { BaseToast, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message'

import { sendPushNotification, registerForPushNotificationsAsync }  from './libs/expo-push-notifications'

import {
    NavigationContainer,
    useNavigationContainerRef,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import Drawers from "./libs/react-navigation/Drawer";
import OnBoardingStack from "./libs/react-navigation/OnBoardingStack";
import AuthStack from "./libs/react-navigation/AuthStack";


import {useDispatch, useSelector} from "react-redux";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

import { dark_theme, light_theme, fonts, colors } from './utils/theme';

import App from "./modules/app";
import utils from "./utils";
import User from "./modules/user";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const prefix = Linking.createURL('/');


export default function Main() {
    const dispatch = useDispatch();

    const [isReady, setIsReady] = useState(false);
    const app = useSelector((state) => state.app);
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    //const insets = useSafeAreaInsets();

    User.hooks.useGetUser(user.slug);

    //Theme
    const scheme = useColorScheme();
    const [theme, setTheme] = useState(scheme);


    const navigationRef = useNavigationContainerRef();


     // Push Notification
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [fontLoaded] = useFonts(utils.font_files);

    const handleAppearance = useCallback(async (theme) => {
        if(app.theme === 'system') {
            const isDark = theme.colorScheme === 'dark';
            await dispatch(App.actions.setDarkMode({theme: 'system', isDarkMode: isDark}));
        }
    }, []);


    useEffect(() => {
        Appearance.addChangeListener(handleAppearance);
        return () => {
            //Appearance.removeChangeListener(handleColorScheme);
        };
    }, [handleAppearance]);


    const handleSetTheme = useCallback((theme) => {
        setTheme(theme);
    }, []);


    const handleSetIsReady = useCallback((ready) => {
        setIsReady(ready);
    }, []);


    useEffect(() => {
        const restoreState = async () => {
            try {
                if(app.theme === 'system'){
                    const isDark = theme === 'dark';
                    await dispatch(App.actions.setDarkMode({theme: 'system', isDarkMode: false}));
                }

                if (fontLoaded) {
                    handleSetIsReady(true);
                }

            } catch (e) {
                //Ignore
            }
        };
        restoreState();
    }, [fontLoaded]);



    useEffect(() => {

        //dispatch(App.actions.setNewInstalled(true));

        registerForPushNotificationsAsync(Notifications).then(token => {
            dispatch(App.actions.setPushToken(token));
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);




    /******************************
             FONTS
    *******************************/
    const config = {
        screens: {
            homeDrawer: {
                screens: {
                    questions: 'questions',
                },
            },
            question: 'question',
            //NotFound: '*',
        },
    };

    useEffect(() => {
        Linking.addEventListener('url', (event) => {
            // console.log(Linking.parse(event.url))
        })

        return () => {
            //Linking.removeEventListener('url')
        }
    }, [])
    const linking = {
        prefixes: [prefix, 'https://isolvegh.com', 'exps://isolvegh.com'],
        config
    };



    if (!isReady) {
        if(utils.isAndroid){
            return null;
        } else {
            return (
                <ImageBackground
                    source={require('../assets/images/splash_screen.jpg')}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: "cover",
                        justifyContent: "center"
                    }}
                >
                </ImageBackground>
            )
        }
    }


    const text1Style = {
        fontSize: 15,
        fontFamily: fonts.poppinsMedium,
        color: light_theme.text
    }
    const text2Style = {
        fontSize: 13,
        fontFamily: fonts.poppinsRegular,
        color: light_theme.text2
    }

    const toastConfig = {

        success: (props) => (
            <SuccessToast
                {...props}
                style={{ borderLeftColor: colors.success }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={text1Style}
                text2Style={text2Style}
            />
        ),

        error: (props) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: colors.danger, zIndex: 999999999999999 }}
                contentContainerStyle={{ paddingHorizontal: 15, zIndex: 999999999999999 }}
                text1Style={text1Style}
                text2Style={text2Style}
            />
        ),

        info: (props) => (
            <InfoToast
                {...props}
                style={{ borderLeftColor: colors.info }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={text1Style}
                text2Style={text2Style}
            />
        ),

        base: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: colors.primary }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={text1Style}
                text2Style={text2Style}
            />
        ),

        tomatoToast: ({ text1, props }) => (
            <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
                <Text>{text1}</Text>
                <Text>{props.uuid}</Text>
            </View>
        )
    };

    //console.log(auth)

    return (
             <Fragment>

                 <StatusBar
                     translucent
                     barStyle={app.isDarkMode?  dark_theme.statusBarStyle : light_theme.statusBarStyle}
                     backgroundColor={app.isDarkMode? dark_theme.colors.statusBarBackground : light_theme.colors.statusBarBackground}
                 />

                 <NavigationContainer
                     ref={navigationRef}
                     linking={linking}
                     theme={app.isDarkMode? dark_theme : light_theme}
                     onReady={async () => {
                         await SplashScreen.hideAsync();
                     }}
                     /*fallback={
                         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                             <ActivityIndicator size="large" color="#7C0103"/>
                         </View>
                     }*/
                 >

                     <Drawers/>
                     {/*{app.newInstalled? <OnBoardingStack/> :  <Drawers/> }*/}

                 </NavigationContainer>
                 <Toast
                     config={toastConfig}
                     topOffset={utils.isIOS? 55 : 45}
                     bottomOffset={50}
                     visibilityTime={5000}
                 />
             </Fragment>
    );
}
