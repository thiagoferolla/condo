import { View, Text } from "dripsy";
import { Bill } from "../../@types/Bill";
import BillCard from "../BillCard";

type BillsListProps = {
  bills: Bill[];
};

export default function BillsList(props: BillsListProps) {
  return (
    <View>
      <View
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "$md",
          marginBottom: "$sm",
          marginX: "$sm",
        }}
      >
        <Text
          sx={{
            color: "$highlight",
            fontSize: "$lg",
          }}
        >
          Listagem
        </Text>

        <Text
          sx={{
            color: "$muted",
            fontSize: "$sm",
          }}
        >
          {props.bills.length} registros
        </Text>
      </View>

      {props.bills.map((b) => (
        <BillCard bill={b} />
      ))}
    </View>
  );
}
