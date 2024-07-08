import React, {Fragment, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, ScrollView, Dimensions} from 'react-native';


import {View, GridList} from "react-native-ui-lib";

import {useDispatch, useSelector} from 'react-redux'
import Footer from "../components/footer/MainFooter";

import MainHeader from "../components/header/MainHeader";
import NotificationWidget from "../components/widget/NotificationWidget";
const width = Dimensions.get('window').width;
import useSWRInfinite from "swr/infinite";
import notificationsServices from "../modules/notifications/notificationsServices";
import userActions from "../modules/user/userActions";
import utils from "../utils";
import {useTheme} from "@react-navigation/native";

const FeedScreen = (props) => {
    const {colors, sizes, fonts} = useTheme();
    const {navigation,} = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const auth = useSelector((state) => state.auth)
    const token = useSelector((state) => state.auth.token);

    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);


    const [refreshing, setRefreshing] = React.useState(false);

    const limit = 1000
    const key = ({limit = limit, page = 1}) => {
        const all_query = `limit=${limit}&page=${[page]}`
        return notificationsServices.keys({slug: user?.slug}).getNotifications;
    }

    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return key({
            limit: limit,
            page: pageIndex,
        }); // SWR key
    }

    const options = {
        //suspense: true,
    }

    const fetcher = async url => {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
        });
        return await response.json();
    };

    const {data, error, size, setSize, isLoading, isValidating, mutate} = useSWRInfinite(getKey, fetcher, options);
    const [notifications, setNotifications] = useState(data ? [].concat(...data) : []);


    useEffect(() => {
        if (isMounted.current) {
            if (!refreshing) {
                setNotifications(data ? [].concat(...data) : [])
            }
        }
    }, [data, isLoading, isValidating])


    useEffect(()=>{
        return ()=>{
            notificationsServices.updateNotificationSeen({slug: user?.slug, token}).then(res=>{
                dispatch(userActions.updateUser())
                console.log(res)
            }).catch(e=>{})
        }
    },[])


    console.log(notifications)
    //console.log(error)




    //console.log("")
    //console.log(user.isDelegate)
    //console.log(user.auth_account)


    const [state, setState] = useState({
        loading: true,
        refreshing: false,
        error: true,
    });

    const isDelegate = user.isDelegate

    const Feed = () => {
        return (
            <View>

                <NotificationsSection/>

            </View>
        )
    }


    return (
        <View
            style={{
                backgroundColor: colors.background,
                flex: 1,
                height: '100%'
                //paddingVertical: 30
            }}
        >


            <MainHeader
                title={"Notifications"}
                isBack={true}
            />


            <GridList
                numColumns={1}
                style={{
                    paddingTop: 10,
                    paddingHorizontal: sizes.containerPadding

                }}
                itemSpacing={8}
                data={notifications}
                renderItem={(notification) =>
                    <NotificationWidget
                        notification={notification.item}
                        containerStyle={{
                            width: width - (sizes.containerPadding * 2.1)
                        }}
                    />
                }
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                keyExtractor={item => item._id}
                refreshing={state.refreshing}
                onRefresh={() => {

                }}
                contentContainerStyle={{}}
                ListFooterComponent={
                    <View style={{paddingBottom: 15}}>
                    </View>
                }
            />


            <Footer
                screen={utils.screens.notifications}
                navigation={navigation}
                section="agent"
            />

        </View>
    )
}

export default FeedScreen
