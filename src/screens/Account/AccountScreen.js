import React, {useState, useEffect, useRef, Fragment, memo} from 'react';

import {
    View, Text
} from 'react-native';

import {useIsFocused, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {GridList} from "react-native-ui-lib";
import utils from "../../utils";
import MainHeader from "../../components/header/MainHeader";
import MainFooter from "../../components/footer/MainFooter";
//import ScreenLoading from "../../components/sections/ScreenLoading";
import Account from "./Account";

const AccountScreen = ({navigation}) => {
    //const {isActive} = useScreenIsActive();
    const isFocused = useIsFocused();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();


    console.log("-------------------------------------------------------------")
    console.log("Profile: " + isFocused);


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <MainHeader isBack title="Account"/>

            {isFocused && <Account />}


            <MainFooter
                screen={utils.screens.profile}
            />

        </View>
    );
}


export default AccountScreen