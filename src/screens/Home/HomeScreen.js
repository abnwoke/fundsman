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
import HomeBalanceSection from "../../components/sections/HomeBalanceSection";
import HomePayBillsSection from "../../components/sections/HomePayBillsSection";
import HomeBuyGiftCardsSection from "../../components/sections/HomeBuyGiftCardsSection";
//import ScreenLoading from "../../components/sections/ScreenLoading";
import Home from "./Home";

const HomeScreen = ({navigation}) => {
    //const {isActive} = useScreenIsActive();
    const isFocused = useIsFocused();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const {colors, sizes, fonts} = useTheme();


    console.log("-------------------------------------------------------------")
    console.log("Home: " + isFocused);


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <MainHeader/>

            {isFocused && <Home />}


            <MainFooter
                screen={utils.screens.home}
            />

        </View>
    );
}


export default HomeScreen