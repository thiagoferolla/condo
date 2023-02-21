import { Bill } from "../@types/Bill";
import useBills from "./useBills";

export default function useNewCode(parent_id?: string) {
  const { data } = useBills();

  function getSiblins(): Bill[] {
    if (!parent_id) {
      return data?.filter((d) => !d.parent_id) || [];
    } else {
      return data?.filter((d) => d.parent_id === parent_id) || [];
    }
  }

  function getParent(): Bill | undefined {
    return data?.find((d) => d.id === parent_id);
  }

  function generateNewCode(parent: Bill | undefined, siblings: Bill[]) {
    if (!parent && !siblings.length) {
      return "1";
    }

    const parentCode = parent?.code || "";

    if (!siblings.length) {
      return parentCode + ".1";
    }

    console.log(siblings);

    const siblingsLastDigits = siblings.map((s) => {
      const digits = s.code?.split(".");

      if (!digits.length) {
        return 0;
      }

      return parseInt(digits[digits.length - 1] || "0");
    });
    

    const newDigit = (Math.max(...siblingsLastDigits) + 1).toString();

    if (!parent) {
      return newDigit;
    }

    return `${parentCode}.${newDigit}`;
  }

  return generateNewCode(getParent(), getSiblins());
}
