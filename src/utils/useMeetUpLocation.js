import {useState, useEffect} from "react";
import {Linking, Platform} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';



import config from "./config";
import * as Location from "expo-location";


export const useMeetUpLocation = (props) => {
    let api = config.google_api_key;
    let travelMode = 'driving'; // you can change this to 'walking', 'transit', etc.

    const destinationLatitude = props.latitude;
    const destinationLongitude = props.longitude;

    const [url, setUrl] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [origin, setOrigin] = useState(null); // 'current location' can be used as the starting point

    const [destination, setDestination] = useState(null);



    useEffect(() => {
        (async () => {
            try {

                //Request Permission
                let { status } = await Location.requestForegroundPermissionsAsync();
                //console.log(status)
                if (status !== 'granted') {
                    //setErrorMsg('Permission to access location was denied');
                    return;
                }

                // Get the current position
                let location = await Location.getCurrentPositionAsync({
                    //accuracy: utils.isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest,
                    accuracy: Location.Accuracy.BestForNavigation,
                });

                const {latitude, longitude} = location?.coords;
                if(latitude && longitude){
                    setCurrentLatitude(latitude)
                    setCurrentLongitude(longitude);
                    Geocoder.from(latitude, longitude).then((json) => {
                        const locationName = json.results[0].formatted_address;
                        setOrigin(locationName)
                    }).catch((error) => console.error(error));
                }


            } catch (e) {}
        })();
    }, []);




    useEffect(()=>{
        if(origin && destination){
            const encodedOrigin = encodeURIComponent(origin);
            const encodedDestination = encodeURIComponent(destination);
            //&dir_action=navigate

            const set_url = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=${travelMode}`;
            setUrl(set_url);
        }
    },[origin, destination])



    //console.log(destination)


    return {
        url,
        destinationLatitude,
        destinationLongitude,
        origin,
        destination
    }
}