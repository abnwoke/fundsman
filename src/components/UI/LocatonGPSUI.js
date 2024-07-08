import React, {Fragment, useEffect, useState, memo} from "react";
import {Colors, Text} from "react-native-ui-lib";
import {TouchableOpacity, TextInput, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import utils from "../../utils";
import {useTheme} from "@react-navigation/native";


const LocationGPSUI = (props) => {

    const {
        value = {value: '', isValid: false, error: ''}, setValue,
        label = null, error, containerStyle, placeholder,
    } = props

    const { colors, sizes, fonts } = useTheme();

    const [inputValue, setInputValue] = useState(value);




    useEffect(() => {

        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                action: '',
                value: value?.value
            });
        }


        if (value.action === "validate") {
            if(!value.value){
                value.error =  `${label} is required`
            }
            setInputValue({
                ...inputValue,
                isValid: value.error? false : true,
                error: value.error? value.error : null,
                action: '',
            });
        }


    }, [value]);

    const onChange = (thisValue) => {
        setInputValue({
            ...inputValue,
            isValid: !!thisValue,
            error: !thisValue ? `${label} is required` : null,
            value: thisValue,
        });
        if (typeof setValue === "function") {
            setValue({
                ...inputValue,
                isValid: !!thisValue,
                error: !thisValue ? `${label} is required` : null,
                value: thisValue,
            });
        }
    }

    const hasError = inputValue.error && !inputValue.isValid;


    return (
        <View
            style={{
                width: "48%",
                marginBottom: 10,
                height: 65
            }}
        >






            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setVisible(true)}
                style={{
                    borderWidth: 1,
                    borderColor: colors.borderColor,
                    padding: 5,
                    paddingHorizontal: 6
                }}
            >

                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 11,
                        fontFamily: fonts.poppinsMedium
                    }}
                >GPS CODE</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    {/*<Text
                        numberOfLines={1}
                        style={{
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.poppinsSemiBold,
                            lineHeight: 19,
                            marginTop: 0,
                            flex: 1
                        }}
                    > {inputValue?.value?.description || "Location"} </Text>*/}

                    <TextInput
                        placeholder={placeholder}
                        style={{
                            color: colors.text,
                            borderWidth: 0,
                            height: 19,
                            padding: 0,
                            paddingHorizontal: 0,
                            fontWeight: "500",
                            fontSize: 13,
                            width: "100%"
                        }}

                        placeholderTextColor={colors.text}
                        onChangeText={(value)=>{
                            onChange(value)
                        }}
                        value={inputValue.value}
                    />
                </View>
            </TouchableOpacity>

            {hasError &&
            <Text
                style={{
                    color: Colors.$textDangerLight,
                    fontSize: 10,
                    marginTop: 3
                }}
            >{inputValue.error}</Text>
            }

        </View>
    )
}

export default memo(LocationGPSUI)
