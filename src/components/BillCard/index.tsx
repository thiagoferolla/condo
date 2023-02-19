import { View, Text, useSx } from "dripsy";
import type { Bill } from "../../@types/Bill";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableNativeFeedback } from "react-native";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorScreens } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

type BillCardProps = {
  bill: Bill;
};

export default function BillCard(props: BillCardProps) {
  const sx = useSx();
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();

  const textColor = props.bill.type === "income" ? "$income" : "$expense";

  return (
    <>
      <DeleteModal
        billId={props.bill.id}
        visible={isDeleteOpen}
        onRequestClose={() => setDeleteOpen(false)}
      />
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("AddBill", { id: props.bill.id })}
      >
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

          <TouchableNativeFeedback onPress={() => setDeleteOpen(true)}>
            <Icon
              size={24}
              color={sx({ color: "$placeholder" }).color}
              name="delete-outline"
            />
          </TouchableNativeFeedback>
        </View>
      </TouchableNativeFeedback>
    </>
  );
}
