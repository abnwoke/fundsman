import {View, Text} from 'react-native-ui-lib';
import {Image, TouchableOpacity, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";
import ImageUI from "./ImageUI";


const ImageUploaderUI = (props) => {
    const {colors, sizes, fonts} = useTheme();
    const {
        value = {
            value: '',
            isValid: false,
            error: '',
            preview: utils.images.default,
            remove:false
        },
        setValue, allowRemove=true,
        label = null, required=false,
        containerStyle
    } = props;

    const [inputValue, setInputValue] = useState({
        ...value,
        preview: value.preview? value.preview : utils.images.default,
    });


    useEffect(() => {


        if(value.action === "update"){
            setInputValue({
                ...inputValue,
                ...value,
                preview: value?.preview ? {uri: value?.preview} : utils.images.default,
                action: '',
            });
        }

        if (value.action === "validate") {
            if(required && !value.value){
                setInputValue({
                    ...inputValue,
                    isValid: false,
                    error: 'Required',
                    action: '',
                });
            } else {
                setInputValue({
                    ...inputValue,
                    isValid: (!value.error && value.value) ? true : false,
                    error: value.error ? value.error : null,
                    action: '',
                });
            }
        }

        if (value.action === "reset") {
            const resetValue = {
                value: '',
                isValid: true,
                error: '',
                preview: utils.images.default,
                remove:false,
                action: '',
            }
            setInputValue(resetValue);
            if (typeof setValue === "function") {
                setValue(resetValue)
            }
        }
    }, [value]);

    const onRemove = () =>{
        const resetValue = {
            value: '',
            isValid: false,
            preview: utils.images.default,
            error: null,
            remove: true
        }
        setInputValue(resetValue);
        if (typeof setValue === "function") {
            setValue(resetValue)
        }
    }




    const onChange = async () =>{
        try {

            const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
            if(permission.granted === false){
                const permissionRequest = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (permissionRequest.granted === false) {
                    alert("You've refused to allow this app to access your media!");
                    return;
                }
            }
           // console.log()




            const options = {
                allowsMultipleSelection: false,
                //title: 'Select Image',
                //type: 'library', // 'capture' | 'library'
                //selectionLimit: 1,
                quality: 1, //0 to 1, photos
                mediaType: 'Images', // 'Images' | 'Videos' | 'All'
                //includeBase64: false,
                //saveToPhotos: true,
                //presentationStyle: 'fullScreen',
                //formatAsMp4: true,
            }

            const res = await ImagePicker.launchImageLibraryAsync(options);
            if(res.assets && res.assets[0]){
                const file = res.assets[0];
                //console.log(file)
                const data = {
                    preview: {uri: file.uri},
                    value: {
                        uri: file.uri,
                        type: file.mimeType,
                        name: file.fileName
                    },
                    error: null,
                    isValid: true,
                    remove: false,
                    action:  "upload"
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
        } catch (e) {}
    }

    return (
       <View>
           <TouchableOpacity
               activeOpacity={0.7}
               style={{
                   position: "relative",
                   width: 90,
                   height: 90,
                   marginRight: 10,
                   borderWidth: inputValue.error? 1 : 0,
                   borderColor: colors.danger,
                   overflow: "hidden",
                   borderRadius: 8,
                   ...containerStyle
               }}
               onPress={()=>onChange()}
           >
               <ImageUI
                   source={inputValue.preview}
                   style={{
                       width: '100%',
                       height: '100%',
                   }}
                   //contentFit={"stretch"}
               />


               {(inputValue.value && allowRemove) &&
                   <TouchableOpacity
                       activeOpacity={0.4}
                       style={{
                           padding: 3,
                           position: "absolute",
                           right: 0,
                           top: 0,
                           justifyContent: "center",
                           //backgroundColor: 'gray'
                       }}
                       onPress={()=> onRemove()}
                   >
                       <Image
                           source={utils.icons.cancel}
                           style={{
                               width: 18,
                               height: 18,
                               tintColor: colors.danger
                           }}
                       />
                   </TouchableOpacity>
               }

           </TouchableOpacity>
           {inputValue.error &&
             <Text
                 style={{
                     color: colors.danger,
                     fontFamily: fonts.poppinsRegular,
                     marginBottom: -12,
                     fontSize: 12
                 }}
             >
                 {inputValue.error}
             </Text>
           }
       </View>
    )
}

export default ImageUploaderUI
