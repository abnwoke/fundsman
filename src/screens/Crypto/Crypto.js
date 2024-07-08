import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";
import NavTap from "../../components/sections/NavTap";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Sell from "./section/Sell";
import Buy from "./section/Buy";


const Crypto = (props) => {
    const navigation = useNavigation();
    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const [tab, setTab] = useState(props.tab || "buy");


    return (
        <Fragment>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <NavTap
                    name="Buy"
                    color={colors.success}
                    iconName={"angle-double-down"}
                    Icon={FontAwesome5}
                    active={tab === "buy"}
                    onPress={() => {
                        setTab("buy")
                    }}
                />
                <NavTap
                    name="Sell"
                    color={colors.danger}
                    iconName={"angle-double-up"}
                    Icon={FontAwesome5}
                    active={tab === "sell"}
                    onPress={() => {
                        setTab("sell")
                    }}
                />
            </View>

            {tab === 'sell' &&  <Sell />}
            {tab === 'buy' &&   <Buy />}

        </Fragment>
    )
}

export default Crypto
