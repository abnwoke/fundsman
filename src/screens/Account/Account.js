import React, {Fragment, useCallback, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";
import ProfileSection from "./sections/ProfileSection";
import ProfileDetailSection from "./sections/ProfileDetailSection";
import MenuSection from "../../components/sections/MenuSection";
import BalancesSection from "../../components/sections/BalancesSection";


const Account = (props) => {
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

                <ProfileSection/>


                <BalancesSection
                    hideLabel={true}
                    containerStyle={{
                        marginHorizontal: 5,
                        marginBottom: 10
                    }}
                />

                <ProfileDetailSection
                   label="Username"
                   value="@abnwoke"
                />

                <ProfileDetailSection
                    label="Account Number"
                    value="798558756798"
                />

                <ProfileDetailSection
                    label="Account Name"
                    value="Abraham Nwoke"
                />

                <View
                    style={{
                        marginTop: 15
                    }}
                >
                    <MenuSection label="Email" value="abrahamnwoke@gmail.com" />
                    <MenuSection label="Phone Number" value="+233 244491485" />
                    <MenuSection label="Addrress" value="Accra, Ghana, Eleme" />
                    <MenuSection label="Country" value="Ghana" />
                    <MenuSection label="State" value="Accra" />
                    <MenuSection label="City" value="Greater Accra" />
                    <MenuSection label="Marital Status" value="Single" />
                    <MenuSection label="Next of kin" value="Not Set" />
                </View>


                <View style={{height: utils.isIOS ? 350 : 400}}/>
            </ScrollView>
        </Fragment>
    )
}

export default Account
