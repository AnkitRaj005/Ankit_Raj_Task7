import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../apis/users.api.js";
import { saveUserData } from "../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

type ValuesType = {
  fullname: string;
  email: string;
  password: string;
};

type ErrorType = {
  fullname?: string;
  email?: string;
  password?: string;
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values: ValuesType) => {
    const errors: ErrorType = {};

    if (!values.fullname) {
      errors.fullname = "Required";
    } else if (values.fullname.length <= 2) {
      errors.fullname = "Full name must be at least 3 chars";
    }

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
      fullname: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await registerUser(values);
        if (res) {
          setTimeout(() => {
            resetForm();
            navigate("/login");
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={myForm.handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        {/* Fullname */}
        <div className="relative">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FiUser />
            </span>
            <input
              type="text"
              id="fullname"
              disabled={loading}
              value={myForm.values.fullname}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
              placeholder="John Doe"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {myForm.touched.fullname && myForm.errors.fullname && (
            <p className="text-red-500 text-xs mt-1">{myForm.errors.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FiMail />
            </span>
            <input
              type="text"
              id="email"
              disabled={loading}
              value={myForm.values.email}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FiLock />
            </span>
            <input
              type="password"
              id="password"
              disabled={loading}
              value={myForm.values.password}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? "Creating..." : "Sign Up"}
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
            } text-white font-semibold py-2 rounded-md transition duration-200`}
          >
            {loading ? "Logging in..." : "Demo Login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
