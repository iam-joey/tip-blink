import { getAllPaymentsTransactions } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymnetsHistory = (publickey: string) => {
  return useQuery({
    queryKey: ["user-payments-history", publickey],
    queryFn: async () => {
      const data = await getAllPaymentsTransactions(publickey);
      return data;
    },
    enabled: !!publickey,
  });
};
