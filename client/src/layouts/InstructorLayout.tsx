import Sidebar from "../components/instructor_home/Sidebar";

interface IProps {
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const InstructorLayout = (props: IProps) => {
  const { title, children } = props;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="px-5 py-4 w-100">
        {title && <h2 className="title mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
};
