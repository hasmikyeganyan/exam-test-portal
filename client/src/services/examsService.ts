import { API_URL } from "../constants/env";
import axios from 'axios';


const getExamsList = () => {
    return axios.get(`${API_URL}/exams-list`);
}

const downloadExam = () => {
    return axios.get(`${API_URL}/exams/download`).then((response) => {
        // create file link in browser's memory
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const fileName = response.headers['content-disposition'].split('/')[1];
        link.href = downloadUrl;
        link.setAttribute('download', fileName); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
    });
}

export {
    getExamsList,
    downloadExam
}