import { Link } from "react-router-dom";
import TodoForm from "../components/TodoFrom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import { saveTodoInfo, TodoType } from "../redux/slices/todoSlice";
import { getAllTodo } from "../apis/todos.api";
import { logoutUser } from "../apis/users.api";
import { deleteUserData } from "../redux/slices/authSlice";

function TodoPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userData);
  const todos = useSelector((state: any) => state.todo.todos);
  const [todoType, setTodoType] = useState("AllTodos");

  const handelLogout = async () => {
    try {
      await logoutUser();
      dispatch(deleteUserData());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetch() {
      const res = await getAllTodo();
      if (res) {
        dispatch(saveTodoInfo(res.data));
      }
    }
    fetch();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://www.svgrepo.com/show/356977/todo-list.svg"
            alt="TaskFlow"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-indigo-600">TaskFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handelLogout}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-md font-semibold transition"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-md font-semibold transition"
              >
                Log In
              </Link>
              <Link
                to="/sign-up"
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                Sign Up →
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
            {["AllTodos", "Pending", "Completed"].map((type) => (
              <button
                key={type}
                onClick={() => setTodoType(type)}
                className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                  todoType === type
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-indigo-100 text-gray-800"
                }`}
              >
                {type === "AllTodos"
                  ? "All Todos"
                  : type === "Pending"
                  ? "Pending"
                  : "Completed"}
              </button>
            ))}
          </div>

          {/* Todo Form */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <TodoForm />
          </section>

          {/* Todo List */}
          <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
            {todos?.length === 0 ? (
              <p className="text-gray-500 text-center">No todos available.</p>
            ) : (
              <ul className="space-y-4">
                {todos?.map((todo: TodoType) => {
                  const shouldRender =
                    todoType === "AllTodos" ||
                    (todoType === "Pending" && !todo.completed) ||
                    (todoType === "Completed" && todo.completed);

                  return shouldRender ? (
                    <li key={todo.id}>
                      <TodoItem todo={todo} />
                    </li>
                  ) : null;
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default TodoPage;
