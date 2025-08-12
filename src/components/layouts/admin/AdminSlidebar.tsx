import { FC, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { HiUsers } from "react-icons/hi";
import { Heart, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/state/hooks";
import { logout } from "../../../store/slices/authSlices";

const AdminSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [navbarArray, setNavbarArray] = useState<String[]>([]);

  // common css classes for nav item
  const navItemClass =
    "py-3 text-sm font-medium flex items-center text-gray-700 hover:text-white rounded-xl px-4 transition-all duration-200 transform hover:scale-105";

  useEffect(() => {

    if (!user?.permissions) return;

    if (user?.permissions.length > 0) {
      setNavbarArray(user?.permissions);
    }
  }, [user?.permissions]);

  const handleLogout = () => {
    // remove user from redux store
    dispatch(logout());
    // remove token from local storage
    localStorage.removeItem("token");

    // remove last location state
    window.history.replaceState({}, document.title, "/admin/login");

    navigate("/admin/login");
  };

  const navItems = [
    {
      path: "/admin/residents",
      label: "Residents",
      icon: <FaHouseUser size={20} />,
      permission: "resident:view",
    },

  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl p-6 h-full fixed flex-col justify-between w-1/6 hidden md:flex border-r border-gray-200">
      {/* Header with Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">RHMS</h2>
            <p className="text-xs text-gray-600">Admin Portal</p>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex-1">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${navItemClass} ${isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white"
                } `
              }
            >
              <div className="flex items-center gap-3">
                <div className="p-1">
                  <MdDashboard size={20} />
                </div>
                <div>Dashboard</div>
              </div>
            </NavLink>
          </li>

          {navItems
            .filter((item) => navbarArray.includes(item.permission))
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${navItemClass} ${isActive
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

          {/* show user management only for super_admin */}
          {user?.role === "super_admin" && (
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${navItemClass} ${isActive
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
          )}
        </ul>
      </div>
      {/* User Profile Section */}
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

      {/* Logout Button */}
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
