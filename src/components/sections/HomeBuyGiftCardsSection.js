import {
    View, Text, TouchableOpacity,
} from 'react-native';
import {Image} from 'expo-image';

import {
    Card
} from "react-native-ui-lib";

import {useNavigation, useTheme} from "@react-navigation/native";
import utils from "../../utils";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import React, {useRef, useState} from "react";
import SliderPaginationUI from "../UI/SliderPaginationUI";

import Carousel from 'react-native-reanimated-carousel';

const HomeBuyGiftCardsSection = ({}) => {
    const {colors, sizes, fonts} = useTheme();
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();

    const height = utils.isIOS? 170 : 140;

    const Widget = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                //elevation={4}
                style={{
                    width: utils.sizes.width - (sizes.containerPadding * 2),
                    marginTop: 10
                }}
                onPress={()=>{

                }}
            >
                <Image
                   source={item.image}
                   style={{
                       width: "100%",
                       height: height,
                   }}
                   contentFit="fill"
                />
            </TouchableOpacity>
        )
    }

    const data = [
        {slug: "1", image: utils.images.banner3},
        {slug: "1", image: utils.images.banner1},
        {slug: "1", image: utils.images.banner2},
        {slug: "1", image: utils.images.banner4},
        {slug: "1", image: utils.images.banner5},
    ]

    return (
        <View
            style={{
                marginHorizontal: utils.sizes.containerPadding,
                marginTop: utils.isIOS? 15 : 10
            }}
        >




            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center",
                    marginBottom: 2
                }}
            >

                <Text
                    style={{
                        ...utils.style.h1
                    }}
                >
                    Buy Gift Cards
                </Text>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{}}
                    onPress={() => {
                        navigation.navigate(utils.screens.gift_cards)
                    }}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontFamily: utils.fonts.PlusJakartaSansSemiBold,
                            fontSize: utils.isIOS ? 14 : 12
                        }}
                    >
                        View All
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    //flexDirection: 'row',
                    //justifyContent: 'space-between',
                    //flexWrap: "wrap",
                    //marginTop: 12
                }}
            >
                <Carousel
                    ref={carouselRef}
                    defaultIndex={activeIndex}
                    loop={true}
                    snapEnabled={true}
                    enabled={true}
                    width={utils.sizes.width}
                    //height={170}
                    style={{
                        width: utils.sizes.width,
                        height: height+15
                    }}
                    modeConfig={{
                        //parallaxScrollingScale: 0.9,
                        //parallaxScrollingOffset: 50,
                    }}
                    autoPlay={false}
                    data={data || []}
                    scrollAnimationDuration={120}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={Widget}
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                >
                    <SliderPaginationUI
                        length={data?.length}
                        index={activeIndex}
                    />
                </View>

            </View>


        </View>
    )
}

export default HomeBuyGiftCardsSection