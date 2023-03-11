import { SidebarItem } from "../../interfaces/SidebarItem";

interface IProps {
  item: SidebarItem;
}

export const SidebarElementLink = ({ item }: IProps) => {
  return (
    <li className="list-group-item w-50 nav-item float-start sidebar-item">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <div>
          <i id="icon" className={`${item.icon}`} aria-hidden="true"></i>
          <span className="nav-link-text d-none d-xl-inline">{item.title}</span>
        </div>
        {item.nested?.length && (
          <i className="fa fa-chevron-right text-primary"></i>
        )}
      </div>
    </li>
  );
};
