import { FC, useState, createContext, useContext } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { UserStatCards } from "../../components/features/user-management/UserStatCards";
import { UserList } from "../../components/features/user-management/UserList";

interface UserContextType {
  userCount: number;
  setUserCount: (count: number) => void;
  userRoleCount: number;
  setUserRoleCount: (count: number) => void;
}

// Create a context for user management
const UserContext = createContext({
  userCount: 0,
  setUserCount: (count: number) => {
    console.log(count);
  },
  userRoleCount: 0,
  setUserRoleCount: (count: number) => {
    console.log(count);
  },
});

export const useUserContext = () => useContext<UserContextType>(UserContext);

const UsersPage: FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [userRoleCount, setUserRoleCount] = useState(0);

  return (
    <UserContext.Provider
      value={{ userCount, setUserCount, userRoleCount, setUserRoleCount }}
    >
      <DashboardContainer>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#008FFB]">
              Manage Users
            </h2>
          </div>
          <UserStatCards />
          <div className="grid grid-cols-12 gap-4 mb-6">
            <UserList />
          </div>
        </div>
      </DashboardContainer>
    </UserContext.Provider>
  );
};

export default UsersPage;
