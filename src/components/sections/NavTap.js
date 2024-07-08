import {Card} from "react-native-ui-lib";
import utils from "../../utils";
import {Text} from "react-native";
import React from "react";
import {useTheme} from "@react-navigation/native";




const NavTap = ({name, onPress, Icon, iconName, color, active}) => {
    const {colors, sizes, fonts} = useTheme();

    return (
        <Card
            onPress={onPress}
            activeOpacity={0.5}
            style={{
                //backgroundColor: 'red',
                flex:  1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
                paddingVertical: utils.isIOS? 10 : 8,
                borderRadius: 0,
                borderBottomWidth: 1.5,
                borderBottomColor: active? colors.primary : 'white',
                backgroundColor: active? colors.primaryTransparent10 : 'white',
                elevation: active? 0 : 4,
                flexDirection: 'row',
            }}
        >
            <Icon name={iconName} size={utils.isIOS ? 18 : 15} color={color}/>
            <Text
                style={{
                    marginLeft: 10
                }}
            >{name}</Text>
        </Card>
    )
}


export default NavTap