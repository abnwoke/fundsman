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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {Card} from "react-native-ui-lib";

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

export default function Login({navigation}) {
    const app = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const {colors, sizes, fonts} = useTheme();

    const [email, setEmail] = useState({value: '', isValid: false, action: '', error: ''});
    const [password, setPassword] = useState({value: '', isValid: false, action: '', error: ''});

    const [accountNumber, setAccountNumber] = useState({value: '', isValid: false, action: '', error: ''});
    const [section, setSection] = useState('account_number'); //account_number
    const [type, setType] = useState('email');
    const [user, setUser] = useState({"email": "agent@gmail.com", "id": "63f814a960a054426ce284a5", "mobile_number": "0244491485", "slug": "ab78b"});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [checkAccount] = Auth.hooks.useCheckAccount();
    const [sendTemporaryPassword] = Auth.hooks.useSendTemporaryPassword();


    const onChangeAccountNumber = useCallback((value) => {
        setAccountNumber(value)
    }, []);


    const accountNumberInput = useMemo(() => {
        return <InputUI
            value={email}
            label='Account Number'
            placeholder='Account Number'
            contentType='Account Number'
            containerStyle={{
                //marginTop: 10
                //marginBottom: -5
            }}
            setValue={onChangeAccountNumber}
        />;
    }, [accountNumber, onChangeAccountNumber]);


    const LoadingSection = () =>{
        return(
            <View
                style={{
                    marginVertical: 10
                }}
            >
                <ActivityIndicator color={colors.primary} />
            </View>
        )
    }


    const ResultSection = () => {
        return (
            <View>

                <Text
                    style={{
                        marginVertical: 10,
                        color: colors.text,
                        fontFamily: fonts.poppinsSemiBold,
                        fontSize: 14
                    }}
                >
                    Temporary password sent to:
                </Text>

                <Text
                    style={{
                        marginVertical: 1,
                        color: colors.primary,
                        fontFamily: fonts.kronaOneRegular,
                        fontSize: 11.5,
                    }}
                >
                    {type === 'email'? user.email : user.mobile_number}
                </Text>

                <Text
                    style={{
                        marginVertical: 18,
                        color: colors.text,
                        fontFamily: fonts.kronaOneRegular,
                        fontSize: 11,
                    }}
                >
                    You can now log in with your temporary password.
                </Text>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >

                    <ButtonUI
                        //loading={state.loading}
                        //disabled={state.loading}
                        label='Login'
                        //icon='login'
                        labelStyle={{
                            marginTop: 5,

                        }}
                        style={{
                            marginTop: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            navigation.navigate(utils.screens.login)
                        }}
                    />
                </View>

            </View>
        )
    }


    const MessageTypeSection = ({}) => {

        const onSendMessage = async (type) =>{
            try {

                setLoading(true);
                setType(type);
                setMessage('');
                setSuccess('');

                const data = {
                    slug: user.slug,
                    type: type,
                }

                const response = await sendTemporaryPassword(data);
                const res = response.data
                setLoading(false);

                console.log(res)

                if (res.success) {
                    setSection('result');
                } else {
                    setMessage(res.message);
                }

            } catch (e) {
                console.log(e)
                setLoading(false);
                setMessage('There was an error. Please try again!');
            }
        }

        // console.log(loading)


        const MessageTypeBtn = ({type}) => {

            const label = type === 'email'? 'Email' : 'Mobile Number';
            const value = type === 'email'?  user.email : user.mobile_number;

            return (
                <Card
                    onPress={()=>{
                        if(!loading) {
                            onSendMessage(type)
                        }
                    }}
                    activeOpacity={loading? 1 : 0.5}
                    style={{
                        backgroundColor: loading? colors.text3 : colors.white,
                        marginVertical: 12,
                        paddingHorizontal: 7,
                        paddingVertical: 8,
                        borderWidth: utils.isIOS? 1 : 0.5,
                        borderColor: colors.transparentBlack1,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            fontFamily: fonts.kronaOneRegular,
                            fontSize: 11,
                        }}
                        numberOfLines={1}
                    >
                        {label} <Text style={{color: colors.primary}}>{value}</Text>
                    </Text>
                </Card>
            )
        }

        return (
            <View>

                <MessageUI
                    message={message}
                    success={success}
                />

                <Text
                    style={{
                        marginVertical: 10,
                        color: colors.text,
                        fontFamily: fonts.poppinsSemiBold,
                        fontSize: 14
                    }}
                >
                    Where do we send your temporary password?
                </Text>


                {loading && <LoadingSection />}

                {!loading &&
                    <Fragment>
                        <MessageTypeBtn type="email"/>
                        {user.mobile_number && <MessageTypeBtn type="phone"/> }
                    </Fragment>
                }

            </View>
        )
    }




    //Auth.utils.checkAccount()

    const onSubmit = async () => {
        try {
            onChangeAccountNumber({...accountNumber, action: 'validate'})
            setMessage('');
            setSuccess('');


            if (!accountNumber.isValid) {
                setMessage('Please enter your account number');
                return;
            }

            const data = {
                slug: accountNumber.value,
            }

            setLoading(true);

            const response = await checkAccount(data);
            const res = response.data
            setLoading(false);

            console.log(res)

            if (res.success) {
                setUser(res.data);
                setSection('message_type');
            } else {
                setMessage(res.message);
            }



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
                source={utils.images.launch_screen}
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
               <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: 70
                    }}
                    behavior={utils.isIOS ? "padding" : "height"}
                >

                    <View
                        style={{
                            //flex: 1,
                            //position: 'absolute',
                            bottom: 10,
                            marginHorizontal: 20,
                            // width: '100%',
                            //backgroundColor: COLORS.primaryTransparent80,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 15,
                                padding: 0,
                                paddingHorizontal: 18,
                                paddingTop: 15,
                                paddingBottom: 20,
                            }}
                        >


                            {section === 'account_number' &&
                            <Fragment>
                                <MessageUI
                                    message={message}
                                    success={success}
                                />

                                {accountNumberInput}

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
                                        label='Next'
                                        //icon='login'
                                        style={{
                                            marginTop: 0
                                        }}
                                        onPress={onSubmit}
                                    />
                                </View>
                            </Fragment>
                            }


                            {section === 'message_type' && <MessageTypeSection/>}

                            {section === 'result' && <ResultSection/>}


                        </View>

                    </View>

                </KeyboardAwareScrollView>
            </ImageBackground>
        </Fragment>
    );
}
