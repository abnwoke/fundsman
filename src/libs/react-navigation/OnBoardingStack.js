import React, {useState} from "react";
import { Easing } from 'react-native'
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

const Stack = createSharedElementStackNavigator();
const options = {
    gestureEnabled: false,
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

const OnBoardingStack = (props) =>{

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
            <Stack.Screen name={utils.screens.on_boarding} component={screen_components.OnBoarding} options={()=> options}/>
        </Stack.Navigator>
    )
}

export default OnBoardingStack
