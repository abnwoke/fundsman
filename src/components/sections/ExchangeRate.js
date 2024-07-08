import React, {Fragment, useCallback, useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";


import {
    Card
} from "react-native-ui-lib";
import utils from "../../utils";



const ExchangeRate = ({}) => {

    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);



    return (

        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.gray4,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 8
            }}
        >
           <Text
             style={{
                 fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                 fontSize: 15
             }}
           >GHS 1 = NGN 100 </Text>
        </View>
    )
}

export default ExchangeRate
