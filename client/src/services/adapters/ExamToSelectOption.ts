import {Exam} from "../../interfaces/Exam";
import SelectOption from "../../interfaces/SelectOption";

class ExamToSelectOption {
    adapt = (exam: Exam): SelectOption => {
        return (
            {
                value: exam.id,
                title: exam.title
            }
        )
    }
}

const examToSelectOption = new ExamToSelectOption();
export default examToSelectOption;