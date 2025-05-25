import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../apis/users.api";
import { deleteUserData } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userData);

  const handelLogout = async () => {
    try {
      await logoutUser();
      dispatch(deleteUserData());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#1cb5e0] to-[#000851] shadow-lg py-4 px-6 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <img
            className="h-10 w-10 drop-shadow-md"
            src="https://www.svgrepo.com/show/356977/todo-list.svg"
            alt="TaskFlow Logo"
          />
          <span className="text-2xl font-bold text-white tracking-wide">
            Task<span className="text-cyan-300">Sprint</span>
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handelLogout}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                Log In
              </Link>
              <Link
                to="/sign-up"
                className="text-white font-semibold hover:text-cyan-300 transition duration-200 underline-offset-4 hover:underline"
              >
                Sign Up →
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
