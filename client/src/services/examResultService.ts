import { API_URL } from "../constants/env";
import axios, { AxiosPromise } from 'axios';
import { IExamResult } from "../models/userModel";



export function addexamResult(data: IExamResult): AxiosPromise {
  return axios.post(`${API_URL}/examResults/uploadExamResults`, data, { headers: { "Content-Type": "multipart/form-data" } });
}
export function getExamResult(): AxiosPromise {
  return axios.get(`${API_URL}/examResults`,)
}

export function getExamResults(): AxiosPromise {
  return axios.get(`${API_URL}/examResults`);

}

export const downloadExamResults = (fileUrl: string) => {
  return axios.post(`${API_URL}/examResults/download`, { fileUrl }).then((response) => {
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

export const evaluateCandidate = (score: number, id: number) => {
  return axios.put(`${API_URL}/examResults/evaluate`, { score, id });
}

export const deleteExam = (id: number) => {
  return axios.delete(`${API_URL}/examResults/${id}`);
}

export const searchExamResults = (searchString: string): Promise<IExamResult[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/examResults/search`, {
      method: "POST",
      headers: {
        "authorization": `bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        searchString
      })
    }).then(resp => resp.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
