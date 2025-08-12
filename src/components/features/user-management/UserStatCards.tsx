import { FiShield, FiUsers } from "react-icons/fi";
import { useUserContext } from "../../../pages/admin/UsersPage";

export const UserStatCards = () => {
  const { userCount, userRoleCount } = useUserContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-4">
        <div className="bg-[#008FFB]/10 text-[#008FFB] p-3 rounded-full text-2xl">
          <FiUsers />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{userCount}</p>
          <p className="text-sm text-gray-500">Users</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-4">
        <div className="bg-[#00C1A7]/10 text-[#00C1A7] p-3 rounded-full text-2xl">
          <FiShield />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{userRoleCount}</p>
          <p className="text-sm text-gray-500">Roles</p>
        </div>
      </div>
    </div>
  );
};
