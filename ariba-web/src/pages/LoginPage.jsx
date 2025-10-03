import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Image with Overlay */}
      <div className="hidden md:flex flex-1 relative">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="School Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay (Bottom only) */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/30 to-transparent"></div>

        {/* Branding Card */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-lg">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              ARIBA
            </h1>
            <p className="mt-4 text-lg text-blue-100 font-light">
              School Management System
            </p>
            <p className="mt-6 text-sm text-blue-200 leading-relaxed">
              Simplify school operations with technology — manage attendance,
              academics, teachers, and students seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Admin Login */}
      <div className="flex flex-1 h-full flex-col justify-center items-center px-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 transition-transform hover:scale-105 duration-300">
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            {/* Logo & Heading */}
            <div className="text-center mb-10">
              <div className="mx-auto mb-5 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md animate-pulse">
                {/* Admin Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A4 4 0 0 1 8 16h8a4 4 0 0 1 2.879 1.804M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-md">
                Admin Dashboard
              </h2>
              <p className="text-blue-700/80 mt-2 text-sm">
                Manage your school efficiently and securely
              </p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-blue-500/70 text-xs mt-8 drop-shadow-sm">
            © {new Date().getFullYear()} ARIBA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
