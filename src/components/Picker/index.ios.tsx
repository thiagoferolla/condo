import { View, Text, useSx } from "dripsy";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, ActionSheetIOS } from "react-native";
import { AnimatePresence, MotiText } from "moti";

type PickerProps = {
  label: string;
  value: string;
  placeholder: string;
  onSelect: (item: { label: string; value: string }) => void;
  options: { label: string; value: string }[];
  error?: string;
};

export default function Picker(props: PickerProps) {
  const sx = useSx();

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
    <AnimatePresence>
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
              borderWidth: props.error ? 1 : 0,
              borderColor: props.error ? "$destructive" : "transparent",
            }}
          >
            <Text
              sx={{
                flex: 1,
                color: props.value === "" ? "$placeholder" : "$input",
                fontSize: "$md",
              }}
              numberOfLines={1}
            >
              {props.value === "" ? props.placeholder : props.value}
            </Text>

            <Icon size={24} name="arrow-drop-down" />
          </View>
        </TouchableOpacity>

        {(props.error?.length || 0) > 0 && (
          <MotiText
            from={{
              transform: [{ translateY: -5 }],
              opacity: 0,
            }}
            animate={{
              transform: [{ translateY: 0 }],
              opacity: 1,
            }}
            exit={{
              transform: [{ translateY: -5 }],
              opacity: 0,
            }}
            style={sx({
              fontSize: "$xs",
              color: "$destructive",
            })}
            transition={{
              type: "timing",
              duration: 700,
            }}
          >
            {props.error}
          </MotiText>
        )}
      </View>
    </AnimatePresence>
  );
}
