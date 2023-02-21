import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";
import { useQuery } from "@tanstack/react-query";

export default function useBills() {
  const database = useDatabase();

  const query = useQuery({
    queryKey: ["bills"],
    enabled: Boolean(database),
    queryFn: () => database?.findAll(),
  });

  return query;
}
