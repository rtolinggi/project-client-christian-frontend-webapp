import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import AuthLayout from "./routes/authLayout";
import ProtectedRoute from "./components/protectedRoute";
import Route, { loader as RouteLoader } from "./routes";
import AdminLayout from "./routes/adminLayout";
import Beranda from "./routes/admin/beranda";
import Karyawan from "./routes/admin/karyawan";
import KaryawanTable from "./routes/admin/karyawan/index";
import Login from "./routes/public/login";
import ErrorLogin from "./routes/public/login/notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Route />,
    loader: RouteLoader,
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
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
    children: [
      {
        path: "beranda",
        element: <Beranda />,
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
            element: <KaryawanTable />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
