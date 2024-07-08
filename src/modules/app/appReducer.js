import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import queryString from "query-string";
import axios from "axios";
import config from "../../utils/config";
import utils from "../../utils";
import {getProperties} from "../property/propertyReducer";


const getStates = createAsyncThunk(
    'app/getStates',
    async ({slug, token}) => {
        const response = await axios.get(`${config.api_url}/api/app/country/getCountryStatesByCountrySlug/${slug}`,
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


const getCities = createAsyncThunk(
    'app/getCities',
    async ({slug, token}) => {
        const response = await axios.get(`${config.api_url}/api/app/state/getStateCitiesByStateSlug/${slug}`,
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
    newInstalled: true,
    isDarkMode: false,
    theme: 'system', // user | system
    pushToken: null,
    states: {
        items: [],
        loading: false,
        initial: false,
        error: null,
    },
    cities: {
        items: [],
        loading: false,
        initial: false,
        error: null,
    },
    location: null
};


const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            return {
                ...state,
                isDarkMode: action.payload.isDarkMode,
                theme: action.payload.theme,
            }
        },
        setLocation: (state, action) => {
            return {
                ...state,
                location: action.payload,
            }
        },
        setPushToken: (state, action) => {
            return {
                ...state,
                pushToken: action.payload,
            }
        },
        setNewInstalled: (state, action) => {
            return {
                ...state,
                newInstalled: action.payload,
            }
        },
        reset: (state, action) => {
            return {
                ...state,
                states: {
                    items: [],
                    loading: false,
                    initial: false,
                    error: null,
                },
                cities: {
                    items: [],
                    loading: false,
                    initial: false,
                    error: null,
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder

            // States
            .addCase(getStates.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    states: {
                        items: [],
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getStates.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log("")
                //console.log(action.payload)


                return {
                    ...state,
                    states: {
                        items: action.payload.data,
                        loading: false,
                        error: null,
                    }
                }

            })
            .addCase(getStates.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    states: {
                        items: [],
                        loading: false,
                        error: null,
                    }
                }
            })


            // Types
            .addCase(getCities.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    cities: {
                        items: [],
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getCities.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log(action.payload.data)

                return {
                    ...state,
                    cities: {
                        items: action.payload.data,
                        loading: false,
                        error: null,
                    }
                }

            })
            .addCase(getCities.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    cities: {
                        items: [],
                        loading: false,
                        error: null,
                    }
                }
            })



    },
});

export default {
    appReducer: app.reducer,
    actions: {
        setLocation: app.actions.setLocation,
        setDarkMode: app.actions.setDarkMode,
        setPushToken: app.actions.setPushToken,
        setNewInstalled: app.actions.setNewInstalled,
        getStates:getStates,
        getCities:getCities,
        reset: app.actions.reset,
    },
    //user: user
};









