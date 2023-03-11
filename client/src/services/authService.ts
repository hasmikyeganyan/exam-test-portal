import { API_URL } from "../constants/env";
import { IUserModel } from "../models/userModel";
import axios, { AxiosPromise } from 'axios';


export function register(data: IUserModel): AxiosPromise {
  return axios.post(`${API_URL}/auth/signup`, data);
}

export function getSelf(): AxiosPromise {
  return axios.get(`${API_URL}/auth/self`);
}
