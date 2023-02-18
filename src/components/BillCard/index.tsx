import { View, Text, useSx } from "dripsy";
import type { Bill } from "../../@types/Bill";
import Icon from "@expo/vector-icons/MaterialIcons";
import useDatabase from "../../hooks/useDatabase";
import { TouchableNativeFeedback } from "react-native";

type BillCardProps = {
  bill: Bill;
};

export default function BillCard(props: BillCardProps) {
  const sx = useSx();
  const database = useDatabase();

  const textColor = props.bill.type === "income" ? "$income" : "$expense";

  return (
    <View
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "$white",
        padding: "$md",
        margin: "$xs",
        borderRadius: "$lg",
      }}
    >
      <Text
        sx={{
          fontSize: "$md",
          color: textColor,
          flex: 1,
          marginRight: "$sm",
        }}
        numberOfLines={1}
      >
        {props.bill.code} - {props.bill.name}
      </Text>

      <TouchableNativeFeedback
        onPress={() => database?.deleteBill(props.bill.id)}
      >
        <Icon
          size={24}
          color={sx({ color: "$placeholder" }).color}
          name="delete-outline"
        />
      </TouchableNativeFeedback>
    </View>
  );
}
