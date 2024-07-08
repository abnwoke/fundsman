import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import queryString from "query-string";
import axios from "axios";
import config from "../../utils/config";
import utils from "../../utils";





const getAppointmentsKeyfacilitations = createAsyncThunk(
    'appointment/getAppointmentsKeyfacilitations',
    async (data) => {
        const token = data.token;
        delete data.token;
        const query = queryString.stringify(data);
        const response = await axios.get(`${config.api_url}/api/appointment/get-appointment-keyfacilitation-for-user/${data.slug}`,
            {
                headers: {
                    Authorization: `Bearer ` + token,
                },
            }
        );
        return response.data;
    },
    {
        // Debounce requests to prevent excessive API calls
        throttle: 1000,
    }
);


const getBookings = createAsyncThunk(
    'appointment/getBookings',
    async (data) => {
        const token = data.token;
        delete data.token;
        const query = queryString.stringify(data);
        const response = await axios.get(`${config.api_url}/api/appointment/booking/${data.slug}`,
            {
                headers: {
                    Authorization: `Bearer ` + token,
                },
            }
        );
        return response.data;
    },
    {
        // Debounce requests to prevent excessive API calls
        throttle: 1000,
    }
);



const initialState = {
    appointments_keyfacilitations: {
        items: [],
        loading: false,
        error: null,
        initial: true,
    },
    bookings: {
        loading: false,
        error: null,
        initial: true,
    }
};

const appointment = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        reset: (state, action) => {
            return {
                ...state,
                appointments_keyfacilitations: {
                    items: [],
                    totalItems: 0,
                    totalPages: 0,
                    limit: 1,
                    page: 1,
                    loading: false,
                    error: null,
                    hasMore: false,
                    hasPrevPage: null,
                    hasNextPage: null,
                    prevPage: null,
                    nextPage: null,
                    initial: true,
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder

            // Appointments Keyfacilitations
            .addCase(getAppointmentsKeyfacilitations.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    appointments_keyfacilitations: {
                        ...state.appointments_keyfacilitations,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getAppointmentsKeyfacilitations.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log("")
                //console.log(action.payload.data)
                //console.log(action.payload.hasNextPage)
                return {
                    ...state,
                    appointments_keyfacilitations: {
                        ...state.appointments_keyfacilitations,
                        items:   action.payload,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }

            })
            .addCase(getAppointmentsKeyfacilitations.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    bookings: {
                        ...state.bookings,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })



            // Bookings
            .addCase(getBookings.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    bookings: {
                        ...state.bookings,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                //console.log("fulfilled")
                return {
                    ...state,
                    bookings: {
                        ...state.bookings,
                        ...action.payload.data,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })
            .addCase(getBookings.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    propertyTypes: {
                        ...state.propertyTypes,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })



    },
});



export default {
    appointmentReducer: appointment.reducer,
    actions: {
        getAppointmentsKeyfacilitations: getAppointmentsKeyfacilitations,
        getBookings: getBookings,
        reset: appointment.actions.reset,
    },
};


