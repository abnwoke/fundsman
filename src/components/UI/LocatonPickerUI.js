import React, {useEffect, useRef, useState, Fragment, memo} from "react";
import {Colors, Picker} from "react-native-ui-lib";
import {TouchableOpacity, View, Text} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const LocationPickerUI = (props) => {

    const {
        value = {value: '', isValid: false, error: ''}, setValue, fieldStyle = 'outline', customFieldStyle,
        label = null, placeholder = null, secureTextEntry = false, title,
        contentType = 'text', // email | number
        leftIcon, showLeftIcon, bottomAccessory = null,
        error, containerStyle, floatingPlaceholder = true, textColor, backgroundColor, data,
        returnValue="value", returnLabel="name", searchPlaceholder="Search..."
    } = props

    const {colors, sizes, fonts} = useTheme();

    const picker = useRef();
    //picker.current?.openExpandable?.()

    const [inputValue, setInputValue] = useState(value);

    let FieldStyle
    switch (fieldStyle) {
        case 'underline':
            FieldStyle = utils.style.fieldWithUnderline
            break;
        case 'outline':
            FieldStyle = utils.style.fieldWithOutline
            break;
        case 'fill':
            FieldStyle = utils.style.fieldWithFill
            break;
        default:
            FieldStyle = utils.style.fieldWithUnderline
    }

    const color = textColor ? textColor : colors.black;
    const placeholderTextColor = backgroundColor ? textColor : colors.borderColor;

    useEffect(() => {

        if(value.action === "update"){
            setInputValue({
                ...inputValue,
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

    const options = [
        {label: 'JavaScript', value: 'js'},
        {label: 'Java', value: 'java'},
        {label: 'Python', value: 'python'},
        {label: 'C++', value: 'c++', disabled: true},
        {label: 'Perl', value: 'perl'}
    ];

    const getSelectLabel = () =>{
        if(inputValue.value){
            const getData = data?.find(d=>d.slug === inputValue.value);
            //console.log(getData)
            if(getData){
                return  getData.name
            }else {
                return label
            }
        } else {
            return label
        }
    }

    const hasError = inputValue.error && !inputValue.isValid;

    //console.log(inputValue)

    return (
        <View
           style={{
               width: "48%",
               marginBottom: 10,
               height: 65,
               overflow: "hidden"
           }}
        >

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=> picker.current?.openExpandable?.()}
                style={{
                    borderWidth: 1,
                    borderColor: colors.gray10,
                    padding: 5,
                    paddingHorizontal: 6
                }}
            >

                <Text
                    style={{
                        color: colors.primary,
                        fontSize:11,
                        fontFamily: fonts.poppinsMedium
                    }}
                >{label}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color: colors.black,
                            fontSize:12,
                            fontFamily: fonts.poppinsMedium,
                            lineHeight: 19,
                            marginTop: 0,
                            flex: 1
                        }}
                    >{getSelectLabel()}</Text>
                    <Entypo
                        name="chevron-down"
                        color={colors.black}
                        style={{
                            fontSize:15,
                        }}
                    />
                </View>

                <Picker
                    useSafeArea={true}
                    containerStyle={{
                        //...containerStyle,
                        backgroundColor: 'red',
                        height: 0
                    }}
                    ref={picker}
                    fieldStyle={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        height: 0
                    }}
                    value={inputValue.value}
                    onChange={onChange}
                    enableModalBlur={false}
                    searchPlaceholder={searchPlaceholder}
                    topBarProps={{title: title}}
                    style={{
                        color: colors.transparent,
                        fontFamily: fonts.poppinsMedium,
                        lineHeight: 0,
                    }}
                    showSearch
                    mode={Picker.modes.SINGLE}
                    fieldType={Picker.fieldTypes.form}
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
                        fontSize: 15.1,
                        fontFamily: fonts.poppinsMedium,
                    }}
                    placeholderTextColor={placeholderTextColor}
                    searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
                >
                    {data?.map((option) => (
                        <Picker.Item
                            key={option[returnValue]}
                            value={option[returnValue]}
                            label={option[returnLabel]}
                            //disabled={option.disabled}
                        />
                    ))}
                </Picker>


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

export default memo(LocationPickerUI)
