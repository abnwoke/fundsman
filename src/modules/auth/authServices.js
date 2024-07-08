/**************************************************
 *                Auth   Services                  *
 **************************************************/
import config from "../../utils/config";


export default class AuthServices {

    static async login(data) {
        const response = await fetch(`${config.api_url}/api/auth/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async register(data) {
        const response = await fetch(`${config.api_url}/api/auth/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async checkAccount(data) {
        const response = await fetch(`${config.api_url}/api/auth/check-account/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async sendTemporaryPassword(data) {
        const response = await fetch(`${config.api_url}/api/auth/send-temporary-password`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    /********************************/

    static async logout() {
        try {
            const response = await fetch(`${config.api_url}/api/auth/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
            const jsonResponse = await response.json();
            // const {  success } = jsonResponse;
            //console.log("Logout Successful");
            return jsonResponse;
        } catch (error) {
            console.log(error);
        }
    }

    static async sendPasswordResetEmail(email) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/sendResetPasswordEmail`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({email: email})
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            // console.log(error);
        }
    }

    static async changePassword(data) {
        const response = await fetch(`${config.api_url}/api/auth/change-password`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async resetPassword(data) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/resetPassword`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data)
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            // console.log(error);
        }
    }

    static async sendEmailVerification(email) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/sendVerificationEmail`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({email: email})
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            //console.log(error);
        }
    }

    static async confirmEmail(token) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/confirmEmail`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({token: token})
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            //console.log(error);
        }
    }

    static async verifyPasswordResetToken(token) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/verifyPasswordResetToken`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({token: token})
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            //console.log(error);
        }
    }

    static async verifyAuthToken(token) {
        try {
            const response = await fetch(`${config.api_url}/api/auth/verifyAuthToken`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({token: token})
            });
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            return error
            //console.log(error);
        }
    }

}
