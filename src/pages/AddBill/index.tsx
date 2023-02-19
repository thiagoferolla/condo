import { Alert } from "react-native";
import { FormFieldProps } from "./FormField";
import * as yup from "yup";
import useAvailableParentAccounts from "../../hooks/useAvailableParentAccounts";
import useNewCode from "../../hooks/useNewCode";
import useDatabase from "../../hooks/useDatabase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";
import { Bill } from "../../@types/Bill";
import { useFormik } from "formik";
import Form from "./Form";

const formSchema = yup.object().shape({
  parent_id: yup.string(),
  code: yup.string().required().min(1),
  name: yup
    .string()
    .required("O nome da conta é obrigatório")
    .min(1, "O nome da conta é obrigatório"),
  type: yup
    .string()
    .required("É necessário escolher o tipo da conta")
    .oneOf(["income", "expense"]),
  accept_entries: yup
    .string()
    .required("É necessário dizer se a conta aceita lançamentos")
    .oneOf(["1", "0"]),
});

const finalSchema = yup.object().shape({
  parent_id: yup.string(),
  code: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().required().oneOf(["income", "expense"]),
  accept_entries: yup.number().required().oneOf([1, 0]),
});

export default function AddBill() {
  const database = useDatabase();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();

  const availableParentAccounts = useAvailableParentAccounts();
  const availableParentAccountsOptions = [
    { label: "Nenhuma", value: "" },
    ...availableParentAccounts.map((a) => ({
      label: `${a.code} - ${a.name}`,
      value: a.id,
    })),
  ];
  const availableTypes: { label: string; value: string }[] = [
    { label: "Receita", value: "income" },
    { label: "Despesa", value: "expense" },
  ];
  const availableEntries: { label: string; value: string }[] = [
    { label: "Sim", value: "1" },
    { label: "Não", value: "0" },
  ];

  const { setFieldTouched, values, handleChange, errors } = useFormik({
    initialValues: {
      parent_id: availableParentAccounts[0]?.id || "",
      code: "",
      name: "",
      type: "",
      accept_entries: "",
    },
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: addBill,
  });

  const code = useNewCode(
    values.parent_id?.length > 0 ? values.parent_id : undefined
  );

  async function addBill() {
    const { parent_id, name, type, accept_entries } = values;

    const bill = {
      parent_id: parent_id?.length > 0 ? parent_id : undefined,
      code,
      name,
      type,
      accept_entries: parseInt(accept_entries),
    };

    try {
      await finalSchema.validate(bill);

      await database?.createBill(bill as Bill);

      Alert.alert("Pronto", "A conta foi adicionada com sucesso :)");

      navigation.goBack();

      return null;
    } catch (err) {
      Alert.alert(
        "Erro",
        "Não foi possível adicionar a conta no momento. Corrija as informações e tenta novamente."
      );

      setFieldTouched("name");
    }
  }

  const formFields: FormFieldProps[] = [
    {
      type: "picker",
      label: "Conta Pai",
      options: availableParentAccountsOptions,
      value:
        availableParentAccountsOptions.find((f) => values.parent_id === f.value)
          ?.label || "",
      placeholder: "Selecione a Conta Pai (opcional)",
      onChange: ({ value }) => handleChange("parent_id")(value),
    },
    {
      type: "text",
      label: "Código",
      editable: false,
      value: code,
      placeholder: "Gerado Automaticamente",
      onChange: () => null,
    },
    {
      type: "text",
      label: "Nome",
      editable: true,
      value: values.name,
      error: errors.name,
      placeholder: "Digite o nome da Conta",
      onChange: (val) => handleChange("name")(val),
      onBlur: () => setFieldTouched("name"),
    },
    {
      type: "picker",
      label: "Tipo",
      options: availableTypes,
      value: availableTypes.find((t) => t.value === values.type)?.label || "",
      error: errors.type,
      placeholder: "",
      onChange: ({ value }) => handleChange("type")(value),
    },
    {
      type: "picker",
      label: "Aceita Lançamentos",
      options: availableEntries,
      value:
        availableEntries.find((t) => t.value === values.accept_entries)
          ?.label || "",
      error: errors.accept_entries,
      placeholder: "",
      onChange: ({ value }) => handleChange("accept_entries")(value),
    },
  ];

  return <Form onSubmit={addBill} formFields={formFields} />;
}
