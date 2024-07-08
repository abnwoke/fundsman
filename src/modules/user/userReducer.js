import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: (state, action) => {
            return {
                isLoggedIn: false,
                token: null,
            }
        },
        editProfile: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        updateProfile: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },


        /*addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },*/
    },
});

export default {
    userReducer: user.reducer,
    actions: {
        login: user.actions.login,
        logout: user.actions.logout,
        editProfile: user.actions.editProfile,
        updateProfile: user.actions.updateProfile,
    },
    //user: user
};


