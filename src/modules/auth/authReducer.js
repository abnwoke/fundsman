import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    isLoggedIn: false,
    userIsVerified: false,
    token: null,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
        },

        /*toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },*/
    },
});

export default {
    authReducer: auth.reducer,
    actions: {
        login: auth.actions.login,
        logout: auth.actions.logout,
    },
    //user: user
};


