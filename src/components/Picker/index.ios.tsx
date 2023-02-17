import { View, Text } from "dripsy";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, ActionSheetIOS } from "react-native";

type PickerProps = {
  label: string;
  value: string;
  placeholder: string;
  onSelect: (item: { label: string; value: string }) => void;
  options: { label: string; value: string }[];
};

export default function Picker(props: PickerProps) {
  function showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...props.options.map((op) => op.label), "Cancelar"],
        cancelButtonIndex: props.options.length,
      },
      (index) => {
        // ignore if index === props.options.length because of cancel button
        if (index < props.options.length) {
          props.onSelect(props.options[index]);
        }
      }
    );
  }

  return (
    <View>
      <Text
        sx={{
          color: "$text",
          fontWeight: "500",
          fontSize: "$md",
        }}
      >
        {props.label}
      </Text>

      <TouchableOpacity onPress={showActionSheet}>
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
          <Text
            sx={{ flex: 1, color: "$input", fontSize: "$md" }}
            numberOfLines={1}
          >
            {props.value}
          </Text>

          <Icon size={24} name="arrow-drop-down" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
