import { View, Text, useSx } from "dripsy";
import { Picker as RNPicker } from "@react-native-picker/picker";

type PickerProps = {
  label: string;
  value: string;
  placeholder: string;
  onSelect: (item: { label: string; value: string }) => void;
  options: { label: string; value: string }[];
};

export default function Picker(props: PickerProps) {
  const sx = useSx();

  return (
    <View>
      <Text
        sx={{
          color: "$text",
          fontWeight: "500",
          fontSize: "$md",
          marginBottom: "$xxs",
        }}
      >
        {props.label}
      </Text>

      <View
        sx={{
          backgroundColor: "$white",
          borderRadius: "$sm",
          paddingX: "$md",
          paddingY: "$sm",
          flexDirection: "row",
          alignItems: "center",
          height: 43,
        }}
      >
        <RNPicker
          selectedValue={
            props.options.find((op) => op.label === props.value)?.value
          }
          onValueChange={(_, index) => props.onSelect(props.options[index])}
          style={{ flex: 1 }}
          mode="dropdown"
        >
          {props.options.map((op) => (
            <RNPicker.Item
              key={op.value}
              value={op.value}
              label={op.label}
              style={sx({
                color: "$input",
                fontSize: "$md",
              })}
            />
          ))}
        </RNPicker>
      </View>
    </View>
  );
}
