import { useSx, View } from "dripsy";
import { useState } from "react";
import { TouchableNativeFeedback, StatusBar } from "react-native";
import Header from "../../components/Header";
import SearchBox from "../../components/SearchBox";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BillsPlanPageHeader from "./BillsPlanPageHeader";

export default function BillsPlan() {
  const [search, setSearch] = useState<string>("");
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();
  const sx = useSx();
  const { top } = useSafeAreaInsets();

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

      <BillsPlanPageHeader search={search} onSearchChange={setSearch} />

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
