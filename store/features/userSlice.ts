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
      Object.assign(state, action.payload);
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.uid = null
    },
  }
})

export const { removeUser, setUser } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
