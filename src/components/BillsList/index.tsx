import { View, Text } from "dripsy";
import { Bill } from "../../@types/Bill";
import BillCard from "../BillCard";

type BillsListProps = {
  bills: Bill[];
  loading?: boolean;
};

export default function BillsList(props: BillsListProps) {
  const listBody = props.loading
    ? new Array(10)
        .fill(undefined)
        .map((_, index) => <BillCard.Skeleton key={index} />)
    : props.bills.map((b) => <BillCard key={b.id} bill={b} />);

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

      {listBody}
    </View>
  );
}
