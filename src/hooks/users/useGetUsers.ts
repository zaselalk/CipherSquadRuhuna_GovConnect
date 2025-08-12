import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/user.service";

const userService: UserService = new UserService();

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers(),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};
