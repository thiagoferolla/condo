import { useState, useEffect } from "react";
import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";
import { useQuery } from "@tanstack/react-query";

export default function useSearchBills(term: string) {
  const database = useDatabase();

  const query = useQuery({
    queryKey: ["bills", { term }],
    enabled: Boolean(database),
    queryFn: () => database?.searchBills(term),
  });

  return query;
}
