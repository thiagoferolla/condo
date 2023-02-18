import { useState, useEffect } from "react";
import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";

export default function useBills(): {
  isLoading: boolean;
  data: Bill[] | undefined;
  refetch: () => void;
} {
  const database = useDatabase();
  const [bills, setBills] = useState<Bill[] | undefined>(undefined);

  function fetchBills() {
    database?.findAll().then((bills: Bill[]) => {
      setBills(bills);
    });
  }

  useEffect(() => {
    fetchBills();

    database?.addEventListener(fetchBills);
  }, [database]);

  return {
    isLoading: false,
    data: bills,
    refetch: fetchBills,
  };
}
