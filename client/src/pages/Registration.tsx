import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserRegistration from "../components/registration/UserRegistration";
import { USER_HOME_PAGE } from "../constants/routes";
import { register } from "../redux/authSlice";
import { RootState } from "../store/store";


const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(USER_HOME_PAGE);
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (params: {
    name: string;
    email: string;
    lastname: string;
    examId: number;
    password:string
 
  }) => {
    dispatch(register(params));
  };
  return (
    <section className="vh-100 gradient-form">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="card p-25 card-shadow rounded-3 p-0 text-black w-75 ">
            <div className="text-center p-25 g-0">
              <h2 className="text-darkBlue pl-2 mt-2 mb-3 pb-1 text ">
                Sign Up!
              </h2>
              <UserRegistration onSubmit={handleRegister} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
