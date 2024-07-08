/**************************************************
 *                Auth   Services                  *
 **************************************************/
import config from "../../utils/config";


export default class LandlordServices {

    static async addLandlord(data, token) {
        const response = await fetch(`${config.api_url}/api/landlord`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'POST',
            body: data
        });
        return await response.json();
    }

    static async updateLandlord(data, token) {
        const response = await fetch(`${config.api_url}/api/landlord`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }

    static async getLandlords(data) {
        const response = await fetch(`${config.api_url}/api/landlord`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getLandlord(data) {
        const response = await fetch(`${config.api_url}/api/landlord/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async deleteLandlord(data) {
        const response = await fetch(`${config.api_url}/api/landlord/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'DELETE',
        });
        return await response.json();
    }

}
