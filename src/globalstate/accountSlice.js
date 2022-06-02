import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState = {
    info: {
        email: "",
        password: "",
        accountName: ""
    },
    personalization: {
        interestedCategory: [false,false,false,false,false,false,false,false,false,false,false,false]
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

        setInterestedCategory(state, action) {
            state.personalization.interestedCategory = action.payload
        }
    },
})

export const selectAccount = (state) => state.account
export const { setAccountInfo, setInterestedCategory } = accountSlice.actions
export default accountSlice.reducer
