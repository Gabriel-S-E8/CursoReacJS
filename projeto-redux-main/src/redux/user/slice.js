import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    users: [],
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action) => {
            if (action.payload.name.length <= 3) {
                alert('Nome muito curto');
                return { ...state };
            }

            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    adress: null,
                },
            };
        },

        logoutUser: (state) => {
            return {
                ...state,
                user: null,
            };
        },

        addAdress: (state, action) => {
            if (
                action.payload.location === '' ||
                action.payload.number === ''
            ) {
                alert('Preencha todos os campos');
                return { ...state };
            }

            if (state.user === null) {
                alert('Crie sua conta primeiro');
                return { ...state };
            }

            alert('Endereço adicionado com sucesso!');
            return {
                ...state,
                user: {
                    ...state.user,
                    adress: {
                        location: action.payload.location,
                        number: action.payload.number,
                    },
                },
            };
        },

        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    adress: null,
                },
            };
        },

        fetchUsers: (state, action) => {
            state.loading = true;
        },

        fetchUsersSuccess: (state, action) => {
            //console.log(action.payload);
            state.loading = false;
            state.users = action.payload;
        },

        fetchUsersFailure: (state, action) => {
            console.log('Caiu na failure');
            console.log(action.payload);
            state.loading = false;
        },
        fetchUserById: (state) => {
            console.log('Caiu no fetchUserById');
        },

        fetchUserByIdSuccess: (state, action) => {
            console.log('Caiu no fetchUserByIdSuccess');
            console.log(action.payload);
        },

        fetchUserByIdFailure: (state, action) => {
            console.log('Caiu no fetchUserByIdFailure');
            console.log(action.payload);
        },
    },
});

export const {
    createUser,
    logoutUser,
    addAdress,
    deleteAddress,
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUserById,
    fetchUserByIdSuccess,
    fetchUserByIdFailure,
} = userSlice.actions;
export default userSlice.reducer;
