import { View, Text, useSx } from "dripsy";
import { TextInput as RNTextInput } from "react-native";
import type { TextInputProps as RNTextInputProps } from "react-native";
import { AnimatePresence, MotiText } from "moti";

export type TextInputProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  editable?: boolean;
  keyboardType?: RNTextInputProps["keyboardType"];
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function TextInput(props: TextInputProps) {
  const sx = useSx();

  return (
    <AnimatePresence>
      <View>
        <Text
          sx={{
            color: "$text",
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
            borderWidth: props.error ? 1 : 0,
            borderColor: props.error ? "$destructive" : "transparent",
          }}
        >
          <RNTextInput
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            placeholderTextColor={sx({ color: "$placeholder" }).color}
            style={sx({ color: "$input", fontSize: "$md" })}
            editable={props.editable}
            keyboardType={props.keyboardType}
          />
        </View>
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
    </AnimatePresence>
  );
}
