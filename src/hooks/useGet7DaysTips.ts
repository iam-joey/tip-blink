import { getOrderOfLast7Days } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetLast7DaysData = (publickey: string) => {
  return useQuery({
    queryKey: ["user-last-7-days-tips", publickey],
    queryFn: async () => {
      const data = await getOrderOfLast7Days(publickey);
      return data;
    },
    enabled: !!publickey,
  });
};
