import { useFormik } from "formik";
import { createTodo } from "../apis/todos.api.js";
import { useDispatch } from "react-redux";
import { insertTodo } from "../redux/slices/todoSlice.js";

function TodoForm() {
  const dispatch = useDispatch();

  const myForm = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.content || !values.content.trim()) return;

      const res = await createTodo(values.content);
      console.log(res);
      if (res) dispatch(insertTodo(res.data));
      resetForm();
    },
  });

  return (
    <li className="w-full">
      <form
        onSubmit={myForm.handleSubmit}
        className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-3xl px-5 py-4 transition duration-300 hover:shadow-xl"
      >
        <input
          name="content"
          placeholder="What's on your mind?"
          value={myForm.values.content}
          onChange={myForm.handleChange}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-lg font-medium"
        />

        <button
          type="submit"
          className="flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full p-3 shadow-md transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </li>
  );
}

export default TodoForm;
