import React, {Fragment, useEffect, useState} from "react";

import {Colors, Text} from "react-native-ui-lib";
import {TouchableOpacity, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MapModal from "../modals/MapModal";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const LocationMapPickerUI = (props) => {

    const {
        value = {value: '', isValid: false, error: ''}, setValue,
        label = null, error, containerStyle,
    } = props
    const {colors, sizes, fonts} = useTheme();

    const [inputValue, setInputValue] = useState(value);


    const [visible, setVisible] = useState(false);


    useEffect(() => {

        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                value: value?.value,
                action: '',
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


            {value &&
                <MapModal
                    showModal={visible}
                    setShowModal={(value) => setVisible(value)}
                    onSave={(value)=>{
                        onChange(value)
                        ///console.log("")
                        //console.log(value)
                    }}
                />
            }




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
                >GOOGLE MAP</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.poppinsMedium,
                            lineHeight: 19,
                            marginTop: 0,
                            flex: 1
                        }}
                    > {inputValue?.value?.description || "Location"} </Text>
                    <Entypo
                        name="chevron-down"
                        color={colors.black}
                        style={{
                            fontSize: 15,
                        }}
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

export default LocationMapPickerUI
