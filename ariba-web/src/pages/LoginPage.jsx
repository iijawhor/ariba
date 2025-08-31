import LoginForm from "../components/LoginForm";
const LoginPage = () => {
  return (
    <div className="flex h-screen  gap-1 border text-black">
      <div className=" flex-4 max-h-screen hidden md:inline">
        {/* <img src="./logo/login-bg.png" className="max-h-screen w-full" alt="" /> */}
      </div>
      <div className=" flex-2 h-full flex bg-[#eef1ffff] flex-col gap-5 m-auto justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
