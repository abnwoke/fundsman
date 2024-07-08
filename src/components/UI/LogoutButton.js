import {Image, ScrollView, Text, TouchableOpacity} from "react-native";
import React, {memo} from "react";
import {useDispatch} from "react-redux";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";
import Auth from '../../modules/auth';

const LogoutButton = (props) =>{
    const {
        containerStyle
    } = props
    const { colors, sizes, fonts } = useTheme();
    const dispatch = useDispatch()

    const logout = () =>{
         dispatch(Auth.actions.logout());
    }


    return(
        <TouchableOpacity
            onPress={logout}
            activeOpacity={0.5}
            style={{
                flex: 1,
                marginHorizontal: sizes.padding,
                marginTop: 5,
                marginBottom: 5,
                alignItems: "flex-start",
                paddingVertical: 10,
                paddingBottom: 8,
                borderRadius: sizes.radius,
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            <Image
                source={utils.icons.logout}
                style={{
                    width: 25,
                    height: 25,
                    marginRight: 15,
                    tintColor: colors.red
                }}
            />
            <Text
                style={{
                    fontFamily: fonts.poppinsMedium,
                    fontSize: 15,
                    color: colors.red
                }}
            >LOG OUT</Text>
        </TouchableOpacity>
    )
}

export default memo(LogoutButton)
