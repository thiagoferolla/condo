import { View, Text, useSx } from "dripsy";
import { TextInput as RNTextInput } from "react-native";

type TextInputProps = {
  label: string;
  value: string;
  placeholder: string;
  editable?: boolean;
  onChangeText: (text: string) => void;
};

export default function TextInput(props: TextInputProps) {
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
          height: 43,
        }}
      >
        <RNTextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          style={sx({ color: "$input", fontSize: "$md" })}
          editable={props.editable}
        />
      </View>
    </View>
  );
}
