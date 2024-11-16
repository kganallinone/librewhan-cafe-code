import React from "react";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../../config/navigationConfig";

const MVBottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50  border-t border-gray-200">
      <div className="bg-white shadow-lg max-w-3xl mx-auto">
        <ul className="flex justify-around items-center h-16">
          {NAVIGATION.DEFAULT.map((item, index) => (
            <li key={index} className="flex-1">
              <Link
                to={item.path}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <item.icon size="24" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MVBottomNavBar;
