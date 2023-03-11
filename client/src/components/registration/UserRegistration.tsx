import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import {getExamsList} from "../../services/examsService";
import "../../assets/styles/login.scss";
import "../../assets/styles/style.scss";
import { Exam } from "../../interfaces/Exam";

interface IProps {
  onSubmit: any;
}

const UserRegistration = ({ onSubmit }: IProps) => {
  const [examsList, setExamList] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [examId, setExamId] = useState("");

  function generatePassword(length: number) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }
  const newPassword = generatePassword(10);
  const password = newPassword;
  const fetchExamsList = async () => {
    const { data } = await getExamsList();
      setExamList(
      data.map((exam: Exam) => ({ title: exam.title, value: exam.id }))
    );
  };
  useEffect(() => {
    fetchExamsList();
  }, []);

  return (
    <div className="card-body d-flex flex-column align-items-center justify-content-center p-md-3 mx-md-3">
      <Input
        type="text"
        placeholder="Name"
        className="mb-4 w-50 d-flex"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Lastname"
        className="mb-4 w-50 d-flex"
        onChange={(e) => setLastName(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        className="mb-4 w-50 d-flex"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select
        className="mb-4 w-50 d-flex"
        options={examsList}
        value={examId}
        name="cours"
        onChange={(e: any) => setExamId(e.target.value)}
        role='Course'
      />
      <Button
        className="w-50"
        onClick={() =>
          onSubmit({
            name,
            lastname,
            email,
            examId,
            password,
          })
        }
      >
        Register
      </Button>
    </div>
  );
};

export default UserRegistration;
