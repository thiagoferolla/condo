import { View, Text, useSx } from "dripsy";
import { StatusBar, TouchableNativeFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import FormField, { FormFieldProps } from "./FormField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  parent_id: yup.string(),
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
  type: yup.string().required().oneOf(["income", "expense"]),
  accept_entries: yup.string().required().oneOf(["1", "0"]),
});

const finalSchema = yup.object().shape({
  parent_id: yup.string(),
  code: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().required().oneOf(["income", "expense"]),
  accept_entries: yup.number().required().oneOf([1, 0]),
});

export default function AddBill() {
  const availableParentAccounts: { label: string; value: string }[] = [];
  const availableTypes: { label: string; value: string }[] = [
    { label: "Receita", value: "income" },
    { label: "Despesa", value: "expense" },
  ];
  const availableEntries: { label: string; value: string }[] = [
    { label: "Sim", value: "1" },
    { label: "Não", value: "0" },
  ];

  const { top } = useSafeAreaInsets();
  const sx = useSx();
  const { setValue, getValues, watch } = useForm({
    defaultValues: {
      parent_id: "",
      code: "",
      name: "",
      type: availableTypes[0].value,
      accept_entries: availableEntries[0].value,
    },
    resolver: yupResolver(formSchema),
  });

  // watch is necessary to rerender the component when value changes
  watch("parent_id");
  watch("name");
  watch("type");
  watch("accept_entries");

  function addBill() {
    const { parent_id, code, name, type, accept_entries } = getValues();

    const bill = {
      parent_id: parent_id?.length > 0 ? parent_id : undefined,
      code,
      name,
      type,
      accept_entries: parseInt(accept_entries),
    };

    finalSchema.validateSync(bill);

    return null;
  }

  const formFields: FormFieldProps[] = [
    {
      type: "picker",
      label: "Conta Pai",
      options: availableParentAccounts,
      value:
        availableParentAccounts.find((f) => getValues("parent_id") === f.label)
          ?.label || "",
      placeholder: "Selecione a Conta Pai (opcional)",
      onChange: ({ value }) => setValue("parent_id", value),
    },
    {
      type: "text",
      label: "Código",
      editable: false,
      value: getValues("code"),
      placeholder: "Gerado Automaticamente",
      onChange: (val) => setValue("code", val),
    },
    {
      type: "text",
      label: "Nome",
      editable: true,
      value: getValues("name"),
      placeholder: "Digite o nome da Conta",
      onChange: (val) => setValue("name", val),
    },
    {
      type: "picker",
      label: "Tipo",
      options: availableTypes,
      value:
        availableTypes.find((t) => t.value === getValues("type"))?.label || "",
      placeholder: "",
      onChange: ({ value }) => setValue("type", value),
    },
    {
      type: "picker",
      label: "Aceita Lançamentos",
      options: availableEntries,
      value:
        availableEntries.find((t) => t.value === getValues("accept_entries"))
          ?.label || "",
      placeholder: "",
      onChange: ({ value }) => setValue("accept_entries", value),
    },
  ];

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
        pageTitle="Inserir Conta"
        headerRight={() => (
          <TouchableNativeFeedback
            onPress={addBill}
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
        {formFields.map((f) => (
          <View key={f.label} sx={{ marginY: "$xxs" }}>
            <FormField {...f} />
          </View>
        ))}
      </View>
    </View>
  );
}
