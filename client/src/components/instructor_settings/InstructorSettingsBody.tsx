import { useState } from "react";
import instructor_settings from "../../assets/images/settings.svg";
import Button from "../Button";
import "../../assets/styles/style.scss";
import "../../assets/styles/instructor_settings.scss";
import Input from "../Input";
import { useSelector } from "react-redux";
import userService from "../../services/user";
import { toast } from "react-hot-toast";
import {RootState} from "../../store/store";

const InstructorSettingsBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    repeatpassword: "",
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.password ||
      !formData.repeatpassword ||
      formData.password !== formData.repeatpassword
    )
      return toast.error("Passwords don't match");

    userService
      .updateUserPassword({
        oldPassword: formData.oldPassword,
        password: formData.password,
      })
      .then((message) => {
        toast.success(message);

        setFormData({
          oldPassword: "",
          password: "",
          repeatpassword: "",
        });
      })
      .catch(() => {
        toast.error("Password is incorrect");
      });
  };

  return (
    <div className="instructor_settings_body_container">
      <div className="flex-grow-1">
        <div className="d-flex flex-row gap-2">
          <h2>{user!.name}</h2>
          <h2>{user!.lastname}</h2>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-5">
          <h3>Change Password</h3>
          <label>Old Password</label>
          <Input
            type="password"
            placeholder="Old Password"
            value={formData.oldPassword}
            name="oldPassword"
            onChange={handleChange}
          />

          <label>New Password</label>
          <Input
            type="password"
            placeholder="New Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />

          <label>Repeat New Password</label>
          <Input
            type="password"
            placeholder="Repeat new password"
            value={formData.repeatpassword}
            name="repeatpassword"
            onChange={handleChange}
          />

          <Button type="submit" className="change_password_button">
            Change password
          </Button>
        </form>
      </div>

      <img
        src={instructor_settings}
        alt="Instructor Settings"
        className="flex-grow-1 instructor_settings_image"
        height={650}
      />
    </div>
  );
};

export default InstructorSettingsBody;
