import {StyleSheet, View} from "react-native";
import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {Colors, TextField, Text, NumberInput} from "react-native-ui-lib";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const NumberInputUI = (props) => {
    const {
        value = {value: '', isValid: false, error: ''}, setValue, fieldStyle = 'underline', customFieldStyle,
        label = null, placeholder = null, secureTextEntry = false, showLabel=true,
        leadingText = null,
        leftIcon, showLeftIcon, bottomAccessory=null,
        error, containerStyle, floatingPlaceholder=true, textColor, backgroundColor,
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
            //FieldStyle = utils.styles?.fieldWithUnderline
            style.height = 30
            break;
        case 'outline':
            //FieldStyle = utils.styles?.fieldWithOutline
            break;
        case 'fill':
            //FieldStyle = utils.styles?.fieldWithFill
            FieldStyle.paddingTop = 13
            style.height = 40
            break;
    }

    const color = textColor? textColor : colors.black;
    const placeholderTextColor = backgroundColor ? textColor : colors.borderColor;


    //console.log(inputValue)

    /*useEffect(()=>{
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

    },[value]);*/


    const onChange = (thisValue) => {
        const data = {
            isValid: thisValue.type === 'valid',
            error: thisValue.type !== 'valid'? `${label} is required` : null,
            value: thisValue.number,
        }

        setInputValue({
            ...inputValue,
           ...data
        });
        if (typeof setValue === "function") {
            setValue({
                ...inputValue,
                ...data
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

    return (


        <NumberInput
            value={inputValue.value}
            //initialValue={inputValue.value}
            onChangeNumber={onChange}
            label={showLabel? label : null}
            fieldStyle={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 4,
                paddingVertical: 10,
                paddingHorizontal: 10,
                paddingRight: 12,
                borderRadius: 8
            }}
            style={{
                height: 18
                //borderWidth: 1
            }}
            containerStyle={{
                marginBottom: inputValue.error? 4 : -10,
                ...containerStyle,
            }}

            placeholder={placeholder}
            leadingText={leadingText? leadingText : null}
            leadingTextStyle={{
                marginRight: 5
            }}

            placeholderTextColor={placeholderTextColor}
        />

           /* <TextField
                blurOnSubmit={false}
                keyboardType={keyboardType}
                ref={inputRef}
                value={inputValue.value}
                onChangeText={onChange}
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

                //validationMessageStyle={{}}
                //showCharCounter
                //maxLength={30}
                /!*leadingAccessory={
                    <Text text70 blue30 marginR-2>
                        Https://
                    </Text>
                }*!/
                /!*trailingAccessory={
                    <Text text70 $textNeutral>
                        Kg.
                    </Text>
                }*!/

                bottomAccessory={bottomAccessory}

                labelStyle={{
                    fontSize: 14.5,
                    fontFamily: fonts.poppinsMedium,
                    marginBottom: -4
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
            />*/

    )
}


//export default InputUI
export default React.memo(NumberInputUI)
