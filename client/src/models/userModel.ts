export interface IUserRoleModel {
  id: number;
  name: string;
}

export interface IUserModel {
  id?: number;
  email: string;
  name: string;
  lastname: string;
  role?: IUserRoleModel;
}
export interface IExamResult{
  id:number,
  score?:number,
  name?:string,
  lastname?:string,
  fileUrl?:string,
  email?:string|number,
  user?:{
    name:string,
    lastname:string,
    email:string

  },
  exam?: {
    fileUrl?: string;
  }
}
// export interface IExamResult {
//   id: number;
//   course: string;
//   name: string;
//   lastname: string;
//   email: string;
//   submittedAt: string;
// }
