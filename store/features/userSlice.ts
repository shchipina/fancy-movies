import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

const initialState: User = {
  email: null,
  token: null,
  uid: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.uid = null
    },
  }
})

export const { removeUser, setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
