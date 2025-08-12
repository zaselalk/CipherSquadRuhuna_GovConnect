// hooks/useRoles.ts
import { useQuery } from "@tanstack/react-query";
import AuthServices from "../services/auth.service";

const authService = new AuthServices();

export const useSingleRole = (id: string) => {
  return useQuery({
    queryKey: ["single-role", id],
    queryFn: () => authService.getRoleById(id),
    // staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};
