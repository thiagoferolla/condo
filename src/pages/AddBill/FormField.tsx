import Picker from "../../components/Picker";
import TextInput from "../../components/TextInput";

export type FormFieldProps =
  | {
      type: "text";
      value: string;
      label: string;
      editable?: boolean;
      placeholder: string;
      onChange: (val: string) => void;
    }
  | {
      type: "picker";
      options: { label: string; value: string }[];
      value: string;
      label: string;
      placeholder: string;
      onChange: (val: { label: string; value: string }) => void;
    };

export default function FormField(props: FormFieldProps) {
  if (props.type === "text") {
    return <TextInput {...props} onChangeText={props.onChange} />;
  }

  return <Picker {...props} onSelect={props.onChange} />;
}
