import React, {Fragment} from "react";
import {Image, Text, TouchableOpacity, View} from 'react-native';
 
import {connect, useSelector} from "react-redux";
import {useNavigation, useTheme} from '@react-navigation/native';
import HeaderIcon from "./HeaderIcon";
import utils from "../../utils";
 

const SubHeader = ({containerStyle, title, goBack}) => {
    const {colors, sizes, fonts} = useTheme();
    const navigation = useNavigation();


    return (
      <Fragment>


          {/*<StatusBarUI
              barStyle={colors.statusBarStyle}
              backgroundColor={colors.white}
          />*/}


          <View
              style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginVertical: 10,
                  paddingHorizontal: sizes.containerPadding,
                  ...containerStyle
              }}
          >

              <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>  goBack()}
                  style={{
                     // width: 33,
                      //height: 33,
                     // backgroundColor: colors.primary,
                     // marginRight: 12,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
              >
                  <Image
                      source={utils.icons.angle_left}
                      style={{
                          height: 20,
                          width: 20,
                          tintColor: colors.text
                      }}
                  />
              </TouchableOpacity>

              {title &&
                  <Text
                      style={{
                          color: colors.text,
                          fontSize: 15,
                          fontFamily: fonts.kronaOneRegular,
                      }}
                  >
                      {title}
                  </Text>
              }

          </View>

      </Fragment>
    )
}

export default SubHeader
