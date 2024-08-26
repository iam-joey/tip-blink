import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserBlink = (publickey: string | undefined) => {
  return useQuery({
    queryKey: ["user_blink", publickey],
    queryFn: async () => {
      const data = await axios.post(
        `http://localhost:3000/api/blink/${publickey}`
      );
      return data;
    },
    enabled: !!publickey,
  });
};
