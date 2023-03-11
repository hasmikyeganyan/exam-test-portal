import ListElement from "./SidebarElement";
import "../../assets/styles/dashboard_home.scss";
import logo from "../../assets/images/logo.svg";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div
        id="logocontainer"
        className="d-flex justify-content-center align-items-center  "
      >
        <img
          height={70}
          src={logo}
          width={160}
          alt="sourcemind"
          className="d-none d-xl-block"
        />
      </div>
      <ListElement />
    </div>
  );
};

export default Sidebar;
