import { useSx, View } from "dripsy";
import { useEffect, useState } from "react";
import { StatusBar, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BillsPlanPageHeader from "./BillsPlanPageHeader";
import BillsList from "../../components/BillsList";
import useBills from "../../hooks/useBills";

export default function BillsPlan() {
  const sx = useSx();
  const [search, setSearch] = useState<string>("");
  const { top } = useSafeAreaInsets();
  const { data } = useBills();

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

      <ScrollView
        style={sx({
          flex: 1,
          backgroundColor: "$background",
          borderTopRightRadius: "$xl",
          borderTopLeftRadius: "$xl",
          paddingX: "$lg",
        })}
      >
        <BillsList bills={data || []} />
      </ScrollView>
    </View>
  );
}
