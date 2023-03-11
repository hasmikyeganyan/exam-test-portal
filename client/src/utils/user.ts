import { IUserModel } from "./../models/userModel";

export const isAdmin = (user: IUserModel): boolean =>
  user.role?.name.toLowerCase() === "admin";
