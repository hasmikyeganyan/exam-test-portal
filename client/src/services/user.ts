import { userAdapter } from "./adapters/UsersAdapter";
import { validResponse } from "./../utils/api";
import NewUserDto from "../interfaces/NewUserDto";
import Role from "../interfaces/Role";
import User from "../classes/User";

class UserService {
  getRoles = async (): Promise<Role[]> => {
    return new Promise((resolve, reject) => {
      const options: Role[] = [
        {
          id: 1,
          name: "Admin",
          createdAt: "2023-02-11T15:19:27.000z",
          updatedAt: "2023-02-11T15:19:27.000z",
        },
        {
          id: 2,
          name: "Instructor",
          createdAt: "2023-02-11T15:19:27.000z",
          updatedAt: "2023-02-11T15:19:27.000z",
        },
      ];
      resolve(options);
      // cannot fetch at the moment, this is mocked data
    });
  };

  fetchUsers = async (): Promise<User[]> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/users`;

    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token") ?? "",
      },
    }).then(async (res) => {
      if (!validResponse(res)) throw Error("Invalid Details");

      const data = await res.json();

      return data.map((userObj: any) => userAdapter(userObj));
    });
  };

  createUser = async (user: NewUserDto): Promise<string> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/users`;

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token") ?? "",
      },
    }).then(async (res) => {
      if (!validResponse(res)) throw Error("Invalid Details");

      return "User Created Successfully";
    });
  };

  deleteUser = async (id: number): Promise<string> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/users/${id}`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token") ?? "",
      },
    }).then(async (res) => {
      if (!validResponse(res)) throw Error("Invalid Details");

      return "User Deleted Successfully";
    });
  };

  updateUserPassword = async (payload: {
    oldPassword: string;
    password: string;
  }): Promise<string> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/account/self`;

    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token") ?? "",
      },
    }).then(async (res) => {
      if (!validResponse(res)) throw Error("Invalid Details");

      return "Password Updated Successfully";
    });
  };

  searchUsers = async (searchString: string): Promise<User[]> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/users/search`
    return new Promise<User[]>((resolve, reject) => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          searchString
        }),
        headers: {
          "Content-type": "application/json",
          "authorization": "bearer " + localStorage.getItem("token") ?? "" 
        }
      }).then(resp => resp.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  }
}

export default new UserService();
