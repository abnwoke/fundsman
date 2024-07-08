

import {useNavigation, useTheme} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import utils from "../../utils";
import {Image} from "expo-image";
import React from "react";

const ExchangerWidget = ({onPress, title, picture, bg,  data}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation()


    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                alignItems: 'center',
                //padding: 10,
                borderRadius: 8,
                //paddingHorizontal: 15,
                //paddingVertical: utils.isIOS ? 12 : 11,
                marginBottom: 8,
                backgroundColor: colors.gray1,
                flexDirection: 'row'
            }}
            onPress={onPress}
        >

           <View
              style={{
                  backgroundColor: bg,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 18,
                  flexDirection: 'row',
                  alignItems: 'center'
              }}
           >
               <Image
                   source={data?.picture}
                   style={{
                       width: utils.isIOS? 40:35,
                       height: utils.isIOS? 40:35,
                       marginRight: 8
                   }}
               />
               <View

               >
                   <Text
                       style={{
                           color: colors.black,
                           fontFamily: utils.fonts.PlusJakartaSansMedium,
                           fontSize: utils.isIOS ? 16 : 14,
                           lineHeight: 17,
                           marginTop: utils.isAndroid ? 4 : 3
                       }}
                   >{data?.first_name} {data?.last_name}</Text>
                   <View
                     style={{
                         flexDirection: 'row',
                         alignItems: 'center'
                     }}
                   >
                       <View style={{
                           backgroundColor: data?.online? colors.success : colors.gray5,
                           width: 10,
                           height: 10,
                           borderRadius: 50,
                           marginRight: 5
                       }} />
                       <Text
                           style={{
                               color: colors.black,
                               fontFamily: utils.fonts.PlusJakartaSansMedium,
                               fontSize: utils.isIOS ? 14 : 13,
                               lineHeight: 14,
                               marginTop: utils.isAndroid ? 4 : 3
                           }}
                       >{data?.online? 'Online': 'Offline'}</Text>
                   </View>
               </View>
           </View>


            <View>
                <Text
                    style={{
                        color: colors.black,
                        fontFamily: utils.fonts.PlusJakartaSansMedium,
                        fontSize: utils.isIOS ? 15 : 14,
                        //lineHeight: 14.5,
                        marginTop: utils.isAndroid ? 4 : 3
                    }}
                >{title}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ExchangerWidget