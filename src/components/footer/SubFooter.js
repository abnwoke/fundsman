import {Image, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modalbox";
import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import { Button } from 'react-native-paper';
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const  SubFooter = ({onPressLeft, leftText="CLOSE", leftStyle, leftIcon="close", onPressRight, rightText, rightStyle, loading, rightDisabled, containerStyle, rightIcon="plus"}) =>{
    const {colors, sizes, fonts} = useTheme();
    const isDarkMode = useSelector((state) => state.app.isDarkMode);
    const appTheme = useSelector((state) => state.app.appTheme);

    return(
       <Fragment>

           <View style={{height: 30}} />

           <View
               style={{
                   position: 'absolute',
                   bottom: 0,
                   right: 0,
                   left: 0,
                   //height: 50,
                   //justifyContent: 'flex-end',
                   //alignItems: 'center',
                   borderTopLeftRadius: 15,
                   borderTopRightRadius: 15,
                   width: '100%',
                   //borderWidth: 1,
                   //borderColor: colors.lineDivider,
                   //borderBottomWidth: 0
               }}
           >

               <View
                   style={{
                       justifyContent: 'space-around',
                       flexDirection: 'row',
                       width: '100%',
                       height: '100%',
                       backgroundColor: colors.white,
                       //borderTopLeftRadius: 15,
                       //borderTopRightRadius: 15,
                       alignItems: 'center',
                       //paddingHorizontal: 15,
                       //paddingTop: 8,
                       //paddingBottom: 8,
                       overflow: 'hidden',
                       ...containerStyle
                   }}
               >

                   <Button
                       icon={leftIcon}
                       mode="outlined"
                       onPress={onPressLeft}
                       buttonColor={colors.white}
                       textColor={colors.primary}
                       style={{
                           width: '100%',
                           borderRadius: 0,
                           flex: 1,
                           borderTopLeftRadius: 15,
                           borderColor: colors.primary,
                           ...leftStyle
                       }}
                   >
                       {leftText}
                   </Button>

                   <Button
                       icon={rightIcon}
                       mode="contained"
                       onPress={onPressRight}
                       buttonColor={colors.primary}
                       loading={loading}
                       disabled={rightDisabled}
                       style={{
                           width: '100%',
                           borderRadius: 0,
                           flex: 1,
                           borderWidth: 1,
                           borderBottomColor: colors.primary,
                           borderTopRightRadius: 15,
                           ...rightStyle
                       }}
                   >
                       {rightText}
                   </Button>

               </View>
           </View>
       </Fragment>
    )
}

export default SubFooter
