import { ReactNode, RefObject } from "react";

interface IProps {
    type?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    inputRef?: RefObject<HTMLTextAreaElement>;
    value?: string;
    name?: string;
    onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    children?: ReactNode;

}

const Textarea = (props: IProps) => {
    const { id, className, placeholder, inputRef, value, name, onChange, children } = props;

    return (
        <textarea
            ref={inputRef}
            id={id}
            className={`form-control ${className ?? ""}`}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
        >
            {children}
        </textarea>
    );
};

export default Textarea;
