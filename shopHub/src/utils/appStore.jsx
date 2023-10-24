import { configureStore } from "@reduxjs/toolkit";
import sanityDataReducer from "./sanityDataSlice";


const appStore = configureStore({
   reducer:{
     sanityData: sanityDataReducer
   }
})
export default appStore;