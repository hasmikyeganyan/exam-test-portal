import Header from "../components/Header";
import "../assets/styles/login.scss";
import Button from "../components/Button";
import DownloadSection from "../components/user/DownloadSection";
import UploadSection from "../components/user/UploadSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addExamResult } from "../redux/examResultsSlice";
import { useNavigate } from "react-router-dom";
import { REGISTRATION_PAGE } from "../constants/routes";
import { logOut } from "../redux/authSlice";
import toast from "react-hot-toast";

const UserHome = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleExamResult = (params: any) => {
    const formData = new FormData();
    formData.append("file", params);
    dispatch(addExamResult(formData));
  };
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Thank you for your participation.")
    navigate(REGISTRATION_PAGE);
  };
  return (
    <div className="px-5 py-3">
      <Header user={user} />
      <div className="wrapper d-flex flex-column flex-lg-row align-items-center justify-content-center gap-5">
        <DownloadSection title="Download Zip" />
        <UploadSection
          text="Or click on the area"
          title="Drop your files here"
          onUploud={handleExamResult}
        />
      </div>
      <div className="d-flex justify-content-center submit-section">
        <Button className="home-submit" onClick={handleLogOut}>
          Submit and log out
        </Button>
      </div>
    </div>
  );
};

export default UserHome;
