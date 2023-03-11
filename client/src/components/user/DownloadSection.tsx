import download from "../../assets/images/lightPinkDownload.svg";
import "../../assets/styles/user.scss";
import { downloadExam } from "../../services/examsService";
import { BoxWrapper } from "./BoxWrapper";
interface IProps {
  title?: string;
}

const DownloadSection = (props: IProps) => {
  const handleDownloadExam = () => {
    downloadExam();
  };
  return (
    <BoxWrapper onClick={handleDownloadExam}>
      <div className="files" id="files">
        <h3 className="text-center my-2">{props.title}</h3>
        <img
          className="mt-4"
          src={download}
          width={280}
          height={180}
          alt="download"
        />
      </div>
    </BoxWrapper>
  );
};

export default DownloadSection;
