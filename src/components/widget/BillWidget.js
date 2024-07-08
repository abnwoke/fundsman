import {useNavigation, useTheme} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import utils from "../../utils";
import {Image} from "expo-image";
import React from "react";

const BillWidget = ({onPress, title, icon, bg, color}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation()


    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                alignItems: 'center',
                //padding: 10,
                width: "30%",
                borderRadius: 8,
                //paddingHorizontal: 15,
                //paddingVertical: utils.isIOS ? 12 : 11,
                marginBottom: 17,
                //backgroundColor: "red"
            }}
            onPress={onPress}
        >

           <View
              style={{
                  backgroundColor: bg,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 18
              }}
           >
               <Image
                   source={icon}
                   style={{
                       width: utils.isIOS? 35:30,
                       height: utils.isIOS? 35:30,
                   }}
               />
           </View>


            <Text
                style={{
                    color: colors.black,
                    fontFamily: utils.fonts.PlusJakartaSansMedium,
                    fontSize: utils.isIOS ? 14 : 13,
                    //lineHeight: 14.5,
                    marginTop: utils.isAndroid ? 4 : 3
                }}
            >{title}</Text>

        </TouchableOpacity>
    )
}

export default BillWidget