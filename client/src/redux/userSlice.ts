import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../classes/User";

interface IState {
  users: User[];
}

const INITIAL_STATE: IState = {
  users: [],
};

export const slice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, deleteUser } = slice.actions;

export default slice;
