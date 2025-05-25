import { useState } from "react";
import { updateTodo } from "../apis/todos.api.js";
import { useDispatch } from "react-redux";
import {
  updateTodo as updateTodoRedux,
  toggleCompleted as toggleCompletedRedux,
} from "../redux/slices/todoSlice.js";
import { Pencil, Save, Trash2 } from "lucide-react";
import DeletePopup from "./DeletePopup.js";

function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.content);
  const [showPopup, setShowPopup] = useState<Boolean>(false);

  const editTodo = async () => {
    try {
      const res = await updateTodo({
        id: todo.id,
        content: todoMsg,
      });
      dispatch(updateTodoRedux({ updatedTodo: res?.data.updatedTodo }));
    } catch (err: any) {
      console.log(err.message);
    }
    setIsTodoEditable(false);
  };

  const toggleCompleted = async () => {
    try {
      const res: any = await updateTodo({
        id: todo.id,
        completed: !todo.completed,
      });
      dispatch(toggleCompletedRedux(res?.todo.id));
    } catch (error) {}
    dispatch(toggleCompletedRedux(todo.id));
  };

  return (
    <>
      <DeletePopup showPopup={showPopup} setShowPopup={setShowPopup} todoId={todo.id} />
      <li className="w-full flex items-center gap-4 bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-4 border border-gray-200 transition-all hover:shadow-xl">
        
        {/* Custom Checkbox */}
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleCompleted}
            className="peer sr-only"
          />
          <div className="h-5 w-5 md:h-6 md:w-6 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-green-500 transition-all">
            <svg
              className="hidden peer-checked:block h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>

        {/* Todo Input */}
        <input
          type="text"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
          className={`w-full text-lg font-medium bg-transparent focus:outline-none 
            ${isTodoEditable ? "border-b border-black px-1" : "border-none"}
            ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}
          `}
        />

        {/* Date */}
        <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-auto">
          {new Date(todo.updatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition"
        >
          <Trash2 size={18} />
        </button>

        {/* Edit/Save Button */}
        {!todo.completed && (
          <button
            onClick={() => {
              if (isTodoEditable) editTodo();
              else setIsTodoEditable(true);
            }}
            className="ml-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition"
          >
            {isTodoEditable ? <Save size={18} /> : <Pencil size={18} />}
          </button>
        )}
      </li>
    </>
  );
}

export default TodoItem;
