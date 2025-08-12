import { Button, Input, message } from "antd";
import {
  CloseCircleOutlined,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ProfileService from "../../../../services/profile.service";

interface UserFullNameBlockProps {
  userFullName: string;
  userId: number;
  refetch: () => void;
}

export const UserViewFullName = ({
  userFullName,
  userId,
  refetch,
}: UserFullNameBlockProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState(userFullName);
  const profileService = new ProfileService();

  const mutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      await profileService.updateUserFullNameById(userId, data.name);
    },
    onSuccess: () => {
      message.success("Name updated successfully!");
      refetch(); // Refetch the user data after successful update
    },
    onError: (error) => {
      message.error("Failed to update Name: " + error.message);
    },
  });

  /**
   *  useEffect to set the full name when the component mounts or when userFullName changes
   */
  useEffect(() => {
    setFullName(userFullName);
  }, [userFullName]);

  const handleFullNameChange = () => {
    setFullName(fullName);
    setIsEdit(false);

    const updatedData = {
      name: fullName,
    };
    mutation.mutate(updatedData);
  };

  const handleFullNameCancel = () => {
    setFullName(userFullName);
    setIsEdit(false);
  };

  return (
    <div className="flex items-baseline gap-2">
      <p className="text-md">Full Name</p>
      <div className="flex">
        {!isEdit && (
          <div className="flex items-center gap-2">
            <p className="text-gray-500">{fullName}</p>
            <Button
              type="link"
              danger
              icon={<EditFilled />}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>
          </div>
        )}

        {isEdit && (
          <>
            <Input
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Button
              type="primary"
              className="ml-2"
              icon={<SaveOutlined />}
              onClick={handleFullNameChange}
              disabled={fullName === "" || fullName === userFullName}
            >
              Save
            </Button>
            <Button
              type="primary"
              danger
              className="ml-2"
              icon={<CloseCircleOutlined />}
              onClick={handleFullNameCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
