import { useState, useEffect } from "react";
import { Bill } from "../@types/Bill";
import useDatabase from "./useDatabase";

export default function useBills(id?: string): {
  isLoading: boolean;
  data: Bill | undefined;
  refetch: () => void;
} {
  const database = useDatabase();
  const [bill, setBill] = useState<Bill | undefined>(undefined);

  function fetchBill() {
    if (id) {
      database
        ?.findById(id)
        .then((bill: Bill) => {
          setBill(bill);
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    if (id) {
      fetchBill();

      database?.addEventListener(fetchBill);
    }
  }, [database, id]);

  return {
    isLoading: false,
    data: bill,
    refetch: fetchBill,
  };
}
