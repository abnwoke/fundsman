/**************************************************
 *                User   Services                  *
 **************************************************/

// libraries
import config from "../../utils/config";


export default class UserServices {


    static async getUser(data) {
        const response = await fetch(`${config.api_url}/api/user/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'GET',
        });
        return await response.json();
    }


    static async updateUser(data, token) {
        const response = await fetch(`${config.api_url}/api/user`, {
            headers: {
                //'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }



    static async updatePushToken(pushToken, token) {
        try {
            const response = await fetch(`${config.api_url}/api/user/updatePushToken/${pushToken}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${token}`
                },
                method: 'PUT',
            });
            return await response.json();
        } catch (e) {
            console.log(e)
            return  null
        }
    }


    static async deletePushToken(pushToken, token) {
        try {
            const response = await fetch(`${config.api_url}/api/user/updatePushToken/${pushToken}?clear=yes`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${token}`
                },
                method: 'PUT',
            });
            return await response.json();
        } catch (e) {
            console.log(e)
            return  null
        }
    }


}
