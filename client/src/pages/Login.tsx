import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginUser } from "../apis/users.api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../redux/slices/authSlice.js";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

type ValuesType = {
  email: string;
  password: string;
};

type ErrorType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = (values: ValuesType) => {
    const errors: ErrorType = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await loginUser(values);
        if (res) {
          dispatch(saveUserData(res.data));
          setTimeout(() => {
            resetForm();
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={myForm.handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {/* Email */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiMail />
            </span>
            <input
              type="text"
              id="email"
              value={myForm.values.email}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          {myForm.touched.email && myForm.errors.email && (
            <p className="text-red-500 text-xs mt-1">{myForm.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiLock />
            </span>
            <input
              type="password"
              id="password"
              value={myForm.values.password}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          {myForm.touched.password && myForm.errors.password && (
            <p className="text-red-500 text-xs mt-1">{myForm.errors.password}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                setLoading(true);
                const res = await loginUser({
                  email: import.meta.env.VITE_DEMO_EMAIL,
                  password: import.meta.env.VITE_DEMO_PASSWORD,
                });

                if (res) {
                  dispatch(saveUserData(res.data));
                  setTimeout(() => {
                    navigate("/");
                  }, 3000);
                }
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 rounded-lg transition duration-200`}
          >
            {loading ? "Logging in..." : "Demo Login"}
          </button>
        </div>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
