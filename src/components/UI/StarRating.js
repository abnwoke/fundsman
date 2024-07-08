import {Image, View, Text} from "react-native";
import {COLORS, FONTFAMILY, FONTS, ICONS} from "../../constants";
import React from "react";
import Stars from "react-native-stars";
import {useSelector} from "react-redux";


const StarRating = (props)=>{
    const {
        containerStyle, showRatings, showLabel, ratings,
        spacing=4,
        size = 18
    } = props;

    const isDarkMode = useSelector((state) => state.app.isDarkMode)

    return(
        <View
            style={{
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                ...containerStyle
            }}
        >
        <Stars
            half={true}
            default={2.5}
            //update={(val)=>{this.setState({stars: val})}}
            spacing={spacing}
            count={5}
            disabled={true}
            fullStar={
                <Image
                    source={ICONS.star_full}
                    style={{
                        height: size,
                        width: size,
                        tintColor:  "#FFB949",
                    }}
                />
            }
            emptyStar={
                <Image
                    source={ICONS.star_full}
                    style={{
                        height: size,
                        width: size,
                        tintColor:  "#EEEFF3",
                    }}
                />
            }
            halfStar={
                <Image
                    source={ICONS.star_half}
                    style={{
                        height: size,
                        width: size,
                        tintColor:  "#FFB949",
                    }}
                />
            }
        />

            {showRatings?
                <Text
                    style={{
                        ...FONTFAMILY.poppinsMedium,
                        color: isDarkMode? COLORS.darkColor2 : COLORS.lightColor2,
                        marginTop: -1
                    }}
                > <Text style={{...FONTFAMILY.poppinsMedium, color: isDarkMode? COLORS.darkColor1 : COLORS.lightColor1, fontSize:14}}>2.5</Text> {showLabel?`(${ratings} ratings)`:null} </Text>
                : null
            }

        </View>
    )
}

export default StarRating