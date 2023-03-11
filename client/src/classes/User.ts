import UserRole from "../enums/UserRole";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: UserRole;
}

export default User;
