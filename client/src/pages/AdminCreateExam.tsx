import { InstructorLayout } from "../layouts/InstructorLayout";

import "../assets/styles/admin_create.scss";
import CreateExam from "../components/admin_create/CreateExam";

const AdminCreateExam = () => {
  return (
    <InstructorLayout title="">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <CreateExam />
        </div>
        <div className="col"></div>
      </div>
    </InstructorLayout>
  );
};

export default AdminCreateExam;
