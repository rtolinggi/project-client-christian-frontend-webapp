import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthLayout from "./routes/authLayout";
import ProtectedRoute from "./components/protectedRoute";
import Route, { loader as RouteLoader } from "./routes/index";
import AdminLayout from "./routes/adminLayout";
import Beranda from "./routes/admin/beranda";
import PageKaryawan from "./routes/admin/karyawan";
import TableKaryawan from "./routes/admin/karyawan/index";
import Login from "./routes/public/login";
import ErrorLogin from "./routes/public/login/notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext";
import PageUser from "./routes/admin/user";
import { DetailUser, PostUser, TableUser } from "./routes/admin/user/index";
import { UpdateUser } from "./routes/admin/user/update";

export const queryClient = new QueryClient();

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
        element: <PageKaryawan />,
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
            element: <TableKaryawan />,
          },
        ],
      },
      {
        path: "user",
        element: <PageUser />,
        handle: {
          crumb: () => (
            <Link key={Math.random()} to="/admin/user">
              User
            </Link>
          ),
        },
        children: [
          {
            index: true,
            element: <TableUser />,
          },
          {
            path: ":id/detail",
            element: <DetailUser />,
            handle: {
              crumb: () => (
                <Link key={Math.random()} to="#">
                  Detail
                </Link>
              ),
            },
          },
          {
            path: ":id/update",
            element: <UpdateUser />,
            handle: {
              crumb: () => (
                <Link key={Math.random()} to="#">
                  Update
                </Link>
              ),
            },
          },
          {
            path: "post",
            element: <PostUser />,
            handle: {
              crumb: () => (
                <Link key={Math.random()} to="#">
                  Post
                </Link>
              ),
            },
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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
