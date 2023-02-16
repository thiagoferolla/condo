import { View, Text } from "dripsy";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";

export default function BillsPlan() {
  const [search, setSearch] = useState("");

  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: "$primary",
        justifyContent: "center",
        paddingX: "$lg",
      }}
    >
      <SearchBox value={search} onChangeText={setSearch} />
    </View>
  );
}
