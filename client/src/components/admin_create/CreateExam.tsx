import { useState } from "react";
import toast from "react-hot-toast";
import examService from "../../services/examService";
import Button from "../Button";
import Input from "../Input";
import Textarea from "../Textarea";

const CreateExam: React.FC<{}> = () => {
  const [formData, setFormData] = useState({
    title: "",
    fileUrl: "",
    description: "",
    hidden: false,
  });
  const [file, setFile] = useState('');

  const handleInputChange = (
    event: any
  ) => {
    if (event.currentTarget.name === 'fileUrl' && event.target.files[0]) {
      setFile(event.target.files[0])
    }
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.checked,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExam = new FormData();
    newExam.append('id', '0');
    newExam.append('title', formData.title);
    newExam.append('file', file);
    newExam.append('description', formData.description);
    newExam.append('hidden', formData.hidden ? 'true': 'false');

    examService.createExam(newExam).then(data => {
      toast.success("Exam Created Successfully!");
      setFormData({
        title: "",
        fileUrl: "",
        description: "",
        hidden: false,
      });
    }).catch(err => {
      toast.error("Something went wrong.")
      console.error(err);
    });
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h1 className="text-dark">Create a new exam</h1>
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
        <label>Title</label>
        <Input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleInputChange}
        />

        <label>File Upload</label>
        <Input
          type="file"
          value={formData.fileUrl}
          name="fileUrl"
          onChange={handleInputChange}
        />

        <label>Description</label>
        <Textarea
          value={formData.description}
          name="description"
          onChange={handleInputChange}
        ></Textarea>

        <label className="d-flex gap-2">
          <input
            type="checkbox"
            name="hidden"
            checked={formData.hidden}
            onChange={handleCheckboxChange}
          />
          Hidden
        </label>

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreateExam;
