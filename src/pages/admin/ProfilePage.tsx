import { FC } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { useAppSelector } from "../../hooks/state/hooks";

import { UpdateUserFullName } from "../../components/features/profile-management/UpdateUserFullName";
import { UserChangeChangePassword } from "../../components/features/profile-management/UserChangeChangePassword";

const ProfilePage: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <DashboardContainer>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">My Profile</h2>
        </div>

        <div className="bg-white shadow-md p-5 rounded-2xl">
          <div className=" rounded-lg">
            <UpdateUserFullName />

            <div className="mb-4">
              <p className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <UserChangeChangePassword />
      </div>
    </DashboardContainer>
  );
};

export default ProfilePage;
