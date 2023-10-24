import { createSlice } from "@reduxjs/toolkit";


const sanityDataSlice = createSlice({
    name:"sanityData",
    initialState:{
    products : null,
    banner: null,
    productDetails: null
    },
    reducers:{
    addSanityProducts:(state , action)=>{
        state.products  = action.payload ;
     
    },
    addSanityBanner:(state , action)=>{
        state.banner = action.payload ;
    },
    addProductDetails:(state , action)=>{
        state.productDetails = action.payload;
}
    }
})

export const {addSanityBanner , addSanityProducts , addProductDetails} = sanityDataSlice.actions;

export default sanityDataSlice.reducer;