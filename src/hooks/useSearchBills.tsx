import { useState, useEffect } from "react";
import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";

export default function useSearchBills(term: string): {
  isLoading: boolean;
  data: Bill[] | undefined;
  refetch: () => void;
} {
  const database = useDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const [bills, setBills] = useState<Bill[] | undefined>(undefined);

  function searchBills() {
    setIsLoading(true);
    database?.searchBills(term).then((bills: Bill[]) => {
      setBills(bills);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    searchBills();

    database?.addEventListener(searchBills);
  }, [database, term]);

  return {
    isLoading,
    data: bills,
    refetch: searchBills,
  };
}
