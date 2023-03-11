import NewUserDto from "../interfaces/NewUserDto";
import Role from "../interfaces/Role";
// import SelectOption from "../interfaces/SelectOption";

class UserService{
    getRoles = async (): Promise<Role[]> => {
        return new Promise((resolve, reject) => {
            const options: Role[] = [
                {
                    id: 1,
                    name: "Admin",
                    createdAt: "2023-02-11T15:19:27.000z",
                    updatedAt: "2023-02-11T15:19:27.000z"
                },
                {
                    id: 2,
                    name: "Instructor",
                    createdAt: "2023-02-11T15:19:27.000z",
                    updatedAt: "2023-02-11T15:19:27.000z"
                }
   
            ];
            resolve(options);
            // cannot fetch at the moment, this is mocked data
        })
    }

    createUser = async (user: NewUserDto): Promise<string> => {
        return new Promise((resolve, reject) => {
            resolve("User created successfully")
        })
    }
}


export default new UserService();