/**************************************************
 *                Auth   Services                  *
 **************************************************/
import config from "../../utils/config";


export default class LandlordServices {

    static keys(getData = {}) {
        let data = {
            slug: null,
            query: ''
        }
        if(getData){
            data = getData
        }

        return{
            getNotifications: `${config.api_url}/api/notification/${data?.slug}`,
        }
    }


    static async getNotifications(data) {
        const response = await fetch(`${config.api_url}/api/notification/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + data.token
            },
            method: 'GET',
        });
        return await response.json();
    }


    static async updateNotificationSeen(data) {
        try {
            const response = await fetch(`${config.api_url}/api/notification/${data.slug}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${data.token}`
                },
                method: 'PUT',
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            return error
            // console.log(error);
        }
    }



}
