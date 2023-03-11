import { IUserModel } from "./../models/userModel";

export const authLogin = async (
  email: string,
  password: string
): Promise<string> => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/signin`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim(),
    }),
  }).then(async (res) => {
    if (!res) throw Error("No response");

    const data = await res.json();
    const token = data.token;

    if (!token) throw Error("No token provided");

    return token;
  });
};

export const authSelf = async (): Promise<IUserModel> => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/self`;

  return fetch(url, {
    headers: {
      authorization: "bearer " + localStorage.getItem("token") ?? "",
    },
  }).then(async (res) => {
    if (!res) throw Error("No response");

    const data = await res.json();
    const user: IUserModel | undefined = data.user;

    if (!user) throw Error("User not found");

    return user;
  });
};
