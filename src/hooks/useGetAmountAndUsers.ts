import { getTotalAmountAndSupporters } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetAmountAndSupports = (publickey: string) => {
  return useQuery({
    queryKey: ["users_total_amounts_supports", publickey],
    queryFn: async () => {
      const data = await getTotalAmountAndSupporters(publickey);
      return data;
    },
    enabled: !!publickey,
  });
};
