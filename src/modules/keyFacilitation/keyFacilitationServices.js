/**************************************************
 *                Auth   Services                 *
 **************************************************/
import config from "../../utils/config";


export default class KeyFacilitationServices {


    static async setDelegateAcceptance(data, token) {
        const response = await fetch(`${config.api_url}/api/key-facilitation/set-delegate-acceptance`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }


    static async setStatus(data, token) {
        const response = await fetch(`${config.api_url}/api/key-facilitation/delegate-set-status`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }







}
