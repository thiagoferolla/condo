import { View, TextInput, useSx } from "dripsy";
import Icon from "@expo/vector-icons/MaterialIcons";

type SearchBoxProps = {
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
};

export default function SearchBox(props: SearchBoxProps) {
  const sx = useSx();

  return (
    <View
      sx={{
        backgroundColor: "$white",
        borderRadius: "$full",
        paddingX: "$md",
        paddingY: "$md",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon
        size={20}
        name="search"
        color={sx({ color: "$placeholder" }).color}
        style={sx({ marginRight: "$md" })}
      />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={"$placeholder"}
        sx={{ flex: 1, fontSize: "$md", color: "$text" }}
        cursorColor={"$primary"}
      />
    </View>
  );
}
