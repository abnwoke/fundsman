import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";

import React from "react";

import DividerUI from "../../components/UI/DividerUI";
import MenuUI from "../../components/UI/MenuUI";
//import { Switch } from 'react-native-elements';
import LogoutButton from "../../components/UI/LogoutButton";
import {useDispatch, useSelector} from "react-redux";
//import appActions from "../../modules/app/appActions";

import AuthProfile from "../../components/UI/AuthProfile";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const DrawerContent = (props) => {

    const {navigation, route } = props;
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const screen = navigation.getState().routes[navigation.getState().index].name;
    const photo = user.photo? {uri: user.photo} : utils.images.user
    const { colors, sizes, fonts } = useTheme();


    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{
                flex: 1,
            }}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <AuthProfile />

                <DividerUI />

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.home)}}
                    icon={utils.icons.home_outline}
                    title={"Home"}
                    active={utils.screens.home === screen}
                    //description="Home feeds, posts"

                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.properties)}}
                    icon={utils.icons.property_outline}
                    title={"Properties"}
                    active={utils.screens.properties === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.favourites)}}
                    active={utils.screens.favourites === screen}
                    icon={utils.icons.heart_outline}
                    title={"Favourites"}
                    //description="Home feeds, posts"

                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />


                <MenuUI
                    icon={utils.icons.calendar}
                    title="Appointments"
                    //description="Home feeds, posts"
                    active={utils.screens.appointments === screen}
                    onPress={() => {navigation.navigate(utils.screens.appointments)}}
                    iconStyle={{
                        height: 23,
                        width: 23,
                    }}
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />


                <MenuUI
                    icon={utils.screens.profile === screen ? utils.icons.user_filled : utils.icons.user_outline}
                    title="Account"
                    //description="Home feeds, posts"
                    active={utils.screens.profile === screen}
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                    onPress={() => {navigation.navigate(utils.screens.profile)}}
                />

                {/*<MenuUI
                    onPress={() => {navigation.navigate(utils.screens.messages)}}
                    icon={utils.screens.messages === screen ? utils.icons.mode_comment_filled : utils.icons.mode_comment_outline}
                    active={utils.screens.messages === screen}
                    title={"Messages (0)"}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}


                <MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.reminders)
                    }}
                    active={utils.screens.reminders === screen}
                    icon={utils.screens.reminders === screen ? utils.icons.note_filled : utils.icons.note_outline}
                    title={"Reminders"}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />



                {/*<MenuUI
                    icon={utils.screens.estate_news === screen ? utils.icons.radio_filled : utils.icons.radio_outline}
                    title="Estate News"
                    //description="Home feeds, posts"
                    active={utils.screens.estate_news === screen}
                    onPress={() => {
                        //navigation.navigate(utils.screens.schedules)
                    }}
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}


                {/*<MenuUI
                    icon={utils.screens.notepad === screen ? utils.icons.notebook_filled : utils.icons.notebook_outline}
                    title="Notepad"
                    //description="Home feeds, posts"
                    active={utils.screens.notepad === screen}
                    onPress={() => {
                        //navigation.navigate(utils.screens.schedules)
                    }}
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}







                <DividerUI />

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.wallet)}}
                    icon={utils.screens.wallet === screen ? utils.icons.wallet_filled : utils.icons.wallet_outline}
                    title={"Wallet"}
                    active={utils.screens.wallet === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />

                {/*<MenuUI
                    onPress={() => {navigation.navigate(utils.screens.withdraw)}}
                    icon={utils.screens.withdraw === screen ? utils.icons.withdraw_fill : utils.icons.withdraw_outline}
                    title={"Withdraw"}
                    active={utils.screens.withdraw === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.payment_methods)}}
                    icon={utils.screens.payment_methods === screen ? utils.icons.mobile_banking_fill : utils.icons.mobile_banking_outline}
                    title={"MOMO/Banks"}
                    active={utils.screens.payment_methods === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />

                {/*<DividerUI />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.expenses_utilities === screen ? utils.icons.expenses_filled : utils.icons.expenses_outline}
                    title={"Expenses/Utilities"}
                    active={utils.screens.expenses_utilities === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}§
                />*/}


                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.advertisement_tools === screen ? utils.icons.ad_filled : utils.icons.ad_outline}
                    title={"Advertisement Tools"}
                    active={utils.screens.advertisement_tools === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.referrals === screen ? utils.icons.users_plus_filled : utils.icons.users_plus_outline}
                    title={"Referrals"}
                    active={utils.screens.referrals === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.reports === screen ? utils.icons.shield_exclamation_filled : utils.icons.shield_exclamation_outline}
                    title={"Reports"}
                    active={utils.screens.reports === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.documents === screen ? utils.icons.document_filled : utils.icons.document_outline}
                    title={"Documents"}
                    active={utils.screens.documents === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.suppliers === screen ? utils.icons.data_transfer_filled : utils.icons.data_transfer_outline}
                    title={"Suppliers"}
                    active={utils.screens.suppliers === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/*<MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.contact_Us === screen ? utils.icons.headset_filled : utils.icons.headset_outline}
                    title={"Contact us"}
                    active={utils.screens.contact_Us === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                {/* <MenuUI
                    onPress={() => {
                        //navigation.navigate(utils.screens.payment_methods)
                    }}
                    icon={utils.screens.subscriptions === screen ? utils.icons.box_filled : utils.icons.box_outline}
                    title={"Subscriptions"}
                    active={utils.screens.subscriptions === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}




                {/*<MenuUI
                    onPress={() => {navigation.navigate(utils.screens.payments)}}
                    icon={utils.screens.payments === screen ? utils.icons.payment_fill : utils.icons.payment_outline}
                    title={"Payments"}
                    active={utils.screens.payments === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                <DividerUI />


                {/*<MenuUI
                    onPress={() => {navigation.navigate(utils.screens.settings)}}
                    icon={utils.screens.settings === screen ? utils.icons.user_settings_fill : utils.icons.user_settings_outline}
                    title={"Settings"}
                    active={utils.screens.settings === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />*/}

                <MenuUI
                    onPress={() => {navigation.navigate(utils.screens.change_password)}}
                    icon={utils.screens.change_password === screen ? utils.icons.secure_fill : utils.icons.secure_outline}
                    title={"Change password"}
                    active={utils.screens.change_password === screen}
                    //description="Home feeds, posts"
                    containerStyle={{
                        //borderBottomWidth: 0
                    }}
                />

                <LogoutButton />

            </ScrollView>



        </DrawerContentScrollView>
    )
}

export default DrawerContent
