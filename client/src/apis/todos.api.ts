import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

export const createTodo = async (content: string) => {
  try {
    const res = await axiosInstance.post("/todo/create", { content });
    console.log("Created Todo:", res.data);
    toast.success("Todo Created Successfully");
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }

    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((error: any) => {
        toast.error(error.message);
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};

export const updateTodo = async ({
  id,
  content,
  completed,
}: {
  id: string;
  content?: string;
  completed?: boolean;
}) => {
  try {
    const updateData: Record<string, any> = {};
    if (typeof content !== "undefined") updateData.content = content;
    if (typeof completed !== "undefined") updateData.completed = completed;

    const res = await axiosInstance.post(`/todo/update/${id}`, updateData);
    console.log("Updated Todo:", res.data);
    toast.success("Todo Updated Successfully");
    return res;
  } 
  catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }

    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((error: any) => {
        toast.error(error.message);
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/todo/delete/${id}`);
    console.log("Deleted Todo:", res.data);
    toast.success("Todo Deleted Successfully");
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }

    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((error: any) => {
        toast.error(error.message);
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};

export const getAllTodo = async () => {
  try {
    const res = await axiosInstance.get("/todo/get-all");
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error :: ", error.response.data);
    } else {
      console.error("Axios Error :: ", error.message);
    }

    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((error: any) => {
        toast.error(error.message);
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};
