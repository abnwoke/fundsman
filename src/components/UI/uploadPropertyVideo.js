import {Card, View} from "react-native-ui-lib";
import {Image, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import {COLORS, FONTFAMILY, ICONS, IMAGES, lightTheme} from "../../constants";
import React, {useEffect, useRef, useState} from "react";
import Video from "react-native-video";
import * as ImagePicker from "react-native-image-picker";


const UploadPropertyVideo = (props) => {

    const {
        value = {
            value: '',
            isValid: false,
            error: '',
            preview: '',
            remove: false
        },
        setValue, allowRemove = true,
        label = null, required = false,
        containerStyle
    } = props;

    const [inputValue, setInputValue] = useState({
        ...value,
        preview: value.preview ? value.preview : '',
    });

    const {height, width} = useWindowDimensions();
    const [playVideo, setPlayVideo] = useState(false);
    const [pause, setPause] = useState(true);
    const [videoHeight, setVideoHeight] = useState(220);
    const player = useRef(null);
    const onPlayVideo = () => {
        setPlayVideo(true)
        setPause(false)
    }

    useEffect(() => {
        if (value.action === "validate") {
            if (required && !value.value) {
                setInputValue({
                    ...inputValue,
                    isValid: false,
                    error: 'Required',
                });
            } else {
                setInputValue({
                    ...inputValue,
                    isValid: (!value.error && value.value) ? true : false,
                    error: value.error ? value.error : null,
                });
            }
        }

        if (value.action === "reset") {
            const resetValue = {
                value: '',
                isValid: true,
                error: '',
                preview: '',
                remove: false
            }
            setInputValue(resetValue);
            if (typeof setValue === "function") {
                setValue(resetValue)
            }
        }
    }, [value]);

    const onRemove = () => {
        setInputValue({
            ...inputValue,
            value: '',
            isValid: false,
            preview: '',
            error: null,
            remove: true
        });
    }

    const onChange = async () => {
        try {
            const options = {
                title: 'Select Video',
                type: 'library', // 'capture' | 'library'
                selectionLimit: 0,
                //quality: 1, //0 to 1, photos
                mediaType: 'video', // 'photo' | 'video' | 'mixed'
                includeBase64: false,
                //saveToPhotos: true,
                presentationStyle: 'fullScreen',
                formatAsMp4: true,
            }

            const res = await ImagePicker.launchImageLibrary(options);
            if (res.assets && res.assets[0]) {
                const file = res.assets[0];
                const data = {
                    preview: {uri: file.uri},
                    value: file,
                    error: null,
                    isValid: true,
                    remove: false
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
        } catch (e) {
        }
    }


    return (
        <Card
            style={{
                marginTop: 15,
                overflow: 'hidden'
            }}
        >

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    paddingBottom: 4
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: FONTFAMILY.poppinsSemiBold,
                        color: lightTheme.text
                    }}
                >Video</Text>


                {inputValue.preview &&
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => onRemove()}
                    >
                        <Image
                            source={ICONS.cancel}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.danger
                            }}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={{
                            marginLeft: 20
                        }}
                        onPress={() => onRemove()}
                    >
                        <Image
                            source={ICONS.upload_video}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                }
            </View>


            {inputValue.preview &&
            <Video
                source={inputValue.preview}
                //source={typeof post.video === 'string' ? {uri: post.video} : post.video}
                ref={player}
                //poster={'https://baconmockup.com/300/200'}
                poster={Image.resolveAssetSource(IMAGES.default_video_thumbnail).uri}
                posterResizeMode='cover'
                paused={pause}
                controls={true}
                fullScreen={true}
                playInBackground={false}
                playWhenInactive={false}
                resizeMode='contain'
                videoStyle={{
                    height: '100%',
                    width: '100%',
                }}
                onLoad={video => {
                    const {width: getVideoWidth, height: getVideHeight} = video.naturalSize;
                    const heightScaled = getVideHeight * (width / getVideoWidth);
                    setVideoHeight(heightScaled)
                    //console.log(heightScaled)
                    if (player) {
                        player?.current?.seek(0);
                    }
                }}

                onEnd={() => setPause(true)}
                style={{
                    backgroundColor: '#000',
                    //position: 'absolute',
                    //top: 0,
                    //left: 0,
                    //bottom: 0,
                    //right: 0,
                    width: '100%',
                    height: 200
                }}
            />
            }


            {!inputValue.preview &&
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onChange()}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <View
                    center
                    style={{
                        paddingTop: 20,
                        paddingBottom: 5
                    }}
                >
                    <Image
                        source={ICONS.upload_video}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: COLORS.primary,
                        }}
                    />
                </View>
            </TouchableOpacity>
            }

        </Card>
    )
}

export default UploadPropertyVideo
