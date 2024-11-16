import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className=" min-h-screen  ">
      <main className="w-screen  ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
