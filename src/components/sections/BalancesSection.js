import {Text, View, TouchableOpacity} from "react-native";
import utils from "../../utils";
import React from "react";
import {useTheme} from "@react-navigation/native";


const BalancesSection = ({onPress, containerStyle, hideLabel= false}) => {
    const {colors, sizes, fonts} = useTheme();


    const Balance = ({label, value, point, borderWidth=1.5}) =>{
        return(
            <View
                style={{
                    borderBottomWidth: borderWidth,
                    borderBottomColor: colors.gray4,
                    paddingBottom: 5,
                    paddingTop: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >

                <View>
                    <Text
                        style={{
                            color: colors.gray9,
                            fontFamily: utils.fonts.PlusJakartaSansMedium,
                            fontSize: 14,
                            marginBottom: 3
                            //lineHeight: 15
                        }}
                    >{label}</Text>

                    <Text
                        style={{
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansBold,
                            fontSize: utils.isIOS ? 17 : 16,
                            lineHeight: utils.isIOS ? 19 : 17
                        }}
                    >{value}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            marginRight: 4,
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansBold,
                            fontSize: 13,
                        }}
                    >{point}</Text>

                    <Text
                        style={{
                            color: colors.black,
                            fontFamily: utils.fonts.PlusJakartaSansMedium,
                            fontSize: 13,
                        }}
                    >Point</Text>
                </View>

            </View>
        )
    }

    return(
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={{
                //flexDirection: 'row',
                //justifyContent: 'space-between',
                //alignItems: 'flex-end',
                paddingHorizontal: 15,
                paddingVertical: 8,
                ...containerStyle
            }}
        >

            {!hideLabel &&
                <Text
                    style={{
                        color: colors.black,
                        fontFamily: utils.fonts.PlusJakartaSansBold,
                        fontSize: 16,
                        marginBottom: 5,
                        marginTop: 2,
                        //lineHeight: 15
                    }}
                >Accounts</Text>
            }

            <Balance label="USDT" value="$ 243,575,889" point={5489} />
            <Balance label="NGN" value="₦ 243,575,889" point={45454}/>
            <Balance label="GHS" value="₵ 243,575,889" point={9877} borderWidth={0}/>
        </TouchableOpacity>
    )
}

export default BalancesSection