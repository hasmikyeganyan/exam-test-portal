import Button from "../Button";
import { LoginHeader } from "./LoginHeader";
import Input from "../Input";
import { RefObject } from "react";

interface IProps {
  emailRef: RefObject<HTMLInputElement>;
  pwdRef: RefObject<HTMLInputElement>;
  onClick: () => void;
}

export const LoginLeftSection = (props: IProps) => {
  return (
    <div className="col-lg-6">
      <div className="card-body p-md-5 mx-md-4">
        <LoginHeader />
        <Input
          inputRef={props.emailRef}
          type="email"
          placeholder="Email"
          className="mb-4"
        />
        <Input
          inputRef={props.pwdRef}
          type="password"
          placeholder="Password"
          className="mb-4"
        />
        <Button onClick={props.onClick}>Log In</Button>
      </div>
    </div>
  );
};
