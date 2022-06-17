import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState = {

    info: {

        isLoggedIn: false,

        id: "",
        email: "",
        password: "",
        nickname: "",
        profilePictureLocalPath: "",

        appleAccountLink: {}
    },

    friendData: {
        friends : [
            {
                id: 1,
                name: "JACOB",
                tag: "Friend"
            },
            {
                id: 2,
                name: "Mary",
                tag: "Girlfriend"
            }
        ]
    },

    settings: {

    }
}

const accountSlice = createSlice({

    name: 'account',
    initialState,

    reducers: {
        // increment(state) {
        //     state = action.payload
        // },
        // decrement(state) {
        //     state.value--
        // },
        setAccountInfo(state, action) {
            state.info = action.payload
        },
    },
})


export const selectAccount = (state) => state.account
export const { setAccountInfo, setInterestedCategory } = accountSlice.actions
export default accountSlice.reducer
