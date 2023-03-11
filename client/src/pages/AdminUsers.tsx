import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import User from "../classes/User";
import { Table } from "../components/Table";
import { InstructorLayout } from "../layouts/InstructorLayout";
import usersService from "../services/user";
import { deleteUser, setUsers } from "../redux/userSlice";
import {RootState} from "../store/store";
import SearchBar from "../components/SearchBar";
import { userAdapter } from "../services/adapters/UsersAdapter";

export const AdminUsers = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const [tableUsers, setTableUsers] = useState<User[]>(users);

  const dispatch = useDispatch();

  useEffect(() => {
    usersService.fetchUsers().then((allUsers) => dispatch(setUsers(allUsers)));
  }, []);

  useEffect(() => {
    setTableUsers(users)
  }, [users])

  const onDelete = (id: number) => {
    usersService.deleteUser(id).then((message) => {
      dispatch(deleteUser(id));
      toast.success(message);
    });
  };

  const handleSearch = async (searchString: string) => {
    const filteredUsers = await usersService.searchUsers(searchString);
    const result = filteredUsers.map(obj => userAdapter(obj));
    if (result.length > 0) {
      setTableUsers(result);
    } else {
      toast.error("No such users found.");
    }
  }

  const handleClear = () => {
    setTableUsers(users)
  }

  return (
    <InstructorLayout title="Users Board">
      <SearchBar onSearch={handleSearch} onClear={handleClear}/>
      <Table<User>
        columns={["id", "Name", "Lastname", "Email", "Role", "Actions"]}
        data={tableUsers}
        actions={["delete"]}
        onDelete={onDelete}
      />
    </InstructorLayout>
  );
};
