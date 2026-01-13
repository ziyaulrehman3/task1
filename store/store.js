import { configureStore } from '@reduxjs/toolkit';
import itemSlice from './itemSlice';

export default configureStore({
    reducer:{
        itemSlice
    }
})