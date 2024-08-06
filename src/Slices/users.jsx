// COULD DELETE IN THE FUTURE! 
import { createSlice } from "@reduxjs/toolkit";

let initialState= {
    users: [
        {
            id: "u1",
            name: "Leo Shang",
            email: "leoshang12@gmail.com",
            password:"abcdefg",
            reviewIds: [],
        },
        {
            id: "u2",
            name: "Ray Zhou",
            email: "rayz04@gmail.com",
            password:"hello",
            reviewIds: [],
        }
    ]
}; 

export const userSlice = createSlice({
    name: "people",
    initialState: initialState,
    reducers: {
        createUser: (state, action) => {
            const { user } = action.payload;
            console.log(user.email);
            console.log(user.password);
            // TEST REACT DISPATCH ON AUTHFORM!!!
        },
        readUser: (state, action) => {
            const { user } = action.payload;
            state.users = [user, ...state.users];
        },
        updateUser: (state, action) => {
            const { userUpdates } = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === userUpdates.id);
            if (userIndex !== -1) {
                state.users[userIndex] = { ...state.users[userIndex], ...userUpdates };
            }
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            state.users = state.users.filter((user) => user.id !== id);
        }
    }
})

export const {readUser, updateUser, deleteUser} = userSlice.actions;


export default userSlice.reducer;