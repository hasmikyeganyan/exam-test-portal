import InstructorSettingsBody from "../components/instructor_settings/InstructorSettingsBody";
import { InstructorLayout } from "../layouts/InstructorLayout";

const InstructorSettings = () => {
  return (
    <InstructorLayout title="Settings">
      <InstructorSettingsBody />
    </InstructorLayout>
  );
};
export default InstructorSettings;
