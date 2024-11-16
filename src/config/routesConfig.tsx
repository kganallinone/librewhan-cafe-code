import AdminLayout from "../app/layouts/Adminlayout";
import AdminLayoutWithSidebar from "../app/layouts/AdminLayoutwithSidebar";
import WebLayout from "../app/layouts/WebLayout";
import FranchiseAdminPage from "../app/pages/protected/franchise/FranchiseAdminPage";
import DashboardPage from "../app/pages/protected/home/DashboardPage";
import { OrderAdminPage } from "../app/pages/protected/orders/OrderAdminPage";
import ProductsAdminPage from "../app/pages/protected/products/ProductsAdminPage";
import ProfilePage from "../app/pages/protected/profile/ProfilePage";
import UserAdminPage from "../app/pages/protected/user/UserAdminPage";
import AboutPage from "../app/pages/public/about/AboutPage";
import LoginPage from "../app/pages/public/auth/Login";
import FAQPage from "../app/pages/public/faq/FAQPage";
import HomePage from "../app/pages/public/home/HomePage";
import ProductPage from "../app/pages/public/product/ProductPage";
import StoresPage from "../app/pages/public/stores/StoresPage";
import CreateUserForm from "../app/pages/public/test/testMONGODB";

export const ROUTES = {
  PUBLIC: [
    {
      element: <WebLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductPage />,
        },
        {
          path: "/stores",
          element: <StoresPage />,
        },
        {
          path: "/faq",
          element: <FAQPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },

        {
          path: "/test",
          element: <CreateUserForm />,
        },
        {
          path: "*",
          element: <HomePage />,
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/login",
          element: <LoginPage />,
        },
        {
          path: "/admin",
          element: <LoginPage />,
        },
      ],
    },
  ],
  PROTECTED: [
    {
      element: <AdminLayoutWithSidebar />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "/admin",
          element: <DashboardPage />,
        },
        {
          path: "*",
          element: <DashboardPage />,
        },
        {
          path: "/admin/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/admin/products",
          element: <ProductsAdminPage />,
        },
        {
          path: "/admin/orders",
          element: <OrderAdminPage />,
        },
        {
          path: "/admin/franchises",
          element: <FranchiseAdminPage />,
        },
        {
          path: "/admin/users",
          element: <UserAdminPage />,
        },
        {
          path: "/admin/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ],
};
