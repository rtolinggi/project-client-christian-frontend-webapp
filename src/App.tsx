import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import AuthLayout from "./routes/authLayout";
import ProtectedRoute from "./components/protectedRoute";
import { AuthContextProvider } from "./context/authContext";
import Route, { loader as RouteLoader } from "./routes";
import AdminLayout, { loader as loaderAdmin } from "./routes/adminLayout";
import Beranda, { loader as loaderBeranda } from "./routes/admin/beranda";
import Karyawan from "./routes/admin/karyawan";
import KaryawanTable, {
  loader as loaderKaryawan,
} from "./routes/admin/karyawan/index";
import Login, { action as loginAction } from "./routes/public/login";
import ErrorLogin from "./routes/public/login/notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Route />,
    loader: RouteLoader,
  },
  {
    path: "/login",
    element: <AuthLayout />,
    action: loginAction,
    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction,
      },
      {
        path: "anautorized",
        element: <ErrorLogin message="" />,
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
    handle: {
      crumb: () => (
        <Link key={Math.random()} to="/admin/beranda">
          Admin
        </Link>
      ),
    },
    loader: loaderAdmin,
    children: [
      {
        path: "beranda",
        element: <Beranda />,
        loader: loaderBeranda,
        handle: {
          crumb: () => (
            <Link key={Math.random()} to="/admin/beranda">
              Beranda
            </Link>
          ),
        },
      },
      {
        path: "karyawan",
        element: <Karyawan />,
        handle: {
          crumb: () => (
            <Link key={Math.random()} to="/admin/karyawan">
              Karyawan
            </Link>
          ),
        },
        children: [
          {
            index: true,
            loader: loaderKaryawan,
            element: <KaryawanTable />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
