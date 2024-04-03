import { IUserInfor } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserInfor: IUserInfor = {
  email: "",
  id: "",
  name: "",
};

const UserSlice = createSlice({
  name: "counter",
  initialState: initialUserInfor as IUserInfor,
  reducers: {
    //update User
    updateUser: (state, action: PayloadAction<IUserInfor>) => {
      console.log(state);
      // Object.assign(state, action.payload);
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export default UserSlice;
export const UserReducer = UserSlice.reducer;
export const UserAction = UserSlice.actions;
