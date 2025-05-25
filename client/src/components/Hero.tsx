import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const user = useSelector((state: any) => state.auth.userData);

  return (
    <div className="relative isolate flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 px-6 lg:px-8 text-white">
     
      
      <div className="max-w-xl text-center space-y-6">
        

        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          WELCOME👏
        </h1>

        
        <p className="text-lg text-indigo-300">
          Manage tasks effortlessly and get more done.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          {user ? (
            <Link
              to="/todos"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition"
            >
              📝 Go to Dashboard &nbsp;→
            </Link>
          ) : (
            <>
              <Link
                to="/sign-up"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition"
              >
                🔑 Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-transparent border-2 border-indigo-600 hover:bg-indigo-600 rounded-full font-semibold transition"
              >
                🔓 Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
