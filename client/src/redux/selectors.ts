import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store/store"



const selectSelf = (state: RootState) => state;


const userSelector = createSelector(selectSelf, (state) => state.auth.user);
const examResultSelector = createSelector(selectSelf,(state)=>state.examResults.results)







export {userSelector,examResultSelector}