import {StyleSheet, View} from "react-native";
import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {Colors, TextField, Text} from "react-native-ui-lib";
import utils from "../../utils";

import moment from 'moment';
//import * as LightDate from 'light-date';
import {DateTimePicker, DateTimePickerProps, DateTimePickerMode,  Switch} from 'react-native-ui-lib';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from "@react-navigation/native";




const InputUI = (props) => {
    const {
        value = {value: '', isValid: false, error: ''}, setValue, fieldStyle = 'underline', customFieldStyle,
        label = null, placeholder = null, secureTextEntry = false, showLabel=true,
        keyboardType = 'default', // email | numeric | phone-pad | number-pad
        leftIcon, showLeftIcon, bottomAccessory=null,
        error, containerStyle, floatingPlaceholder=true, textColor, backgroundColor,  mode='date'
    } = props;
    const {colors, sizes, fonts} = useTheme();

    const isDarkMode = useSelector((state) => state.app.isDarkMode)

    const inputRef = useRef();
    //inputRef.current?.focus();
    //inputRef.current?.clear();
    //inputRef.current?.validate?.();

    const [inputValue, setInputValue] = useState(value);
    const [inputError, setInputError] = useState(null);


    //console.log(value)

    //fieldStyle: underline, outline and fill
    let FieldStyle = {};
    let style = {};
    switch (fieldStyle) {
        case 'underline':
            FieldStyle = utils.style.fieldWithUnderline
            style.height = 30
            break;
        case 'outline':
            FieldStyle = utils.style.fieldWithOutline
            break;
        case 'fill':
            FieldStyle = utils.style.fieldWithFill
            FieldStyle = {
                ...FieldStyle,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 2,
            }
            FieldStyle.paddingTop = 13
            style.height = 40
            break;
    }

    const color = textColor? textColor : colors.black;
    const placeholderTextColor = backgroundColor ? textColor : colors.borderColor;


    //console.log(inputValue)

    useEffect(()=>{

        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                ...value,
                isValid: value.value ? true : false,
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


        if(value.action === "reset"){
            const resetValue = {
                value: '',
                isValid: true,
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

    const onChangeValidity = (isValid) => {
        /*setInputValue({
            ...inputValue,
            value: inputValue.value,
            isValid: isValid,
        });

        if (typeof setValue === "function") {
            setValue({
                ...inputValue,
                value: inputValue.value,
                isValid: isValid,
            });
        }*/
        //console.warn('validity changed:', isValid, Date.now())
    }



    const formatter = (value,mode) =>{
        moment(value).format(mode === 'date' ? 'D MMM, YYYY' : 'h:mm A');
    }


    // Left Icon
    let leadingAccessory = null;
    if (leftIcon && showLeftIcon) {

        if(mode === 'date'){
            leadingAccessory =  <MaterialIcons name="calendar-today" size={16} color={color} style={{marginRight: 15}} />
        }

        /*if(mode === 'time'){
            leadingAccessory =  <MaterialCommunityIcons name="edit-calendar" size={16} color={color} />
        }*/
    }






    return (



        <DateTimePicker
            blurOnSubmit={false}
            keyboardType={keyboardType}
            ref={inputRef}
            migrateTextField
            dateTimeFormatter={formatter}
            mode={mode}
            value={inputValue.value? new  Date(inputValue.value) : ''}
            onChange={onChange}
            fieldStyle={{
                ...FieldStyle,
                ...customFieldStyle,
                backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            }}
            secureTextEntry={secureTextEntry}
            containerStyle={{
                marginBottom: inputValue.error? 4 : -10,
                ...containerStyle,
            }}
            style={{
                color: color,
                fontFamily: fonts.poppinsMedium,
                lineHeight: 20,
                ...style
            }}
            label={showLabel? label : null}
            placeholder={placeholder}

            hint={placeholder}
            floatingPlaceholder={floatingPlaceholder}
            enableErrors

            validateOnChange
            //validateOnStart
            validateOnBlur
            validate={inputValue.isValid}
            validationMessage={inputValue.error}
            onChangeValidity={onChangeValidity}

            leadingAccessory={leadingAccessory}

            //validationMessageStyle={{}}
            //showCharCounter
            //maxLength={30}
            /*leadingAccessory={
                <Text text70 blue30 marginR-2>
                    Https://
                </Text>
            }*/
            /*trailingAccessory={
                <Text text70 $textNeutral>
                    Kg.
                </Text>
            }*/

            bottomAccessory={bottomAccessory}

            labelStyle={{
                fontSize: 14.5,
                fontFamily: fonts.poppinsMedium,
                marginBottom: utils.isIOS? 3 : -4,
            }}
            labelColor={{
                default: Colors.$textDefault,
                focus: Colors.$textDefault,
                error: Colors.$textDangerLight,
                disabled: Colors.$textDisabled,
                readonly: Colors.$textNeutral
            }}
            floatingPlaceholderColor={{
                focus: Colors.$textDefault,
                default: Colors.$textNeutral,
                error: Colors.$textDangerLight,
            }}
            floatingPlaceholderStyle={{
                fontSize: 15,
                fontFamily: fonts.poppinsMedium,
            }}

            placeholderTextColor={placeholderTextColor}
            //keyboardType="numeric"
            //multiline
        />

    )
}


//export default InputUI
export default React.memo(InputUI)
