import { Button, Input, message } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/state/hooks";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import ProfileService from "../../../services/profile.service";
import { changeName } from "../../../store/slices/authSlices";

export const UpdateUserFullName = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(user?.name || "");
  const profileService = new ProfileService();

  if (!user) {
    return <div>User not found</div>;
  }

  const mutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      await profileService.updateUserFullNameById(user.id, data.name);
    },
    onSuccess: () => {
      message.success("Profile updated successfully!");
      dispatch(changeName(fullName));
    },
    onError: (error) => {
      message.error("Failed to update profile: " + error.message);
    },
  });

  const handleUpdateProfile = () => {
    if (!user) return;
    const updatedData = {
      name: fullName,
    };
    mutation.mutate(updatedData);
  };

  return (
    <div className="mb-4 flex items-center">
      <div className="w-3/4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Full Name
        </label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="rounded-lg"
        />
        <Button
          type="primary"
          className="mt-3"
          icon={<SaveOutlined />}
          onClick={handleUpdateProfile}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
