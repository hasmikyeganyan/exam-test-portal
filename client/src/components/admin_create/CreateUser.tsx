import { useEffect, useState } from "react";
import SelectOption from "../../interfaces/SelectOption";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import userService from "../../services/user";
import NewUserDto from "../../interfaces/NewUserDto";
import roleToSelectOptionAdapter from "../../services/adapters/RoleToSelectOptionAdapter";
import toast from "react-hot-toast";

const CreateUser: React.FC<{}> = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    userService.getRoles().then((data) => {
      const mappedRoles = data.map((r) => roleToSelectOptionAdapter.adapt(r));
      setOptions(mappedRoles);
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
    email: "",
    role: "",
  });

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !(
        formData.email &&
        formData.password &&
        formData.role &&
        formData.lastname &&
        formData.name
      )
    ) {
      return toast.error("Fields are required");
    }

    const newUser: NewUserDto = {
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: +formData.role,
    };

    userService
      .createUser(newUser)
      .then((message) => {
        setFormData({
          name: "",
          lastname: "",
          password: "",
          email: "",
          role: "",
        });

        toast.success(message);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h1 className="text-dark">Create a new user</h1>
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
        <label>Name</label>
        <Input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleInputChange}
        />

        <label>Lastname</label>
        <Input
          type="text"
          value={formData.lastname}
          name="lastname"
          onChange={handleInputChange}
        />

        <label>Email</label>
        <Input
          type="email"
          value={formData.email}
          name="email"
          onChange={handleInputChange}
        />

        <label>Password</label>
        <Input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleInputChange}
        />

        <label>Role</label>

        <Select
            role='Role'
          options={options}
          value={formData.role}
          name="role"
          onChange={handleSelectChange}
        />

        <Button type="submit" className="mt-2">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
