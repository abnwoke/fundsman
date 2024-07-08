/**************************************************
 *                Auth   Services                 *
 **************************************************/
import config from "../../utils/config";


export default class WalletServices {


    static async addPaymentMethod(data, token) {
        const response = await fetch(`${config.api_url}/api/wallet/add-payment-method`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'POST',
            body: data
        });
        return await response.json();
    }

    static async editPaymentMethod(data, token) {
        const response = await fetch(`${config.api_url}/api/wallet/edit-payment-method`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }

    static async deletePaymentMethod(data, token) {
        const response = await fetch(`${config.api_url}/api/wallet/delete-payment-method`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'DELETE',
            body: data
        });
        return await response.json();
    }


    static async makeWithdrawal(data, token) {
        const response = await fetch(`${config.api_url}/api/wallet/make-withdrawal`, {
            headers: {
                'Authorization': `Bearer ` + token
            },
            method: 'POST',
            body: data
        });
        return await response.json();
    }






}
