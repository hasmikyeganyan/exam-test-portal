import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../../assets/styles/user.scss";
import { BoxWrapper } from "./BoxWrapper";

interface IProps {
  className?: string;
  title?: string;
  text?: string;
  onUploud: any;
}

const UploadSection = (props: IProps) => {
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      acceptedFiles.forEach((File) => {
        props.onUploud(File);
      });
    },
    [props]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <BoxWrapper className="linear-right">
      <div className="upload">
        <h3 className="px-2 py-3">{props.title}</h3>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            <i className="fa fa-plus plus" id="plus" aria-hidden="true">
              {" "}
            </i>
          </p>
        </div>
        <span>{props.text} </span>
      </div>
    </BoxWrapper>
  );
};

export default UploadSection;
