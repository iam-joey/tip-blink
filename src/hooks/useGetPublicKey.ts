import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserDetails = (publicKey: string | undefined) => {
  return useQuery({
    queryKey: ["user", publicKey],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/user/${publicKey}`
      );
      return data;
    },
    enabled: !!publicKey,
  });
};
