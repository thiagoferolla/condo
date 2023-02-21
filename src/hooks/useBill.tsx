import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";
import { useQuery } from "@tanstack/react-query";

export default function useBill(id?: string): {
  isLoading: boolean;
  data: Bill | undefined;
  refetch: () => void;
} {
  const database = useDatabase();

  const query = useQuery({
    queryKey: ["bills", { id }],
    enabled: Boolean(database && typeof id === "string"),
    queryFn: () => database?.findById(id as string),
  });

  return query;
}
