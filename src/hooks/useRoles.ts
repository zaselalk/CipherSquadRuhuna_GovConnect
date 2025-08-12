// hooks/useRoles.ts
import { useQuery } from "@tanstack/react-query";
import UserService from "../services/user.service";

const userService = new UserService();

/**
 * Custom hook to fetch and cache user roles using React Query.
 *
 * This hook leverages the `useQuery` function to retrieve all roles
 * from the `userService`. The fetched data is cached for 5 minutes
 * (`staleTime: 1000 * 60 * 5`) to optimize performance and reduce
 * unnecessary network requests.
 *
 * @returns {UseQueryResult} The result of the query, including the roles data,
 * loading state, and any potential errors.
 */
export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => userService.getAllRoles(),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};
