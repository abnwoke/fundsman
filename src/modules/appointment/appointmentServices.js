/**************************************************
 *                Auth   Services                 *
 **************************************************/
import config from "../../utils/config";


export default class AppointmentServices {


    static async getGetAppointments({token, user}) {
        const response = await fetch(`${config.api_url}/api/appointment/get-appointments-for-user/${user}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async getPropertyBookings({token, user}) {
        const response = await fetch(`${config.api_url}/api/appointment/booking/${user}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            method: 'GET',
        });
        return await response.json();
    }

    static async bookProperty(data) {
        const response = await fetch(`${config.api_url}/api/appointment/booking`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async updateAppointmentDateTime(data) {
        const response = await fetch(`${config.api_url}/api/appointment/update-appointment-date-time`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async updateBookingDateTime(data) {
        const response = await fetch(`${config.api_url}/api/appointment/update-booking-date-time`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async removeBooking(data) {
        const response = await fetch(`${config.api_url}/api/appointment/booking/${data.booking}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'DELETE',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async cancelAppointment(data) {
        const response = await fetch(`${config.api_url}/api/appointment/cancel-appointment/${data.slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async reportAppointment(data) {
        const response = await fetch(`${config.api_url}/api/appointment/report-appointment`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async makePayment(data) {
        const response = await fetch(`${config.api_url}/api/appointment/booking/make-payment`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }


    static async updateApplication(data, token) {
        const response = await fetch(`${config.api_url}/api/appointment/update-Application`, {
            headers: {
                //'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            method: 'PUT',
            body: data
        });
        return await response.json();
    }



}

