import SelectOption from "../interfaces/SelectOption";

interface IProps {
  className?: string;
  options?: SelectOption[];
  name?: string;
  value?: string;
  role?:string;
  onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
}

const Select = (props: IProps) => {
  return (
    <>
      <select
        className={`form-control ${props.className ?? ""}`}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      >
        <option value="" disabled>
            { `Select ${props.role}`}
        </option>
        {props.options &&
          props.options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.title}
            </option>
          ))}
      </select>
    </>
  );
};

export default Select;
