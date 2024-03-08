import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './Slice/appConfigSlice'

export default configureStore({
    reducer:{
        appConfigReducer
    }
})