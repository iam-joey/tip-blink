import { getLastFewTransactsions } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestTransactions = (publickey: string) => {
  return useQuery({
    queryKey: ["user-last-few-transactions", publickey],
    queryFn: async () => {
      const data = await getLastFewTransactsions(publickey);
      return data;
    },
    enabled: !!publickey,
  });
};
