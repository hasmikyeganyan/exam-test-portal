import { createSlice } from "@reduxjs/toolkit";
import { IUserModel } from "../models/userModel";
import toast from "react-hot-toast";

interface UserSliceState {
    user: IUserModel | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const initalState: UserSliceState = {
    user: null,
    isLoading: false,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    reducers: {
        register: (state, action) => {
            state.isLoading = true;
        },
        setUser: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getSelf: () => {},
        logOut: (state) => {
            localStorage.clear()
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
          }
    }
});
export const { register, setUser, getSelf,logOut } = authSlice.actions;
export default authSlice;