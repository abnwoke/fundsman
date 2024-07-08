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
import Withdraw from "./Withdraw";

const WithdrawScreen = ({navigation}) => {
    //const {isActive} = useScreenIsActive();
    const isFocused = useIsFocused();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();


    console.log("-------------------------------------------------------------")
    console.log("Withdraw: " + isFocused);


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <MainHeader isBack title="Withdraw"/>

            {isFocused && <Withdraw />}


            <MainFooter
                screen={utils.screens.topup}
            />

        </View>
    );
}


export default WithdrawScreen