import { Exam } from "../../interfaces/Exam";
import { IReduxAction } from "../store";

export const SET_EXAM = "SET_EXAM"


export const saveExamAction = (exam: Exam): IReduxAction => ({
    type: SET_EXAM,
    payload: exam,
})