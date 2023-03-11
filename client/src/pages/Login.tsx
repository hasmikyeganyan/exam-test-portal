import { LoginLeftSection } from "../components/login/LoginLeftSection";
import { LoginRightSection } from "../components/login/LoginRightSection";

import "../assets/styles/login.scss";
import { useRef } from "react";
import { authLogin, authSelf } from "../services/auth";

import { toast } from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/authSlice";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onSubmit = () => {
    const email = emailRef.current?.value;
    const pwd = pwdRef.current?.value;

    if (!email || !pwd) return;

    authLogin(email, pwd)
      .then((token) => {
        localStorage.setItem("token", token);

        authSelf().then((user) => {
          dispatch(setUser(user));
        });
      })
      .catch((_) => toast.error("Authentication Failed"));
  };

  return (
    <section className="vh-100 gradient-form">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="card p-25 card-shadow rounded-3 p-0 text-black">
            <div className="row p-25 g-0">
              <LoginLeftSection
                onClick={onSubmit}
                emailRef={emailRef}
                pwdRef={pwdRef}
              />
              <LoginRightSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
