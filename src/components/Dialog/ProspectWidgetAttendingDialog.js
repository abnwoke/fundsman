import {Dialog} from "react-native-ui-lib";
import {COLORS, FONTFAMILY, lightTheme} from "../../constants";
import {Text, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect, Fragment} from "react";
import AppointmentServices from "../../modules/appointment/appointmentServices";
import Toast from "react-native-toast-message";
import TextareaUI from "../UI/TextareaUI";
import {useSelector} from "react-redux";


const ProspectWidgetAttendingDialog = (props) => {
    const {
        visible,
        onDismiss,
        refresh,
        ignoreBackgroundPress = false,
        dismissText = "No",
        schedule,
        prospect
    } = props

    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(null);
    const [reason, setReason] = useState(
        {value: '',
            isValid: false,
            action: '',
            error: ''
        });

    useEffect(() => {
        setView(null)
    }, [visible]);



    const onSubmit = async (action) => {
        try {

            if(action === "NO"){
                setReason({...reason, action: 'validate'})
                if(!reason.isValid){
                    return;
                }
            }

            setLoading(true);

            const formData = new FormData();
            formData.append('slug', schedule.slug);
            formData.append('status',   action === "YES"? 'Attended' : 'NotAttended');
            formData.append('user', prospect.slug);
            formData.append('message', reason.value);

            const response = await AppointmentServices.confirmProspectViewing(formData, auth.token);
            //console.log(response)

            setLoading(false)

            if (response.success) {
                Toast.show({
                    type: 'success', // 'success | error | info' | base
                    position: 'top', // 'top | bottom'
                    text1: 'Successful',
                    text2: response.message,
                    visibilityTime: 3000,
                });
                refresh();
                onDismiss();
            } else {
                Toast.show({
                    type: 'error', // 'success | error | info' | base
                    position: 'top', // 'top | bottom'
                    text1: 'Error',
                    text2: response.message,
                    visibilityTime: 3000,
                });
            }
        } catch (e) {
            Toast.show({
                type: 'error', // 'success | error | info' | base
                position: 'top', // 'top | bottom'
                text1: 'Error',
                text2: 'There was an error. Please try again!',
                visibilityTime: 3000,
            });
            setLoading(false)
        }
    }


    return (
        <Dialog
            useSafeArea
            visible={visible}
            onDismiss={() => {
                setView(null);
                onDismiss()
            }}
            ignoreBackgroundPress={ignoreBackgroundPress}
            containerStyle={{
                backgroundColor: COLORS.white,
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
                        color: lightTheme.text,
                        fontFamily: FONTFAMILY.poppinsMedium,
                        paddingTop: 10,
                        paddingHorizontal: 10,
                        textAlign: "center",
                        fontSize: 17
                    }}
                >Prospect Has Viewed Property</Text>


                <Text
                    style={{
                        color: lightTheme.text2,
                        fontFamily: FONTFAMILY.poppinsMedium,
                        paddingVertical: 0,
                        paddingHorizontal: 10,
                        fontSize: 13
                    }}
                >Are you sure the prospect has viewed the property</Text>

                {view === 'NO' &&
                  <View
                      style={{
                          paddingVertical: 0,
                          paddingHorizontal: 10,
                          marginTop: 10,
                          marginBottom: 10
                      }}
                  >
                      <TextareaUI
                          value={reason}
                          setValue={(value) => {
                              setReason(value)
                          }}
                          label="Reason"
                          placeholder="Please enter reason"
                      />
                  </View>
                }


                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 20,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => onDismiss()}
                    >
                        <Text
                            style={{
                                color: COLORS.danger,
                                fontFamily: FONTFAMILY.poppinsSemiBold,
                                fontSize: 15,
                                marginRight: 30
                            }}
                        >{dismissText.toUpperCase()}</Text>
                    </TouchableOpacity>


                    {view === 'NO' &&
                        <Fragment>
                            {loading &&
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        fontFamily: FONTFAMILY.poppinsSemiBold,
                                        fontSize: 15,
                                    }}
                                >SUBMITTING...</Text>
                            }

                            {!loading &&
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => onSubmit('NO')}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.primary,
                                            fontFamily: FONTFAMILY.poppinsSemiBold,
                                            fontSize: 15,
                                        }}
                                    >SUBMIT</Text>
                                </TouchableOpacity>
                            }
                        </Fragment>
                    }

                    {!view &&
                        <Fragment>

                            {loading &&
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        fontFamily: FONTFAMILY.poppinsSemiBold,
                                        fontSize: 15,
                                    }}
                                >SUBMITTING...</Text>
                            }


                            {!loading &&
                               <Fragment>

                                   <TouchableOpacity
                                       activeOpacity={0.5}
                                       onPress={() => onSubmit('YES')}
                                   >
                                       <Text
                                           style={{
                                               color: COLORS.primary,
                                               fontFamily: FONTFAMILY.poppinsSemiBold,
                                               fontSize: 15,
                                           }}
                                       >YES</Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity
                                       activeOpacity={0.5}
                                       onPress={() => setView('NO')}
                                   >
                                       <Text
                                           style={{
                                               color: COLORS.primary,
                                               fontFamily: FONTFAMILY.poppinsSemiBold,
                                               fontSize: 15,
                                               marginLeft: 30
                                           }}
                                       >NO</Text>
                                   </TouchableOpacity>

                               </Fragment>
                            }





                        </Fragment>
                    }





                </View>

            </View>
        </Dialog>
    )
}

export default ProspectWidgetAttendingDialog