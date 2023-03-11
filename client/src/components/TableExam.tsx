import Input from "./Input";
import '../assets/styles/tableExam.scss'
type ActionType = "delete" | "edit"|"download";

interface DataT extends Object {
    id: number;
}

interface IProps<T extends DataT> {
    columns: string[];
    data: T[];
    actions?: ActionType[];

    onDownload?:()=>void

}

export const TableExam = <T extends DataT>(props: IProps<T>) => {
    const { columns, data, actions,onDownload} = props;

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
                    {Object.values(object).map((value, index) => (
                        <th key={index}>{value}</th>

                    ))}

                    {actions?.includes('delete') && (
                        <th className="text-center">
                            <i className="fa-solid fa-file-arrow-down"
                               onClick={() => (onDownload )}
                            ></i>
                        </th>
                    )}
                    <th ><Input className='tableExam-input'/></th>
                </tr>
            ))}
            </tbody>
        </table>
    );
};