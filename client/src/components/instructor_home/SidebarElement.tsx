import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSidebarItems } from "../../interfaces/SidebarItem";
import store, {RootState} from "../../store/store";
import { isAdmin } from "../../utils/user";
import { SidebarElementLink } from "./SidebarElementLink";
import {logOut} from "../../redux/authSlice";

const { dispatch } = store;

const ListElement = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    };

  return user ? (
    <ul className="sidebar-list list navbar-nav sidebar-dark list-group hover-zoom">
      {getSidebarItems(isAdmin(user)).map((item) => (
        <Link
          to={item.to ?? "#"}
          key={item.to}
          className={item.nested?.length ? "dropdown" : ""}
        >
          <SidebarElementLink item={item} />

          <div className="list-dropdown">
            {item.nested?.map((nested) => (
              <Link to={nested.to ?? "#"} key={nested.to}>
                <li className="list-group-item w-50 nav-item float-start sidebar-item">
                  <i
                    id="icon"
                    className={`${nested.icon}`}
                    aria-hidden="true"
                  ></i>
                  <span className="nav-link-text d-none d-xl-inline">
                    {nested.title}
                  </span>
                </li>
              </Link>
            ))}
          </div>
        </Link>
      ))}
      <button className="border-0 p-0"  onClick={handleLogOut}>
        <SidebarElementLink
          item={{
            to: "/",
            icon: "fa-solid fa-right-from-bracket",
            title: "Log out",
          }}
        />
      </button>
    </ul>
  ) : null;
};

export default ListElement;
