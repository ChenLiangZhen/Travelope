import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {

  info: {

    isLoggedIn: false,

    id: "",
    email: "",
    password: "",
    nickname: "",

    profilePictureLocalPath: "",
    hasRemoteProfilePicture: false,

    appleAccountLink: {},
  },

  friendData: {
    friends: [
      {
        id: 1,
        name: "JACOB",
        tag: "Friend",
      },
      {
        id: 2,
        name: "Mary",
        tag: "Girlfriend",
      },
    ],
  },

  settings: {},
};

const accountSlice = createSlice({

  name: "account",
  initialState,

  reducers: {

    setAccountInfo(state, action) {
      state.info = action.payload;
    },

    setProfilePicture(state, action) {
      state.info.profilePictureLocalPath = action.payload;
    },

    setHasRemoteProfilePicture(state) {
      state.info.hasRemoteProfilePicture = true
    }
  },
});


export const selectAccount = (state) => state.account;

export const {
  setAccountInfo,
  setProfilePicture,
  setHasRemoteProfilePicture,
} = accountSlice.actions;

export default accountSlice.reducer;
