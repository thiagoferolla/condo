import { StatusBar, TouchableNativeFeedback } from "react-native";
import { View, useSx } from "dripsy";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import FormField, { FormFieldProps } from "./FormField";

type FormProps = {
  edit?: boolean;
  onSubmit: () => void;
  formFields: FormFieldProps[];
};

export default function Form(props: FormProps) {
  const sx = useSx();
  const { top } = useSafeAreaInsets();

  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: "$primary",
        justifyContent: "center",
        paddingTop: top,
      }}
    >
      <StatusBar barStyle={"light-content"} />

      <Header
        pageTitle={props.edit ? "Editar Conta" : "Inserir Conta"}
        headerRight={() => (
          <TouchableNativeFeedback
            onPress={props.onSubmit}
            style={sx({ padding: "$sm" })}
          >
            <Icon
              name="check"
              size={24}
              color={sx({ color: "$white" }).color}
            />
          </TouchableNativeFeedback>
        )}
      />

      <View
        sx={{
          flex: 1,
          backgroundColor: "$background",
          borderTopRightRadius: "$xl",
          borderTopLeftRadius: "$xl",
          paddingX: "$lg",
          paddingTop: "$lg",
        }}
      >
        {props.formFields.map((f) => (
          <View key={f.label} sx={{ marginY: "$xxs" }}>
            <FormField {...f} />
          </View>
        ))}
      </View>
    </View>
  );
}
