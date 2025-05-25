import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (userDetails: {
  fullname: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosInstance.post("/user/sign-up", userDetails);
    console.log("User Registered:", res.data);
    toast.success("User Registered Successfully");
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response);

      if (Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((zodError: any) => {
          toast.error(`${zodError.path[0]}: ${zodError.message}`);
        });
        return;
      }
    } else {
      console.error("Axios Error :: ", error.message);
    }

    toast.error(error?.response?.data?.error || "Something went wrong");
  }
};


export const loginUser = async (loginDetails: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosInstance.post("/user/login", loginDetails);
    toast.success("User logged in Successfully");
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }
    toast.error(error?.response?.data?.error || "Something went wrong");
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post('/user/logout');
    if(res.status == 200) {
      toast.success("User Logged out Successfully");
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }
    toast.error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get('/user/current-user');
    return res;
  } catch (error:any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }
    // toast.error(error.message);
  }
};

export const refreshToken = () => {};
