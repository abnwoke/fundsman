import React, {useState} from "react";
import { Easing } from 'react-native'
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

const Stack = createSharedElementStackNavigator();
const options = {
    gestureEnabled: true,
    transitionSpec: {
        open: {
            animation: 'timing',
            config:{duration: 400, easing: Easing.inOut(Easing.ease)}
        },
        close: {
            animation: 'timing',
            config:{duration: 400, easing: Easing.inOut(Easing.ease)}
        }
    },
    cardStyleInterpolator: ({current: {progress}}) =>{
        return {
            cardStyle: {
                opacity: progress
            }
        }
    }
}

import utils from "../../utils";
import screen_components from "../../utils/screen_components";

const AuthStack = (props) =>{

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerMode: 'none',
                presentation: 'card',
                useNativeDriver: true,
            }}
            //initialRouteName="Rex"
            detachInactiveScreens={false}
        >
            <Stack.Screen name={utils.screens.login} component={screen_components.Login} options={()=> options}/>
            <Stack.Screen name={utils.screens.forgot_password} component={screen_components.ForgotPassword} options={()=> options}/>
        </Stack.Navigator>
    )
}

export default AuthStack
