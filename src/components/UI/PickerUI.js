import React, {useEffect, useRef, useState, memo} from "react";
import {Colors, Picker, View} from "react-native-ui-lib";

import Entypo from 'react-native-vector-icons/Entypo';
import utils from "../../utils";
import {useTheme} from "@react-navigation/native";

const PickerUI = ({
                      value = {value: '', isValid: false, error: ''}, setValue, fieldStyle = 'underline', customFieldStyle,
                      label = null, placeholder = null, secureTextEntry = false, title, showLabel = true, isRequired= true,
                      contentType = 'text', // email | number
                      leftIcon, showLeftIcon, bottomAccessory = null, multiple = false,
                      error, containerStyle, floatingPlaceholder = true, textColor, backgroundColor, data,
                      returnValue = "value", returnLabel = "name", searchPlaceholder = "Search..."
                  }) => {

    const {colors, sizes, fonts} = useTheme();
    
    const pickerRef = useRef();
    //picker.current?.openExpandable?.()

    const [inputValue, setInputValue] = useState(value);

    //console.log(label)


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
                fontSize: utils.isIOS? 17 : 14,
                color: inputValue?.error ?  Colors.$textDangerLight : colors.gray9,
                fontFamily: utils.fonts.PlusJakartaSansMedium,
                paddingTop: utils.isAndroid? 4 : undefined,
            }
            break;
    }

    const color = textColor ? textColor : colors.black;
    const placeholderTextColor = backgroundColor ? textColor : colors.gray8;

    useEffect(() => {


        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                ...value,
                action: '',
            });
        }

        if (value.action === "validate") {
            if (!value.value && isRequired) {
                value.error = `${label} is required`
            }
            setInputValue({
                ...inputValue,
                isValid: value.error ? false : true,
                error: value.error ? value.error : null,
                action: '',
            });
        }

        if (value.action === "reset") {
            const resetValue = {
                value: '',
                isValid: true,
                error: '',
                action: '',
            }
            setInputValue(resetValue);
            if (typeof setValue === "function") {
                setValue(resetValue)
            }
        }
    }, [value]);

    const onChange = (thisValue) => {
        setInputValue({
            ...inputValue,
            isValid: !!thisValue,
            error: (!thisValue && isRequired) ? `${label} is required` : null,
            value: thisValue,
        });
        if (typeof setValue === "function") {
            setValue({
                ...inputValue,
                isValid: !!thisValue,
                error: (!thisValue && isRequired) ? `${label} is required` : null,
                value: thisValue,
            });
        }
    }

    return (
        <View>
            <Picker
                useSafeArea={true}
                containerStyle={{
                    ...containerStyle,
                }}
                ref={pickerRef}
                label={showLabel ? label : null}
                fieldStyle={{
                    ...FieldStyle,
                    ...customFieldStyle,
                    backgroundColor: backgroundColor ? backgroundColor : 'transparent',
                }}
                placeholder={placeholder}
                floatingPlaceholder={floatingPlaceholder}
                value={inputValue.value}
                onChange={onChange}
                enableModalBlur={false}
                topBarProps={{title: title}}
                style={{
                    ...style
                }}
                trailingAccessory={<Entypo name="chevron-down" color={color} style={{marginTop: -6, marginLeft: 2}}/>}
                showSearch
                mode={multiple ? Picker.modes.MULTI : Picker.modes.SINGLE}
                fieldType={Picker.fieldTypes.form}
                searchPlaceholder={searchPlaceholder}
                searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}

                labelStyle={{
                    fontSize: 14.5,
                    fontFamily: utils.fonts.PlusJakartaSansMedium,
                }}
                labelColor={{
                    default:  Colors.$textDefault,
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
                enableErrors
                validateOnChange
                //validateOnStart
                validateOnBlur
                validate={inputValue.isValid}
                validationMessage={inputValue.error}

                floatingPlaceholderStyle={{
                    ...floatingPlaceholderStyle,
                }}

                placeholderTextColor={placeholderTextColor}
                //color={color}
            >
                {/* {_.map(options, option => (
                    <Picker.Item
                        key={option[returnValue]}
                        value={option[returnValue]}
                        label={option[returnLabel]}
                        //disabled={option.disabled}
                    />
                ))}*/}
                {data?.map((option) => (
                    <Picker.Item
                        key={option[returnValue]}
                        value={option[returnValue]}
                        label={option[returnLabel]}
                        //disabled={option.disabled}
                    />
                ))}
            </Picker>
        </View>
    )
}

export default memo(PickerUI)
