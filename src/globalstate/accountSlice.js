import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {

  tmp: {

    selectedFriend: []
  },

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
    },

    addFriend(state, action) {
      state.friendData.friends.push(action.payload)
    },

    delFriend(state, action) {

      let index = state.friendData.friends.findIndex(friend => friend.key === action.payload)

      console.log(action.payload)
      state.friendData.friends.splice(index, 1)
    },
  },
});


export const selectAccount = (state) => state.account;

export const {
  setAccountInfo,
  setProfilePicture,
  setHasRemoteProfilePicture,
  addFriend,
  delFriend,
} = accountSlice.actions;

export default accountSlice.reducer;
