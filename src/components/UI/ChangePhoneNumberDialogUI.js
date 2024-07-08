import {Dialog} from "react-native-ui-lib";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import MessageUI from "./MessageUI";
import InputUI from "./InputUI";
import userServices from "../../modules/user/userServices";
import {useSelector} from "react-redux";
import ButtonUI from "./ButtonUI";
import utils from "../../utils";
import {useTheme} from "@react-navigation/native";


const ChangePhoneNumberDialogUI = (props) => {
    const {colors, sizes, fonts} = useTheme();
    
    const {visible, onDismiss, onRefresh} = props;
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);

    const [state, setState] = React.useState({
        phoneNumber: {value: user.mobile_number, isValid: false, action: '', error: ''},
        loading: false,
        message: '',
        success: '',
    });


    const runValidation = () => {
        setState(state => ({
            ...state,
            phoneNumber: {...state.phoneNumber, action: 'validate'},
            message: '',
            success: '',
        }));
    }

    const onClose = () =>{
        onDismiss()
        setState(state => ({
            ...state,
            loading: false,
            message: '',
            success: '',
        }));
    }

    const onSubmit = async () =>{
        try {

            runValidation();

            if(!state.phoneNumber.value){
                setState(state => ({
                    ...state,
                    message: 'Please enter your phone number',
                    success: false,
                }));
            } else {

                const formData = new FormData();
                formData.append('slug', user.slug);
                formData.append('first_name', user.first_name);
                formData.append('last_name', user.last_name);
                formData.append('middle_name', user.middle_name);
                formData.append('gender', user.gender);
                formData.append('email', user.email);
                formData.append('mobile_number', state.phoneNumber.value);

                setState(state => ({
                    ...state,
                    loading: true
                }));

                const res = await userServices.updateUser(formData, auth.token);

                //console.log(res)

                if(res.success){

                    const data = res.data

                    onRefresh()

                    setState(state => ({
                        ...state,
                        loading: false,
                        success: true,
                        message: res.message,
                    }));

                } else {
                    setState(state => ({
                        ...state,
                        message: res.message,
                        success: false,
                        loading: false
                    }));
                }

            }
        } catch (e) {
            console.log(e)
            setState(state => ({
                ...state,
                message: 'There was an error. Please try again!',
                success: false,
                loading: false
            }));
        }
    }


    return (
        <Dialog
            useSafeArea
            visible={visible}
            onDismiss={() => onClose()}
            ignoreBackgroundPress={true}
            containerStyle={{
                backgroundColor: colors.white,
                marginBottom: 20,
                borderRadius: 12
            }}
        >
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >

                <Text
                    style={{
                        color: colors.text,
                        fontFamily: fonts.poppinsMedium,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingHorizontal: 10,
                        fontSize: 16
                    }}
                >Change Phone Number</Text>


                <View
                  style={{
                      paddingHorizontal: 10,
                  }}
                >


                    <MessageUI
                        message={state.message}
                        success={state.success}
                    />

                    <InputUI
                        value={state.phoneNumber}
                        label='Phone Number'
                        placeholder='Phone Number'
                        contentType='Phone Number'
                        containerStyle={{
                            //marginTop: 10
                            //marginBottom: -5
                        }}
                        setValue={(value) => {
                            setState(state => ({
                                ...state,
                                phoneNumber: value,
                            }))
                        }}
                    />


                </View>




                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 10,
                        marginRight: 10
                    }}
                >

                    <ButtonUI
                        label='CLOSE'
                        mode="text"
                        buttonColor={null}
                        textColor={null}
                        style={{
                            height: 30,
                        }}
                        labelStyle={{
                            color: colors.danger,
                            fontFamily: fonts.poppinsSemiBold,
                            fontSize: 15,
                        }}
                        onPress={()=>{
                            onClose()
                        }}
                    />

                    <ButtonUI
                        loading={state.loading}
                        disabled={state.loading}
                        label='SAVE'
                        mode="text"
                        buttonColor={null}
                        textColor={null}
                        style={{
                            height: 30,
                        }}
                        labelStyle={{
                            color: colors.primary,
                            fontFamily: fonts.poppinsSemiBold,
                            fontSize: 15,
                        }}
                        onPress={onSubmit}
                    />
                </View>

            </View>
        </Dialog>
    )
}


export default ChangePhoneNumberDialogUI
