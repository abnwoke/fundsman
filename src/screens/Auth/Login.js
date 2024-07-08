import {useState, useEffect, useRef, Fragment, useCallback, useMemo} from 'react';

import {
    Text,
    View,
    Button,
    Platform,
    Appearance,
    SafeAreaView,
    ImageBackground,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";

import {sendPushNotification} from '../../libs/expo-push-notifications'
import utils from "../../utils";
import Icon from 'react-native-vector-icons/FontAwesome';

import App from "../../modules/app";
import Auth from '../../modules/auth';


import InputUI from "../../components/UI/InputUI";
import ButtonUI from "../../components/UI/ButtonUI";
import MessageUI from "../../components/UI/MessageUI";

import AuthNav from "./AuthNav";
import LogoSection from "../../components/sections/LogoSection";

export default function Login({navigation}) {
    const app = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const {colors, sizes, fonts} = useTheme();

    const [email, setEmail] = useState({value: '', isValid: false, action: '', error: ''});
    const [password, setPassword] = useState({value: '', isValid: false, action: '', error: ''});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [login] = Auth.hooks.useLogin();


    const onChangeEmail = useCallback((value) => {
        setEmail(value)
    }, []);

    const emailInput = useMemo(() => {
        return <InputUI
            value={email}
            label='Email'
            placeholder='Email'
            contentType='email'
            keyboardType='email-address'
            containerStyle={{
                //marginTop: 10
                //marginBottom: -5
            }}
            setValue={onChangeEmail}
        />;
    }, [email, onChangeEmail]);


    const onChangePassword = useCallback((value) => {
        setPassword(value)
    }, []);
    const passwordInput = useMemo(() => {
        return <InputUI
            value={password}
            label='Password'
            placeholder='Password'
            contentType='password'
            secureTextEntry={true}
            containerStyle={{
                marginBottom: -2
            }}
            setValue={onChangePassword}
        />;
    }, [password, onChangePassword]);


    const runValidation = () => {
        onChangeEmail({...email, action: 'validate'})
        onChangePassword({...password, action: 'validate'})
        setMessage('');
        setSuccess('');
    }


    //Auth.utils.checkAccount()

    const onSubmit = async () => {
        try {
            runValidation();
            if (!email.isValid || !password.isValid) {
                setMessage('Please enter the required fields');
                return;
            }

            const data = {
                email: email.value,
                password: password.value,
            }

            setLoading(true);

            const response = await login(data);
            const res = response.data

            //console.log(res)

            if (res.success) {
                navigation.navigate(utils.screens.home)
            } else {
                setMessage(res.message);
            }

            setLoading(false);

        } catch (e) {
            console.log(e)
            setLoading(false);
            setMessage('There was an error. Please try again!');
        }
    }



    return (
        <Fragment>

            <StatusBar
                barStyle={'light-content'}
                backgroundColor={colors.transparent}
                translucent={true}
                hidden={false}
            />

            <ImageBackground
                source={utils.images.loading_bg}
                style={{
                    overflow: "hidden",
                    width: '100%',
                    height: '100%',
                    flex: 1,
                }}
                imageStyle={{
                    height: '100%'
                }}
                resizeMode="cover"
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: colors.primaryTransparent70,
                        paddingHorizontal: sizes.containerPadding
                    }}
                >

                    <LogoSection
                        containerStyle={{
                            position: 'absolute',
                            top: 100,
                            left: 0,
                            right: 0,
                            marginBottom: 0
                        }}
                    />

                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: 70
                    }}
                    behavior={utils.isIOS ? "padding" : "height"}
                    showsVerticalScrollIndicator={false}
                >



                    <View
                        style={{
                            //flex: 1,
                            //position: 'absolute',

                            bottom: 10,
                            marginHorizontal: 10,
                            // width: '100%',
                            //backgroundColor: COLORS.primaryTransparent80,
                        }}
                    >

                        <AuthNav
                            active='login'
                        />

                        <View
                            style={{
                                marginTop: 20,
                                backgroundColor: '#fff',
                                borderRadius: 15,
                                padding: 0,
                                paddingHorizontal: 18,
                                paddingTop: 15,
                                paddingBottom: 20,
                            }}
                        >

                            <MessageUI
                                message={message}
                                success={success}
                            />

                            {emailInput}
                            {passwordInput}


                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 25
                                }}
                            >

                                <ButtonUI
                                    loading={loading}
                                    disabled={loading}
                                    label='Login'
                                    //icon='login'
                                    style={{
                                        marginTop: 0
                                    }}
                                    onPress={onSubmit}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        navigation.navigate(utils.screens.forgot_password)
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.primary,
                                            fontFamily: fonts.kronaOneRegular,
                                            fontSize: 11,
                                        }}
                                    >Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
