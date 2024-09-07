import { BASE_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBlink = (publickey: string) => {
  return useQuery({
    queryKey: ["user_blink", publickey],
    queryFn: async () => {
      console.log(BASE_URL);
      const response = await fetch(
        `${BASE_URL}/api/getuser?address=${publickey}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      // Parse the response as JSON
      const data = await response.json();
      return data;
    },
    enabled: !!publickey,
  });
};
