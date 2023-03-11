import {Exam} from "../../interfaces/Exam";

class DataToExamAdapter{
    adapt = (data: any): Exam | null => {
        if (data.id == undefined || data.title == undefined || data.hidden == undefined) return null;
        const result: Exam = {
            id: data.id,
            title: data.title,
            description: data.description,
            fileUrl: data.fileUrl,
            hidden: data.hidden
        }
        return result;
    }
}

export default new DataToExamAdapter();