import { SET_EXAM } from "./actions";
import { IReduxAction } from "../store";
import {Exam} from "../../interfaces/Exam";


interface IState {
    exam?: Exam;
}

const INITIAL_STATE: IState = {};

const reducer = (state = INITIAL_STATE, action: IReduxAction): IState => {
    switch (action.type) {
        case SET_EXAM:
            return {
                ...state,
                exam: action.payload
            }
        default:
            return state
    }
    
}

export default reducer;