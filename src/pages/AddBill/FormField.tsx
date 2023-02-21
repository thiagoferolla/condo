import Picker from "../../components/Picker";
import TextInput, { TextInputProps } from "../../components/TextInput";

export type FormFieldProps =
  | {
      type: "text";
      value: string;
      label: string;
      error?: string;
      editable?: boolean;
      placeholder: string;
      keyboardType?: TextInputProps["keyboardType"];
      onChange: (val: string) => void;
      onFocus?: () => void;
      onBlur?: () => void;
    }
  | {
      type: "picker";
      options: { label: string; value: string }[];
      value: string;
      label: string;
      error?: string;
      placeholder: string;
      onChange: (val: { label: string; value: string }) => void;
    };

export default function FormField(props: FormFieldProps) {
  if (props.type === "text") {
    return <TextInput {...props} onChangeText={props.onChange} />;
  }

  return <Picker {...props} onSelect={props.onChange} />;
}
