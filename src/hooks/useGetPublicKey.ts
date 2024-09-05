import { getUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = (publicKey: string) => {
  return useQuery({
    queryKey: ["user", publicKey],
    queryFn: async () => {
      const data = getUser(publicKey);
      return data;
    },
    enabled: !!publicKey,
  });
};
