import React, {Fragment, useCallback, useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";

import InputUI from "../../components/UI/InputUI";
import PickerUI from "../../components/UI/PickerUI";

import {
    Card
} from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Send from "./Section/Send";
import Receive from "./Section/Receive";
import NavTap from "../../components/sections/NavTap";

const Money = (props) => {
    const navigation = useNavigation();
    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const [tab, setTab] = useState(props.tab || "send");



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
                    name="Send"
                    color={colors.danger}
                    iconName={"paper-plane"}
                    Icon={FontAwesome}
                    active={tab === "send"}
                    onPress={() => {
                        setTab("send")
                    }}
                />
                <NavTap
                    name="Receive"
                    color={colors.success}
                    iconName={"hand-holding-usd"}
                    Icon={FontAwesome5}
                    active={tab === "receive"}
                    onPress={() => {
                        setTab("receive")
                    }}
                />
            </View>

            {tab === 'send' &&  <Send />}
            {tab === 'receive' &&   <Receive />}

        </Fragment>
    )
}

export default Money
