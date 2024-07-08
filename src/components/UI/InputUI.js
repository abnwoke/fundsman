import {StyleSheet, View} from "react-native";
import React, {useState, useEffect, useRef, memo, useMemo, useCallback} from "react";
import {useSelector} from "react-redux";
import {useTheme} from '@react-navigation/native';
import {Colors, TextField, Text} from "react-native-ui-lib";

import utils from "../../utils";

const InputUI = ({
                     value, setValue, fieldStyle = 'underline', customFieldStyle,
                     label = null, placeholder = null, secureTextEntry = false, showLabel = true,
                     isRequired = true, keyboardType = 'default', // email | numeric | phone-pad | number-pad,
                     leftIcon, showLeftIcon, bottomAccessory = null, multiline = false, numberOfLines = undefined,
                     error, containerStyle, floatingPlaceholder = true, textColor, backgroundColor,
                     leadingAccessory = "", updateOnBlur = false
                 }) => {


    const {colors, sizes, fonts} = useTheme();
    //const {value: '', isValid: false, error: ''} = value
    const [inputValue, setInputValue] = useState(value);
    const [inputError, setInputError] = useState(null);

    console.log(inputValue?.error)

    //fieldStyle: underline, outline and fill
    let FieldStyle = {};
    let style = {};
    let floatingPlaceholderStyle = {};
    switch (fieldStyle) {
        case 'underline':
            FieldStyle = utils.style.fieldWithUnderline
            style.height = 30
            break;
        case 'outline':
            FieldStyle = utils.style.fieldWithOutline
            break;
        case 'fill':

            containerStyle = {
                marginBottom: inputValue?.error ? (utils.isIOS? 5:2) : (utils.isIOS? -3:-11),
                ...containerStyle
            }

            FieldStyle = {
                ...utils.style.fieldWithFill,
                height: utils.isIOS? 45 : 40,
                borderColor: inputValue?.error ? Colors.$textDangerLight : colors.gray5,
                paddingHorizontal: 8,
                borderRadius: 10,
                //paddingTop: 5,
            }

            style = {
                height: utils.isIOS? 27 : 44,
                color: color,
                fontFamily: utils.fonts.PlusJakartaSansMedium,
                lineHeight: utils.isIOS? 15 : 14,
                fontSize: utils.isIOS? 15 : 14
            }

            floatingPlaceholderStyle = {
                height: utils.isIOS? 44 : 35,
                fontSize: utils.isIOS? 18 : 15,
                color: inputValue?.error ?  Colors.$textDangerLight : colors.gray9,
                fontFamily: utils.fonts.PlusJakartaSansMedium,
                paddingTop: utils.isAndroid? 4 : undefined,
            }

            break;
    }

    const color = textColor ? textColor : colors.black;
    const placeholderTextColor = backgroundColor ? textColor : colors.gray8;


    const inputRef = useRef();
    //inputRef.current?.focus();
    //inputRef.current?.clear();
    //inputRef.current?.validate?.();




    const onSetValue = useCallback((value) => {
        //setInputValue(value);
        if (typeof setValue === "function" && !updateOnBlur) {
            setValue(value)
        }
    }, []);


    /*useEffect(()=>{

        if(value.action === "update"){
            delete value.action;
            const newValue = {
                ...inputValue,
                ...value,
                action: '',
            }
            onSetValue(newValue)
        }

        if(value.action === "validate"){
            delete value.action;
            if (!value.value && isRequired) {
                value.error =  `${label} is required`
            }

            const newValue = {
                ...inputValue,
                action: '',
                isValid: value.error? false : true,
                error: value.error? value.error : null,
            }

            onSetValue(newValue);
        }

        if(value.action === "reset"){
            const resetValue = {
                value: '',
                action: '',
                isValid: true,
                error: ''
            }
            onSetValue(resetValue)
        }

    },[value]);
*/


    const onChange = useCallback((thisValue) => {
        setInputValue({
            ...inputValue,
            isValid: !!thisValue,
            value: thisValue,
            error: (!thisValue && isRequired) ? `${label} is required` : null,
        });

        if (typeof setValue === "function" && !updateOnBlur) {
            setValue({
                ...inputValue,
                isValid: !!thisValue,
                value: thisValue,
                error: (!thisValue && isRequired) ? `${label} is required` : null,
            });
        }
    }, []);

    const onBlur = () => {
        if (updateOnBlur) {
            setValue(inputValue);
        }
    }


    const onChangeValidity = (value) => {
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


    //console.log(label)


    return (


        <TextField
            blurOnSubmit={false}
            keyboardType={keyboardType}
            ref={inputRef}
            value={inputValue?.value}
            onChangeText={onChange}
            fieldStyle={{
                ...FieldStyle,
                ...customFieldStyle,
                backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            }}
            secureTextEntry={secureTextEntry}
            containerStyle={{
                ...containerStyle,
            }}
            style={{
                ...style
            }}
            label={showLabel ? label : null}
            placeholder={placeholder}

            hint={placeholder}
            floatingPlaceholder={floatingPlaceholder}
            enableErrors

            validateOnChange
            //validateOnStart
            validateOnBlur
            validate={inputValue?.isValid}
            validationMessage={inputValue?.error}
            onChangeValidity={onChangeValidity}
            onBlur={onBlur}
            //validationMessageStyle={{}}
            //showCharCounter
            //maxLength={30}
            leadingAccessory={
                leadingAccessory ? <Text
                    style={{
                        lineHeight: 17,
                        marginRight: 3,
                        height: 23
                    }}
                >
                    {leadingAccessory}
                </Text> : null
            }
            /*trailingAccessory={
                <Text text70 $textNeutral>
                    Kg.
                </Text>
            }*/

            bottomAccessory={bottomAccessory}

            labelStyle={{
                fontSize: 14.5,
                fontFamily: utils.fonts.PlusJakartaSansMedium,
                //marginBottom: utils.isIOS ? 2 : -3,
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
                ...floatingPlaceholderStyle,
            }}

            placeholderTextColor={placeholderTextColor}
            //keyboardType="numeric"
            multiline={multiline}
            numberOfLines={numberOfLines}
        />

    )
}


//export default InputUI
export default memo(InputUI)
