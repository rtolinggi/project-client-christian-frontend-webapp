import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <>
      <h1>ROUTE PARENT</h1>
      <Outlet />
    </>
  );
};

export default AdminLayout;
