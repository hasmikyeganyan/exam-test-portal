import { call, put, takeLatest} from "redux-saga/effects"
import { getSelf, register, setUser } from "./authSlice";
import * as authService from "../services/authService";
import *as examResultService from "../services/examResultService"

import toast, { Toaster } from "react-hot-toast";

import {addExamResult, getExamResultsSuccess, getExamResults, getAllExamResults} from "./examResultsSlice";

function* registerSaga({ payload }: ReturnType<any>){
    try{
        const { data}  = yield call(authService.register, payload);
        localStorage.setItem('token', data.token)
        yield put(setUser((data.user)))
    } catch(e) {
        toast.error("Email already exists")
    }
}

function* getSelfSaga({ payload }: ReturnType<any>){
    try{
        const { data}  = yield call(authService.getSelf);
        yield put(setUser((data.user)))
    } catch(e) {
        console.log(e)
    }
}
function* examResultsSaga({payload}:ReturnType<any>){
    try{
        const{ data }= yield call(examResultService.addexamResult,payload)
        if (data) {

            toast.success("Your file uploaded successfully")

            // yield put(addExamResult((data.examResult)))
        }
        
    } catch(e) {
        console.log(e)}
}
function* getAllExamResultSaga({payload}:ReturnType<any>) {
   try {
       const {data} = yield call(examResultService.getExamResults)
       yield put(getExamResultsSuccess(data))


       }catch (error){
       console.log(error)
   }

   }


export default function* watchAuthSaga() {
    yield takeLatest(register.type, registerSaga)
    yield takeLatest(getSelf.type, getSelfSaga)
    yield takeLatest(addExamResult.type,examResultsSaga)
    yield takeLatest(getAllExamResults.type,getAllExamResultSaga)
}