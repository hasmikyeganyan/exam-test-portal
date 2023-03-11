import User from "../../classes/User";
import UserRole from "../../enums/UserRole";

export const userAdapter = (data: any): User => {
  const { id, name, lastname, email, role } = data;

  if (!id || !name || !lastname || !email || !role)
    throw Error("Data is invalid for user adapter");

  return { id, name, lastname, email, role: role.name };
};
