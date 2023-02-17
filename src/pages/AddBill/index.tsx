import { View, Text, useSx } from "dripsy";
import { StatusBar, TouchableNativeFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Icon from "@expo/vector-icons/MaterialIcons";

export default function AddBill() {
  const { top } = useSafeAreaInsets();
  const sx = useSx();

  function addBill() {
    return null;
  }

  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: "$primary",
        justifyContent: "center",
        paddingTop: top,
      }}
    >
      <StatusBar barStyle={"light-content"} />

      <Header
        pageTitle="Inserir Conta"
        headerRight={() => (
          <TouchableNativeFeedback
            onPress={addBill}
            style={sx({ padding: "$sm" })}
          >
            <Icon
              name="check"
              size={24}
              color={sx({ color: "$white" }).color}
            />
          </TouchableNativeFeedback>
        )}
      />

      <View
        sx={{
          flex: 1,
          backgroundColor: "$background",
          borderTopRightRadius: "$xl",
          borderTopLeftRadius: "$xl",
        }}
      />
    </View>
  );
}
