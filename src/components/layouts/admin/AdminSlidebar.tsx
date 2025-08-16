import { FC, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // ✅ fixed import
import { FaHouseUser } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { HiUsers } from "react-icons/hi";
import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/state/hooks";
import { logout } from "../../../store/slices/authSlices";

const AdminSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [navbarArray, setNavbarArray] = useState<string[]>([]);

  if (!user) return null; // or a loading spinner, or redirect to login

  const navItemClass =
    "py-3 text-sm font-medium flex items-center text-gray-700 hover:text-white rounded-xl px-4 transition-all duration-200 transform hover:scale-105";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.history.replaceState({}, document.title, "/admin/login");
    navigate("/admin/login");
  };

  const navItems = [
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: <FaHouseUser size={20} />,
      permission: "citizen:view",
      role: ["Administrator", "Analyst"],
    },
    {
      path: "/admin/citizen",
      label: "Citizens",
      icon: <FaHouseUser size={20} />,
      permission: "citizen:view",
      role: ["Administrator"],
    },
    {
      path: "/admin/department",
      label: "Departments",
      icon: <FaHouseUser size={20} />,
      permission: "citizen:view",
      role: ["Administrator", "Analyst"],
    },
    {
      path: "/admin/AppoinmentOfficerDash",
      label: "Appoinments",
      icon: <FaHouseUser size={20} />,
      permission: "citizen:view",
      role: ["Administrator", "Officer"],
    },
    {
      path: "/admin/feedback",
      label: "Feedback", // Added feedback menu
      icon: <FaHouseUser size={20} />,
      permission: "citizen:view",
      role: ["Administrator", "Analyst", "Officer"],
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <HiUsers size={20} />,
      permission: "user:view",
      role: ["Administrator"],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl p-6 h-full fixed flex-col justify-between w-1/6 hidden md:flex border-r border-gray-200">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">GovConnect</h2>
            <p className="text-xs text-gray-600">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <ul className="space-y-3">
          {navItems
            .filter((item) => item.role.includes(user.role))
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${navItemClass} ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                        : "hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1">{item.icon}</div>
                    <div>{item.label}</div>
                  </div>
                </NavLink>
              </li>
            ))}

          {/* Admin: Users */}
          {/* {user?.role === "Administrator" && (
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${navItemClass} ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="p-1">
                    <HiUsers size={20} />
                  </div>
                  <div>Users</div>
                </div>
              </NavLink>
            </li>
          )} */}
        </ul>
      </div>

      {/* Profile */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {user?.role?.replace("_", " ")}
              </p>
            </div>
          </div>
          <Link
            to="/admin/profile"
            className="w-full py-2 text-sm font-medium flex items-center justify-center gap-2 text-cyan-700 hover:bg-white hover:shadow-sm rounded-lg px-3 transition-all duration-200"
          >
            <UserOutlined />
            <span>View Profile</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <button
        className="w-full bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
