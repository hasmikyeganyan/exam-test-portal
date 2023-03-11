import CreateUser from "../components/admin_create/CreateUser";
import { InstructorLayout } from "../layouts/InstructorLayout";

import "../assets/styles/admin_create.scss";

const AdminCreateUser = () => {
  return (
    <InstructorLayout title="">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <CreateUser />
        </div>
        <div className="col"></div>
      </div>
    </InstructorLayout>
  );
};

export default AdminCreateUser;
