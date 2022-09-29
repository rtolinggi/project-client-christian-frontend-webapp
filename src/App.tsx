import {
  RouterProvider,
  createBrowserRouter,
  Link,
  useMatches,
} from "react-router-dom";
import AuthLayout from "./components/authLayout";
import ProtectedRoute from "./components/protectedRoute";
import { AuthContextProvider } from "./context/authContext";
import IndexPage, { loader as indexLoader } from "./routes";
import AdminLayout from "./routes/admin";
import Beranda from "./routes/admin/beranda";
import Karyawan from "./routes/admin/karyawan";
import KaryawanTable from "./routes/admin/karyawan/index";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./routes/public/login";
import ErrorLogin from "./routes/public/login/notification";

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
        loader: loginLoader,
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
    handle: { crumb: () => <Link to="/admin/beranda">Admin</Link> },
    children: [
      {
        path: "beranda",
        element: <Beranda />,
        handle: { crumb: () => <Link to="/admin/beranda">Beranda</Link> },
      },
      {
        path: "karyawan",
        element: <Karyawan />,
        handle: { crumb: () => <Link to="/admin/karyawan">Karyawan</Link> },
        children: [
          {
            index: true,
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
