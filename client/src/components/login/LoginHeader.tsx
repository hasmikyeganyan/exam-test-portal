import logo from "../../assets/images/logo.svg";

export const LoginHeader = () => {
  return (
    <>
      <div className="text-center">
        <img src={logo} width={160} alt="sourcemind" />

        <h4 className="text-darkBlue mt-4 mb-4 pb-1 text ">
          Welcome to Sourcemind Exam Portal
        </h4>
      </div>
    </>
  );
};
