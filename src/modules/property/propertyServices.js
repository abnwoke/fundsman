/**************************************************
 *                Auth   Services                 *
 **************************************************/
import config from "../../utils/config";


export default class PropertyServices {




    static keys(getData = {}) {
        let data = {
            slug: null,
            query: ''
        }
        if(getData){
            data = getData
        }

        return{
            getProperties: `${config.api_url}/api/property/public/get-properties-without-pagination?${data.query}`,
            getProperty: `${config.api_url}/api/property/${data.slug}`,
            getSimilarProperties: `${config.api_url}/api/property/similar-properties/${data.slug}?${data.query}`,
            getRides: `${config.api_url}/api/appointment/ride`,
            getBookings: `${config.api_url}/api/appointment/booking/${data.slug}`,
            getAppointments: `${config.api_url}/api/appointment/get-appointments-for-user/${data.slug}`,
            getAppointmentsKeyFacilitation: `${config.api_url}/api/appointment/get-appointment-keyfacilitation-for-user/${data.slug}`,
            myProperties: `${config.api_url}/api/property/user-properties/${data.slug}?${data.query}`,
            getPropertyTypes: `${config.api_url}/api/property-types`,
        }
    }
    

    static async getProperty(data) {
        const response = await fetch(`${config.api_url}/api/property/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async likeProperty(data) {
        const response = await fetch(`${config.api_url}/api/property/like`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async payForProperty(data) {
        const response = await fetch(`${config.api_url}/api/property/payment`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async holdPayLater(data) {
        const response = await fetch(`${config.api_url}/api/property/hold-pay-later`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

}
