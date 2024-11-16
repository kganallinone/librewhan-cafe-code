import { BiNotification } from "react-icons/bi";
import { BsActivity } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export const NAVIGATION = {
  DEFAULT: [
    {
      icon: FaHome,
      name: "Home",
      path: "/",
    },
    {
      icon: BsActivity,
      name: "Activity",
      path: "/activity",
    },
    {
      icon: FaLocationPin,
      name: "Map",
      path: "/map",
    },
    {
      icon: BiNotification,
      name: "Notifications",
      path: "/notifications",
    },
    {
      icon: CgProfile,
      name: "Profile",
      path: "/profile",
    },
  ],
};

export const NAVIGATION_ADMIN = {
  DEFAULT: [
    {
      name: "Home",
      path: "/admin",
      iconName: "dashboard",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      iconName: "orders",
    },
    {
      name: "Products",
      path: "/admin/products",
      iconName: "products",
    },
    {
      name: "Franchise ",
      path: "/admin/franchises",
      iconName: "franchises",
    },
    {
      name: "User ",
      path: "/admin/users",
      iconName: "user",
    },

    {
      name: "Profile",
      path: "/admin/profile",
      iconName: "settings",
    },
  ],
};
