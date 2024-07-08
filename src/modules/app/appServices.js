/**************************************************
 *                AfcitiUser   Services                  *
 **************************************************/
import config from "../../utils/config";


export default class AppServices {

    static async getPropertyAmenities(data) {
        const response = await fetch(`${config.api_url}/api/property-amenities`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getLocalities(data) {
        const response = await fetch(`${config.erp_host}/api/app/localities`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getCountries(data) {
        const response = await fetch(`${config.erp_host}/api/app/countries`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getStates(data) {
        const response = await fetch(`${config.erp_host}/api/app/country/getCountryStatesByCountrySlug/${data.country}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getCities(data) {
        const response = await fetch(`${config.erp_host}/api/app/state/getStateCitiesByStateSlug/${data.state}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getPropertyTypes(data) {
        const response = await fetch(`${config.api_url}/api/property-types`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getBranches(data) {
        const response = await fetch(`${config.api_url}/api/branches`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }



}
