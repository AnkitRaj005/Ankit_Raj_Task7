import { Home, SignUp, Login, TodoPage } from "./pages/index.js";
import { useDispatch } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { saveUserData, deleteUserData } from "./redux/slices/authSlice.js";
import Layout from "./Layout";
import { useEffect } from "react";
import { AuthContainer } from "./components/index.js";
import { getCurrentUser } from "./apis/users.api.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <AuthContainer authentication={false}>
            <Home />
          </AuthContainer>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthContainer authentication={false}>
            <SignUp />
          </AuthContainer>
        }
      />
      <Route
        path="/login"
        element={
          <AuthContainer authentication={false}>
            <Login />
          </AuthContainer>
        }
      />
      <Route
        path="/todos"
        element={
          <AuthContainer authentication={true}>
            <TodoPage />
          </AuthContainer>
        }
      />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: any = await getCurrentUser();

        if (response) {
          dispatch(saveUserData(response.data));
        } else {
          dispatch(deleteUserData());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
