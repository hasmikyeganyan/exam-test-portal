import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IExamResult } from "../models/userModel";






interface ExamResultState {
    results: IExamResult[];
    loading: boolean;
    error: string | null;
}

const initialState: ExamResultState = {
    results: [],
    loading: false,
    error: null,
};

const examResultsSlice = createSlice({
    name: 'examResults',
    initialState,
    reducers: {
        addExamResult: (state, action) => {
        },
        getExamResults: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllExamResults:()=>{

        },
        getExamResultsSuccess: (state, action: PayloadAction<IExamResult[]>) => {
            state.results = action.payload;
            state.loading = false;
        },
        updateExamResult: (state, action: PayloadAction<IExamResult[]>) => {
            state.results = action.payload;
        },
        getExamResultsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addExamResult, getExamResults , getExamResultsSuccess,getAllExamResults, updateExamResult} = examResultsSlice.actions;

export default examResultsSlice;
