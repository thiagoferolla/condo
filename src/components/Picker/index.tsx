import { View, Text, useSx } from "dripsy";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
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

        <View
          sx={{
            backgroundColor: "$white",
            borderRadius: "$sm",
            paddingX: "$md",
            paddingY: "$sm",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: props.error ? 1 : 0,
            borderColor: props.error ? "$destructive" : "transparent",
            height: 43,
          }}
        >
          {props.value === "" && (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                sx({ alignItems: "center" }),
              ]}
            >
              <Text sx={{ fontSize: "$md" }}>{props.placeholder}</Text>
            </View>
          )}
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
