import { getUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserBlink = (publickey: string) => {
  return useQuery({
    queryKey: ["user_blink", publickey],
    queryFn: async () => {
      const data = await getUser(publickey);
      return data;
    },
    enabled: !!publickey,
  });
};
