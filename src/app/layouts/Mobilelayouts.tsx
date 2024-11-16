import { Outlet } from "react-router-dom";
import MVBottomNavBar from "../components/navigations/mobile/BottomNav";
import { useAuth } from "../hooks/useAuth";

const MobileLayout = () => {
  const { getLocalStorage } = useAuth();
  const auth = getLocalStorage("auth");
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
      <main className="w-full max-w-3xl  bg-white shadow-md rounded-md ">
        <Outlet />
        {auth && auth.isAuthenticated && <MVBottomNavBar />}
      </main>
    </div>
  );
};

export default MobileLayout;
