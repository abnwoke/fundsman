import React, {Fragment, useCallback, useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../../utils";

import InputUI from "../../../components/UI/InputUI";
import PickerUI from "../../../components/UI/PickerUI";

import {
    Card
} from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ExchangeRate from "../../../components/sections/ExchangeRate";

const Sell = (props) => {
    const navigation = useNavigation();
    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const [tab, setTab] = useState("send");

    const [email, setEmail] = useState({value: '', isValid: false, action: '', error: ''});
    const [email1, setEmail1] = useState({value: '', isValid: false, action: '', error: ''});
    const [email2, setEmail2] = useState({value: '', isValid: false, action: '', error: ''});
    const [email3, setEmail3] = useState({value: '', isValid: false, action: '', error: ''});

    //const new_listing_properties = useSelector((state) => state?.property.new_listing_properties);

    //console.log(new_listing_properties)


    /*useFocusEffect(
        useCallback(() => {
            dispatch(Property.actions.getNewListingProperties({
                token: auth.token,
                limit: 4,
            }));
        }, [])
    );*/







    return (
        <Fragment>




            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingBottom: 1000,
                    flex: 1,
                    paddingHorizontal: utils.sizes.containerPadding
                }}
            >


                <View
                    style={{
                        paddingVertical: 20
                    }}
                >

                    <PickerUI
                        value={email3}
                        label='Crypto'
                        showLabel={true}
                        placeholder='Crypto currency to sell'
                        title='Crypto surrency to sell'
                        fieldStyle="fill"
                        returnValue="slug"
                        returnLabel="name"
                        data={[
                            {slug: "Bitcoin", name: 'Bitcoin'},
                            {slug: "USDT", name: 'USDT'},
                        ]}
                        searchPlaceholder="Search Crypto"
                        floatingPlaceholder={true}
                        customFieldStyle={{
                            //paddingTop: 0,
                            //paddingBottom: 0,
                            //height: 30
                        }}
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail3}
                    />

                    <PickerUI
                        value={email3}
                        label='Currency'
                        showLabel={true}
                        placeholder='Currency to receive'
                        title='Currency to receive'
                        fieldStyle="fill"
                        returnValue="slug"
                        returnLabel="name"
                        data={[
                            {slug: "Naira", name: 'Naira'},
                            {slug: "Cedis", name: 'Cedis'},
                        ]}
                        searchPlaceholder="Search Currency"
                        floatingPlaceholder={true}
                        customFieldStyle={{
                            //paddingTop: 0,
                            //paddingBottom: 0,
                            //height: 30
                        }}
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail3}
                    />


                    <InputUI
                        value={email}
                        label='Amount'
                        keyboardType='numeric'
                        placeholder='Amount'
                        fieldStyle='fill'
                        floatingPlaceholder={true}
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail}
                    />


                    <ExchangeRate />


                    <Text
                        style={{
                            ...utils.style.h1,
                            fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                            marginTop: 20
                        }}
                    >
                        Receiving Payment Details
                    </Text>


                    {/*<InputUI
                        value={email}
                        label='Email'
                        placeholder='Email'
                        contentType='email'
                        keyboardType='email-address'
                        fieldStyle="fill"
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail}
                    />

                    <InputUI
                        value={email1}
                        label='Email'
                        placeholder='Email'
                        contentType='email'
                        keyboardType='email-address'
                        fieldStyle="fill"
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail1}
                    />

                    <InputUI
                        value={email2}
                        label='Email'
                        placeholder='Email'
                        contentType='email'
                        keyboardType='email-address'
                        fieldStyle="fill"
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={setEmail2}
                    />*/}


                </View>


                <View style={{height: utils.isIOS ? 350 : 400}}/>
            </ScrollView>
        </Fragment>
    )
}

export default Sell
