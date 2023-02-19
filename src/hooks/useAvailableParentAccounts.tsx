import { useMemo } from "react";
import { Bill } from "../@types/Bill";
import useBills from "./useBills";

export default function useAvailableParentAccounts() {
  const { data: bills } = useBills();

  const availableParentAccounts = useMemo<Bill[]>(() => {
    return (
      bills?.filter((b) => {
        const codeDigits = b.code.split(".");
        const lastDigit = codeDigits[codeDigits.length - 1];

        // parent accounts cannot accept entries and cannot have the last digit greater than 999, e.g. 1.1.999 is alloweb but 1.1.1000 is not
        return !b.accept_entries && parseInt(lastDigit) !== 999;
      }) || []
    );
  }, [bills]);

  return availableParentAccounts;
}
