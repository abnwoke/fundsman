
//import {Pagination} from "react-native-snap-carousel";
import React from "react";
import {useTheme} from "@react-navigation/native";

import {
    View,
} from 'react-native';


const SliderPaginationUI = ({length = 0, index = 0}) => {
    const { colors, sizes, fonts } = useTheme();


    return (
        <View>

            <View
               style={{
                   flexDirection: 'row',
                   justifyContent: 'center'
               }}
            >
                {[...new Array(length).keys()].map((p,i)=>(
                    <View
                      key={i}
                      style={{
                          backgroundColor: index === i? colors.primary : colors.gray5,
                          width: index === i? 30 : 8,
                          height: index === i? 8 : 8,
                          borderRadius: 100,
                          marginHorizontal: 3
                      }}
                    />
                ))}
            </View>

            {/*<Pagination
                //animatedDuration={0}
                dotsLength={length}
                activeDotIndex={index}
                containerStyle={{
                    //backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    marginHorizontal: 0,
                    paddingVertical: 0,
                }}
                dotStyle={{
                    width: 30,
                    height: 6,
                    borderRadius: 5,
                    marginHorizontal: -7,
                    backgroundColor: colors.primary
                }}
                inactiveDotStyle={{
                    width: 11,
                    height: 11,
                    borderRadius: 100,
                    backgroundColor: colors.gray9
                }}
                inactiveDotOpacity={0.8}
                inactiveDotScale={0.6}
            />*/}
        </View>
    )
}

export default SliderPaginationUI
