import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type userData = { email: string; password: string };

type userSliceState = {
    isLoggedIn: boolean;
    user: userData;
};

const initialState: userSliceState = {
    isLoggedIn: false,
    user: { email: "", password: "" },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInUser(
            state,
            action: {
                type: string;
                payload: userData;
            }
        ) {
            const { email, password } = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("isLoggedIn", "true");
            state.isLoggedIn = true;
            state.user.email = email;
            state.user.password = password;
        },

        signOutUser(state) {
            // console.log("in signout reducer");
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.user.email = "";
            state.user.password = "";
        },
    },
});

export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
export const getUser = (state: RootState) => state.user.user;
export const isLoggedIn = (state: RootState) => state.user.isLoggedIn;
