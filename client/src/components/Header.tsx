import logo from "../assets/images/logo.svg";
import "../assets/styles/style.scss";
import "../assets/styles/login.scss";
import "../assets/styles/user.scss";
import { IUserModel } from "../models/userModel";

interface IProps {
  user: IUserModel | null;
}

const Header = (props: IProps) => {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <img src={logo} width={160} alt="sourcemind" />
      <div className="d-flex gap-3 align-items-center">
        <h5>{`${props?.user?.name} ${props?.user?.lastname}`}</h5>
        {/* <i className="fa-solid fa-right-from-bracket "></i> */}
      </div>
    </div>
  );
};

export default Header;
