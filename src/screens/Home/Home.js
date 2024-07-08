import React, {Fragment, useCallback, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";
import HomeBalanceSection from "../../components/sections/HomeBalanceSection";
import HomePayBillsSection from "../../components/sections/HomePayBillsSection";
import HomeBuyGiftCardsSection from "../../components/sections/HomeBuyGiftCardsSection";
import HomeExchangerSection from "../../components/sections/HomeExchangerSection";
import HomeActionSection from "../../components/sections/HomeActionSection";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const Home = (props) => {
    const navigation = useNavigation();
    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const [refreshing, setRefreshing] = React.useState(false);

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


    const scrollViewRef = useRef()
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })


    const onRefresh = async () => {
        setRefreshing(true)

       /* await dispatch(Property.actions.getNewListingProperties({
            token: auth.token,
            limit: 4,
        }));

        await dispatch(Property.actions.getFeaturedProperties({
            token: auth.token,
            limit: 4,
        }));*/

        setRefreshing(false)
    }

    const refresh = async () => {

    }

    const HeaderComponent = () => {
        return (
            <Fragment>





            </Fragment>
        )
    }


    return (
        <Fragment>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingBottom: 1000,
                    flex: 1
                }}
            >


                <HomeBalanceSection/>


                <HomeActionSection
                   title="Money"
                   menu={[
                       {
                           color:colors.success,
                           title:"Receive",
                           iconName:"hand-holding-usd",
                           Icon:FontAwesome5,
                           onPress: () => navigation.navigate(utils.screens.money, {tab: 'receive'})
                       },
                       {
                           color: colors.danger,
                           title: "Send",
                           iconName: "paper-plane",
                           Icon: FontAwesome,
                           onPress: () => navigation.navigate(utils.screens.money, {tab: 'send'})
                       }
                   ]}
                />

                <HomeActionSection
                    title="Crypto Currency"
                    menu={[
                        {
                            color:colors.success,
                            title:"Buy",
                            iconName:"angle-double-down",
                            Icon:FontAwesome5,
                            onPress: () => navigation.navigate(utils.screens.crypto, {tab: 'buy'})
                        },
                        {
                            color: colors.danger,
                            title: "Sell",
                            iconName: "angle-double-up",
                            Icon: FontAwesome5,
                            onPress: () => navigation.navigate(utils.screens.crypto, {tab: 'sell'})
                        }
                    ]}
                />


                <HomeActionSection
                    title="Gift Card"
                    menu={[
                        {
                            color:colors.success,
                            title:"Buy",
                            iconName:"angle-double-down",
                            Icon:FontAwesome5,
                            onPress: () => navigation.navigate(utils.screens.gift_card_trade, {tab: 'buy'})
                        },
                        {
                            color: colors.danger,
                            title: "Sell",
                            iconName: "angle-double-up",
                            Icon: FontAwesome5,
                            onPress: () => navigation.navigate(utils.screens.gift_card_trade, {tab: 'sell'})
                        }
                    ]}
                />


                <HomeExchangerSection />

                {/*<HomePayBillsSection/>*/}

                {/*<HomeBuyGiftCardsSection/>*/}

                <View style={{height: utils.isIOS? 350 : 400}} />
            </ScrollView>
        </Fragment>
    )
}

export default Home
