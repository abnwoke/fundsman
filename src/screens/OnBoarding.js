import React, {useState, useEffect, useRef, Fragment} from 'react';

import {
    Text,
    View,
    Button,
    SafeAreaView,
    ImageBackground,
    StatusBar,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";

import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RNBounceable from "@freakycoder/react-native-bounceable";
import SliderPaginationUI from "../components/UI/SliderPaginationUI";
import LogoSection from "../components/sections/LogoSection";


import utils from "../utils";
import App from "../modules/app";

//0274874239   111 504

export default function Main({navigation}) {

    const [sliderIndex, setSliderIndex] = useState(0);
    const carouselRef = useRef(null);
    const dispatch = useDispatch();


    const app = useSelector((state) => state.app);
    const { colors, sizes, fonts } = useTheme();


    const data = [
        {
            img: utils.images.onboarding1,
            useImg1: true,
            colors: {},
        },
        {
            img: utils.images.onboarding2,
            useImg2: true,
            colors: {},
        },
        {
            img: utils.images.onboarding3,
            useImg2: true,
            colors: {},
        },
    ];




    const Content = ({title, description, description1, description2, description3, index}) => {

        const DescriptionText = ({ text, containerStyle}) =>{
            return(
                <Text
                    style={{
                        color: colors.text,
                        fontFamily: fonts.kronaOneRegular,
                        fontSize: 15,
                        textAlign: 'center',
                        paddingHorizontal: 30,
                        marginTop: 10,
                        ...containerStyle,
                    }}
                >{text}</Text>
            )
        }

        return (
            <View
                style={{
                    zIndex: 9999999,
                    flex: 1
                }}
            >

                {title &&
                    <Text
                        style={{
                            color: colors.white,
                            marginBottom: 3,
                            fontFamily: fonts.poppinsSemiBold,
                            fontSize: 30
                        }}
                    >{title}</Text>
                }


                {description &&
                    <DescriptionText
                        text={description}
                        containerStyle={{
                            marginTop: 15
                        }}
                    />
                }


                {description1 &&
                    <DescriptionText
                        text={description1}
                        containerStyle={{
                            marginTop: 15,
                            textAlign: 'left',
                        }}
                    />
                }


                {description2 &&
                    <DescriptionText
                        text={description2}
                        containerStyle={{
                            marginTop: 15,
                            textAlign: 'left',
                        }}
                    />
                }


                {description3 &&
                    <DescriptionText
                        text={description3}
                        containerStyle={{
                            marginTop: 15,
                            textAlign: 'left',
                        }}
                    />
                }

                <View
                    style={{
                        //backgroundColor: 'red',
                        padding: 10,
                        position: 'absolute',
                        width: '100%',
                        bottom: 10,
                        right: 0,
                        left: 0,
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >

                    {(index === 0 || index === 1) &&
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                marginTop: 8
                            }}
                        >
                            <SliderPaginationUI
                                length={data?.length}
                                index={index}
                            />
                        </View>
                    }

                    {index === 2 &&
                        <RNBounceable
                            onPress={() => {
                                dispatch(App.actions.setNewInstalled(false));
                            }}
                            bounceFriction={20}
                            bounceEffect={0.9}
                        >
                            <View
                                // activeOpacity={0.5}
                                style={{
                                    backgroundColor: colors.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: 13,
                                    //paddingBottom: 14,
                                    borderRadius: 10,
                                    //marginVertical: 10,
                                    marginHorizontal: 40,
                                    marginTop: 10
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 13,
                                        fontFamily: fonts.kronaOneRegular,
                                        //lineHeight: 20
                                    }}>Get Started</Text>
                            </View>
                        </RNBounceable>
                    }

                </View>


            </View>
        )
    }


    const ImageSlider = ({index}) => {
        const item = data[index]
        //console.log(index)
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <ImageBackground
                    source={item.img}
                    style={{
                        overflow: "hidden",
                        // width: '100%',
                        height: '65%',
                        marginVertical: 5,
                        marginHorizontal: 5,
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                    }}
                    imageStyle={{
                        borderRadius: 8,
                        height: '100%'
                    }}
                    resizeMode="cover"
                >
                    <LogoSection
                        containerStyle={{
                            marginTop: 30
                        }}
                    />
                </ImageBackground>


                {index === 0 &&
                    <Content
                        description="Find a home conveniently safely and faster"
                        index={index}
                    />
                }

                {index === 1 &&
                    <Content
                        description="Book your perfect home for viewing"
                        index={index}
                    />
                }

                {index === 2 &&
                    <Fragment>
                        <Content
                            description="Pay securely for your home online or at the bank"

                            index={index}
                        />
                    </Fragment>
                }

            </View>
        )
    }


    //console.log("Render")

    return (
        <SafeAreaView
          style={{
              flex: 1,
              backgroundColor: colors.white,
          }}
        >


            <StatusBar
                barStyle={colors.statusBarStyle}
                backgroundColor={colors.white}
                translucent={false}
                hidden={false}
            />

            <GestureHandlerRootView>
                <Carousel
                    ref={carouselRef}
                    defaultIndex={0}
                    loop={false}
                    snapEnabled={false}
                    enabled={true}
                    width={utils.sizes.width}
                    height={"100%"}
                    style={{
                        width: utils.sizes.width,
                    }}
                    modeConfig={{
                        //parallaxScrollingScale: 0.9,
                        //parallaxScrollingOffset: 50,
                    }}
                    //snapToInterval={width}
                    autoPlay={false}
                    data={data}
                    scrollAnimationDuration={200}
                    onSnapToItem={(index) => setSliderIndex(index)}
                    renderItem={ImageSlider}
                />
            </GestureHandlerRootView>

        </SafeAreaView>
    );
}
