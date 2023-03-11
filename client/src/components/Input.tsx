import { RefObject } from "react";

interface IProps {
  type?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IProps) => {
  const { type, id, className, placeholder, inputRef, value, name, onChange } =
    props;

  return (
    <input
      ref={inputRef}
      type={type}
      id={id}
      className={`form-control ${className ?? ""}`}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
