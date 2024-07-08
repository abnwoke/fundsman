import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../utils/config";
import utils from "../../utils";
import queryString from "query-string";


const getProperties = createAsyncThunk(
    'property/getProperties',
    async (data) => {
        const token = data.token;
        delete data.token;
        const query = queryString.stringify(data);
        const response = await axios.get(`${config.api_url}/api/properties?${query}`,
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


const getFeaturedProperties = createAsyncThunk(
    'property/getFeaturedProperties',
    async (data) => {
        const token = data.token;
        delete data.token;
        const query = queryString.stringify(data);
        const response = await axios.get(`${config.api_url}/api/properties?${query}`,
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


const getNewListingProperties = createAsyncThunk(
    'property/getNewListingProperties',
    async (data) => {
        const token = data.token;
        delete data.token;
        const query = queryString.stringify(data);
        const response = await axios.get(`${config.api_url}/api/properties?${query}`,
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


const getPropertyTypes = createAsyncThunk(
    'property/getPropertyTypes',
    async (token) => {
        const response = await axios.get(`${config.api_url}/api/property-types`,
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
    properties: {
        items: [],
        totalItems: 0,
        totalPages: 0,
        limit: 1,
        page: 1,
        loading: false,
        error: null,
        hasMore: true,
        hasPrevPage: null,
        hasNextPage: null,
        prevPage: null,
        nextPage: null,
        initial: true,
    },
    featured_properties: {
        items: [],
        loading: false,
        error: null,
        initial: true,
    },
    new_listing_properties: {
        items: [],
        loading: false,
        error: null,
        initial: true,
    },
    propertyTypes: {
        items: [],
        loading: false,
        error: null,
        initial: true,
    }
};

const property = createSlice({
    name: 'property',
    initialState,
    reducers: {
        resetProperties: (state, action) => {
            return {
                ...state,
                properties: {
                    ...state.properties,
                    initial: true,
                    items: [],
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder

            // Properties
            .addCase(getProperties.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getProperties.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log("")
                //console.log(action.payload.data)
                //console.log(action.payload.page)
                const items = state?.properties?.items ? state.properties.items : [];
                const newItems = [...items, ...action.payload.data]
                const filteredItems = utils.uniqueSlug(newItems)

                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        items: (action.payload.page === 1 || action.payload.page === 0) ? action.payload.data : filteredItems,
                        //items: filteredItems,
                        page: action.payload.page,
                        loading: false,
                        initial: false,
                        error: null,
                        totalPages: action.payload.totalPages,
                        totalItems: action.payload.total,
                        limit: action.payload.limit,
                        hasPrevPage: action.payload.hasPrevPage,
                        hasNextPage: action.payload.hasNextPage,
                        prevPage: action.payload.prevPage,
                        nextPage: action.payload.nextPage,
                        hasMore: action.payload.hasNextPage,
                    }
                }

            })
            .addCase(getProperties.rejected, (state, action) => {
                console.log("rejected "+ new Date().getTime())
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })


            // Types
            .addCase(getPropertyTypes.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    propertyTypes: {
                        ...state.propertyTypes,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getPropertyTypes.fulfilled, (state, action) => {
                //console.log("fulfilled")
                return {
                    ...state,
                    propertyTypes: {
                        ...state.propertyTypes,
                        items: action.payload.data,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }

            })
            .addCase(getPropertyTypes.rejected, (state, action) => {
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


            // Featured Properties
            .addCase(getFeaturedProperties.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    featured_properties: {
                        ...state.featured_properties,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getFeaturedProperties.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log("")
                //console.log(action.payload.data)
                return {
                    ...state,
                    featured_properties: {
                        ...state.featured_properties,
                        items: action.payload.data,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }

            })
            .addCase(getFeaturedProperties.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    featured_properties: {
                        ...state.featured_properties,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })


            // New Listing Properties
            .addCase(getNewListingProperties.pending, (state) => {
                //console.log("pending")
                return {
                    ...state,
                    new_listing_properties: {
                        ...state.new_listing_properties,
                        loading: true,
                        error: null,
                    }
                }
            })
            .addCase(getNewListingProperties.fulfilled, (state, action) => {
                //console.log("fulfilled")
                //console.log("")
                //console.log(action.payload.data)
                return {
                    ...state,
                    new_listing_properties: {
                        ...state.new_listing_properties,
                        items: action.payload.data,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })
            .addCase(getNewListingProperties.rejected, (state, action) => {
                //console.log("rejected")
                return {
                    ...state,
                    new_listing_properties: {
                        ...state.new_listing_properties,
                        loading: false,
                        initial: false,
                        error: null,
                    }
                }
            })


    },
});

export {
    getProperties
};

export default {
    propertyReducer: property.reducer,
    actions: {
        getProperties: getProperties,
        getFeaturedProperties: getFeaturedProperties,
        getNewListingProperties: getNewListingProperties,
        getPropertyTypes: getPropertyTypes,
        resetProperties: property.actions.resetProperties,
    },
};


