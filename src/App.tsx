import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import AdminLayout from "./components/adminLayout";
import AuthLayout from "./components/authLayout";
import ProtectedRoute from "./components/protectedRoute";
import IndexPage, { loader as indexLoader } from "./routes";
import Beranda from "./routes/admin/beranda";
import Profile from "./routes/admin/profile";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/public/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    loader: indexLoader,
  },
  {
    path: "/login",
    element: <AuthLayout />,

    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Beranda />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
