import { ReactNode } from "react";

interface IProps {
  className?: string;
  children: ReactNode | ReactNode[];
  onClick?: () => void;
}

export const BoxWrapper = (props: IProps) => {
  const { children, className } = props;

  return (
    <div className={`box-border ${className ?? ""}`} onClick={props.onClick}>
      {children}
    </div>
  );
};
