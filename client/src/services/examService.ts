import {Exam} from "../interfaces/Exam";
import axios from "axios";
import {API_URL} from "../constants/env";

class ExamService {
    getExams = async (): Promise<Exam[]> => {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/exams`).then(resp => resp.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    createExam = async (data: any): Promise<Exam> => {
        return axios.post(`${API_URL}/exams`, data, {headers: { "Content-Type": "multipart/form-data" }});
    }
}

const examService = new ExamService();
export default examService;