// antd components
import { Modal, Form, message } from "antd";

import UserCreateForm from "./create-user/UserCreateForm";
import UserService from "../../../services/user.service";
import { useMutation } from "@tanstack/react-query";

export const UserCreateModal = ({
  isOpen,
  handleClose,
  refetch: UserListRefetch,
}: Props) => {
  const [form] = Form.useForm();
  const userService = new UserService();

  //fetch roles from api and pass to this component
  // const { data: roles, isLoading, error } = useRoles();

  const mutaion = useMutation({
    mutationFn: async ({
      full_name,
      email,
      password,
      role_id,
      phone_number,
    }: CreateUser) => {
      await userService.createUser(
        full_name,
        email,
        password,
        role_id,
        phone_number
      );
    },
    mutationKey: ["createUser"],
    onSuccess: () => {
      form.resetFields(); // Reset the form fields after successful submission
      message.success("User Created successfully");
      UserListRefetch(); // Refetch the user list to update the UI
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      message.error("Error creating user: " + error.message);
    },
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);

      // react query mutation
      mutaion.mutate({
        full_name: values.name,
        email: values.email,
        password: values.password,
        role_id: values.role,
        phone_number: values.phone_number,
      });
    });
  };

  return (
    <Modal
      title={"Create New User"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Save"
      maskClosable={false}
      keyboard={true}
    >
      <UserCreateForm form={form} />
    </Modal>
  );
};

interface Props {
  /** Indicates if the modal is open or closed */
  isOpen: boolean;
  /** Function to close the modal */
  handleClose: () => void;
  refetch: () => void; // Optional refetch function to refresh data after creating a user
}

interface CreateUser {
  full_name: string;
  email: string;
  password: string;
  role_id: number;
  phone_number: string;
}
