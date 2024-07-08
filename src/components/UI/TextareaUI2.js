import {Card, View} from "react-native-ui-lib";
import {Text} from "react-native";

import {TextArea} from "native-base";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";


const TextareaUI = (props) =>{
    const {colors, sizes, fonts} = useTheme();
    const {
        value = {value: '', isValid: false, error: ''}, setValue, fieldStyle = 'underline', containerStyle,
        label = null, placeholder = null,

    } = props;

    const [inputValue, setInputValue] = useState(value);
    const [inputError, setInputError] = useState(null);


    let FieldStyle = {};
    let style = {
        backgroundColor: '#F7F7F7',
    };
    switch (fieldStyle) {
        case 'underline':
            FieldStyle = {
                fontFamily: fonts.poppinsMedium,
                fontSize: 15,
                borderBottomColor: inputValue.error? colors.danger : colors.border,
                borderWidth: 0,
                borderBottomWidth: 1,
                padding: 2,
                borderRadius: 0
            }
            break;
        case 'outline':
            FieldStyle = {
                fontFamily: fonts.poppinsMedium,
                fontSize: 15,
                borderColor: inputValue.error? colors.danger : colors.border,
                borderWidth: 1,
                padding: 2,
            }
            break;
        case 'fill':
            FieldStyle = {
                fontFamily: fonts.poppinsMedium,
                fontSize: 15,
                borderColor: inputValue.error? colors.danger : colors.border,
                borderWidth: 1,
                padding: 2,
                backgroundColor: colors.border
            }
            style.backgroundColor = colors.border
            break;
    }

    useEffect(()=>{

        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                value: value?.value,
            });
        }

        if(value.action === "validate"){

            if(!value.value){
                value.error =  `${label} is required`
            }

            setInputValue({
                ...inputValue,
                isValid: value.error? false : true,
                error: value.error? value.error : null,
            });
        }

        if(value.action === "rest"){
            const resetValue = {
                value: '',
                isValid: false,
                error: ''
            }
            setInputValue(resetValue);
            if (typeof setValue === "function") {
                setValue(resetValue)
            }
        }

    },[value]);


    const onChange = (thisValue) => {
        setInputValue({
            ...inputValue,
            isValid: !!thisValue,
            error: !thisValue? `${label} is required` : null,
            value: thisValue,
        });
        if (typeof setValue === "function") {
            setValue({
                ...inputValue,
                isValid: !!thisValue,
                error: !thisValue? `${label} is required` : null,
                value: thisValue,
            });
        }
    }


    return(
        <View
          style={{
              ...containerStyle
          }}
        >

            <TextArea
                h={20}
                placeholder={placeholder}
                w="100%"
                _light={FieldStyle}
                style={style}
                value={inputValue.value}
                onChangeText={onChange}
            />

            {inputValue.error &&
            <Text
                style={{
                    color: colors.danger,
                    fontFamily: fonts.poppinsRegular,
                    marginBottom: -12,
                    fontSize: 13
                }}
            >
                {inputValue.error}
            </Text>
            }


        </View>
    )
}

export default TextareaUI
