import React, {useState} from "react";
import { Easing } from 'react-native'
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import utils from "../../utils";



const Stack = createNativeStackNavigator();
const options = {
    /*gestureEnabled: utils.isIOS,
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
    }*/
}


import screen_components from "../../utils/screen_components";


const MainStack = (props) =>{

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

            <Stack.Screen name={utils.screens.home} component={screen_components.Home} options={()=> options}/>
            <Stack.Screen name={utils.screens.topup} component={screen_components.Topup} options={()=> options}/>
            <Stack.Screen name={utils.screens.withdraw} component={screen_components.Withdraw} options={()=> options}/>
            <Stack.Screen name={utils.screens.send} component={screen_components.Send} options={()=> options}/>
            <Stack.Screen name={utils.screens.finance} component={screen_components.Finance} options={()=> options}/>
            <Stack.Screen name={utils.screens.crypto} component={screen_components.Crypto} options={()=> options}/>
            <Stack.Screen name={utils.screens.history} component={screen_components.History} options={()=> options}/>
            <Stack.Screen name={utils.screens.gift_cards} component={screen_components.GiftCards} options={()=> options}/>
            <Stack.Screen name={utils.screens.gift_card_trade} component={screen_components.GiftCardTrade} options={()=> options}/>
            <Stack.Screen name={utils.screens.bills} component={screen_components.Bills} options={()=> options}/>
            <Stack.Screen name={utils.screens.menu} component={screen_components.Menu} options={()=> options}/>
            <Stack.Screen name={utils.screens.money} component={screen_components.Money} options={()=> options}/>

            <Stack.Screen name={utils.screens.account} component={screen_components.Account} options={()=> options}/>


            {/*<Stack.Screen name={utils.screens.login} component={screen_components.Login} options={()=> options}/>
            <Stack.Screen name={utils.screens.forgot_password} component={screen_components.ForgotPassword} options={()=> options}/>*/}


        </Stack.Navigator>
    )
}

export default MainStack
