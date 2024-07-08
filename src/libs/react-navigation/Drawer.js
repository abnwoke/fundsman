import React from "react";
import { useWindowDimensions } from 'react-native';


import {createDrawerNavigator} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

import DrawerContent from "./DrawerContent";



//Screens
import MainStack from './MainStack'

const Drawers = () =>{
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return(
        <Drawer.Navigator
            initialRouteName="Rex"
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                drawerType: 'front',  // front | back | slide | permanent
                swipeEnabled: false,
                headerShown: false,
                //drawerType: isLargeScreen ? 'permanent' : 'back',
                //drawerStyle: isLargeScreen ? null : { width: '100%' },
                //overlayColor: 'transparent',
                //presentation: 'modal',
                //headerMode: 'none'
                //presentation: 'modal'
            }}
        >
            <Drawer.Screen name="Rex" component={MainStack}/>
        </Drawer.Navigator>
    )
}

export default Drawers