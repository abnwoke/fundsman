import Modal from "react-native-modalbox";
import React, {useEffect, useState, useRef, useCallback, useMemo} from "react";
import {ScrollView, Text, useWindowDimensions, Image, View, FlatList, TouchableOpacity} from "react-native";
import SubFooter from "../footer/SubFooter";
import {useNavigation, useTheme} from "@react-navigation/native";
import InputUI from "../UI/InputUI";
import PickerUI from "../UI/PickerUI";

import utils from "../../utils";
import {useDispatch, useSelector} from 'react-redux'
import Property from "../../modules/property";
import App from "../../modules/app";

const Location = ({showModal, setShowModal, onSaveLocation}) => {
    const {colors, sizes, fonts} = useTheme();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const location = useSelector((state) => state.app?.location);

    const {data: countries, isLoading: isLoadingCountries} = App.hooks.useCountries();
    const {data: localities, isLoading: isLoadingLocalities} = App.hooks.useLocalities();
    const states = useSelector((state) => state?.app.states);
    const cities = useSelector((state) => state?.app.cities);


    const [country, setCountry] = useState({value: '421fd', isValid: false, action: '', error: ''});
    const [state, setState] = useState({value: '50bf6', isValid: false, action: '', error: ''});
    const [city, setCity] = useState({value: '59371', isValid: false, action: '', error: ''});
    const [locality, setLocality] = useState({value: '', isValid: false, action: '', error: ''});
    //console.log("--------a-----------");

    //console.log(locality);
    //console.log(location);

    useEffect(() => {

        if(location?.country){
            onChangeCountry({value: location?.country.slug, isValid: false, action: '', error: ''})
        }

        if(location?.state){
            dispatch(App.actions.getStates({slug: location?.country.slug, token}));
            dispatch(App.actions.getCities({slug: location?.state.slug, token}));
        } else {
            dispatch(App.actions.getStates({slug: country.value, token}));
            dispatch(App.actions.getCities({slug: '50bf6', token}));
        }

        if(location?.city){
            setCity({value: location?.city.slug, isValid: false, action: '', error: ''})
        } else {
            //setCity({value: '59371', isValid: false, action: '', error: ''})
        }

        if(location?.locality){
            setLocality({value: location?.locality.slug, isValid: false, action: '', error: ''})
        } else {
            //setCity({value: '59371', isValid: false, action: '', error: ''})
        }

    }, [location])

    const onChangeCountry = useCallback((value) => {
        setCountry(value)
    }, []);
    const countryComponent = useMemo(() => {
        return <PickerUI
            value={country}
            label='COUNTRY'
            placeholder='Country'
            title='Country'
            returnValue="slug"
            returnLabel="name"
            data={countries?.data || []}
            searchPlaceholder="Search countries"
            fieldStyle='fill'
            backgroundColor={colors.primary}
            textColor={colors.white}
            floatingPlaceholder={false}
            customFieldStyle={{}}
            containerStyle={{
                //marginTop: 10
                //marginBottom: -5
            }}
            setValue={(value) => {
                //onChangeCountry(value)
                //dispatch(App.actions.getStates({slug: value.value, token}));
            }}
        />
    }, [country, onChangeCountry]);


    const onChangeState = useCallback((value) => {
        setState(value)
        onChangeCity({value: '', isValid: false, action: 'reset', error: ''})
        dispatch(App.actions.getCities({slug: value.value, token}));
    }, []);
    const stateComponent = useMemo(() => {
        if (!states) return null
        if (states?.items?.length === 0 || !states.items) return null
        return <PickerUI
            value={state}
            label='STATE OR REGION'
            placeholder='State or Region'
            title='State or Region'
            fieldStyle='fill'
            returnValue="slug"
            returnLabel="name"
            data={states?.items}
            searchPlaceholder="Search states"
            backgroundColor={colors.primary}
            textColor={colors.white}
            floatingPlaceholder={false}
            customFieldStyle={{}}
            containerStyle={{
                marginTop: 4
                //marginBottom: -5
            }}
            setValue={(value) => {
                onChangeState(value);
            }}
        />
    }, [state, onChangeState, states]);


    const onChangeCity = useCallback((value) => {
        setCity(value)
    }, []);
    const cityComponent = useMemo(() => {
        if (!cities) return null
        if (cities?.items?.length === 0 || !cities.items) return null
        return <PickerUI
            value={city}
            label='AREA'
            placeholder='Area'
            title='Area'
            returnValue="slug"
            returnLabel="name"
            data={cities?.items}
            searchPlaceholder="Search Area"
            fieldStyle='fill'
            backgroundColor={colors.primary}
            textColor={colors.white}
            floatingPlaceholder={false}
            customFieldStyle={{}}
            containerStyle={{
                marginTop: 4
                //marginBottom: -5
            }}
            setValue={onChangeCity}
        />
    }, [city, onChangeCity, cities]);


    const onChangeLocality = useCallback((value) => {
        setLocality(value)
    }, []);
    const localityComponent = useMemo(() => {
        if (!localities) return null
        if (localities?.data?.length === 0 || !localities?.data) return null
        return <PickerUI
            value={locality}
            label='SUBURBS'
            placeholder='SUBURBS'
            title='SUBURBS'
            returnValue="slug"
            returnLabel="name"
            data={localities?.data}
            searchPlaceholder="Search SUBURBS"
            fieldStyle='fill'
            backgroundColor={colors.primary}
            textColor={colors.white}
            floatingPlaceholder={false}
            customFieldStyle={{}}
            containerStyle={{
                marginTop: 4
                //marginBottom: -5
            }}
            setValue={onChangeLocality}
        />
    }, [locality, onChangeCity, localities]);


     const onSave = () =>{
         const countryData = countries?.data?.find(c=> c.slug === country.value);
         const stateData = states?.items?.find(s=> s.slug === state.value);
         const cityData = cities?.items?.find(c=> c.slug === city.value);
         const localityData = localities?.data?.find(l=> l.slug === locality.value);

         const data = {

             country: !countryData? null : {
                 name: countryData?.name,
                 slug: countryData?.slug,
             },

             state: !stateData? null : {
                 name: stateData?.name,
                 slug: stateData?.slug,
             },


             city: !cityData? null : {
                 name: cityData?.name,
                 slug: cityData?.slug,
             },

             locality: !localityData? null : {
                 name: localityData?.name,
                 slug: localityData?.slug,
             },
         }

         if (typeof onSaveLocation === "function") {
             onSaveLocation(data)
         }

         dispatch(App.actions.setLocation(data));

         setShowModal(false)

         //console.log(cityData)
     }


    return (
        <Modal
            style={{
                backgroundColor: colors.white,
                height: utils.isIOS? '48%' : "50",
                width: '70%',
                borderRadius: 20,
                overflow: 'hidden'
            }}
            position="center"
            isOpen={showModal}
            onClosed={() => setShowModal(false)}
            backButtonClose={false}
            swipeToClose={false}
            backdropPressToClose={false}
            coverScreen={true}
        >

            <View
                style={{
                    flexDirection: 'row',
                    //position: 'absolute',
                    //right: 0,
                    //top: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 99999,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.gray4
                }}
            >

                <Text
                    style={{
                        fontSize: 13,
                        fontFamily: fonts.kronaOneRegular
                    }}
                >Select Your Location</Text>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        setShowModal(false)
                    }}
                    style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={utils.icons.cancel}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: colors.gray50
                        }}
                    />
                </TouchableOpacity>

            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                    paddingVertical: 20,
                    paddingHorizontal: 10
                }}
            >

                {countryComponent}
                {stateComponent}
                {cityComponent}
                {localityComponent}


            </ScrollView>


            <SubFooter
                leftStyle={{
                    borderTopLeftRadius: 0,
                }}
                rightStyle={{
                    borderTopRightRadius: 0,
                }}
                onPressLeft={() => setShowModal(false)}
                rightIcon={utils.icons.location_fill}
                onPressRight={onSave}
                rightText="Save"
                //loading={state.loading}
            />
        </Modal>
    )
}

export default Location
