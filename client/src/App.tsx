import Login from "./pages/Login";
import axios from "axios";
import "./assets/styles/style.scss";
import "./assets/styles/user.scss";

import UserHome from "./pages/UserHome";

import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Registration from "./pages/Registration";
import { ExamResults } from "./pages/ExamResults";
import InstructorSettings from "./pages/InstructorSettings";
import { authSelf } from "./services/auth";
import store, {RootState} from "./store/store";
import AdminCreateUser from "./pages/AdminCreateUser";
import AdminCreateExam from "./pages/AdminCreateExam";
import { isAdmin } from "./utils/user";
import { AdminUsers } from "./pages/AdminUsers";
import {setUser} from "./redux/authSlice";
import {Loading} from "./constants/icons";

const { dispatch } = store;

axios.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `bearer ${localStorage.getItem("token")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function App() {
    const [firstPage, setFirstPage] = useState(<Login />);
    const [isLoading, setIsLoading] = useState(!!localStorage.getItem("token"));
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            toast.success("You're logged in successfully!");
            setFirstPage(<ExamResults />);
        } else {
            setFirstPage(<Login />);
        }
    }, [user]);

    useEffect(() => {
        if (localStorage.getItem("token") && !user) {
            authSelf().then((user) => {
                dispatch(setUser(user));
                setIsLoading(false);
            });
        }
    }, [user]);

    return  (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />

            {isLoading ? (<Loading />) :(<Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/login" element={firstPage} />

                {user && (
                    <Route>
                        <Route path="/user/home" element={<UserHome />} />
                        <Route path="/exams" element={<ExamResults />} />
                        <Route path="/settings" element={<InstructorSettings />} />
                        {isAdmin(user) && (
                            <Route>
                                <Route path="/users" element={<AdminUsers />} />
                                <Route path="/create/user" element={<AdminCreateUser />} />
                                <Route path="/create/exam" element={<AdminCreateExam />} />
                            </Route>
                        )}
                    </Route>
                )}

                <Route path="*" element={<h1 className="p-4">Page Not Found</h1>} />
            </Routes>)}
        </BrowserRouter>
    );
}

export default App;
