import { Outlet } from "react-router-dom";
import WVTopNavigation from "../components/navigations/web/TopNav";
import Footer from "../components/footer/Footer";

const WebLayout = () => {
  return (
    <div className=" min-h-screen  ">
      <WVTopNavigation />
      <main className="w-screen mt-12  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebLayout;
