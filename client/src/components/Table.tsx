import Button from "./Button";

type ActionType = "delete" | "edit" | "download" | "evaluate";

interface DataT extends Object {
  id: number;
  name?: string;
  lastname?: string;
}

interface IProps<T extends DataT> {
  columns: string[];
  data: T[];
  additionalData?: any;
  actions?: ActionType[];
  onDelete?: (id: number) => void;
  onEvaluate?: (id: number) => void;
  onDownload?: (fileUrl: string) => void;
}

export const Table = <T extends DataT>(props: IProps<T>) => {
  const { columns, data, actions, onDelete, onDownload, onEvaluate, additionalData } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr className="text-center">
          {columns.map((col, index) => (
            <th key={index} scope="col">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((object, index) => (
          <tr key={index} className="text-center">
            {Object.values(object).map((value, index) => {
              return (
                <th key={index}>{value ? value : ''}</th>
              )
            })}
            {actions?.includes("evaluate") && (
              <th>
                {/*//@ts-ignore*/}
                {object.score ? "" :
                  <Button
                    className="cursor-pointer"
                    onClick={() => onEvaluate && onEvaluate(object.id)}
                  >Evaluate</Button>
                }
              </th>

            )}
            {actions ? <th className="text-center">
              {actions?.includes("download") && (
                <i
                  className="fa-solid fa-file-arrow-down cursor-pointer m-2"
                  onClick={() => onDownload && onDownload(additionalData[index]?.fileUrl ?? '')}
                ></i>
              )}
              {actions?.includes("delete") && (
                <i
                  className="fa fa-trash text-danger cursor-pointer"
                  onClick={() => onDelete && onDelete(object.id)}
                ></i>
              )}
            </th> : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
