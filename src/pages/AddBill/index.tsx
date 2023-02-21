import { Alert } from "react-native";
import { FormFieldProps } from "./FormField";
import * as yup from "yup";
import useAvailableParentAccounts from "../../hooks/useAvailableParentAccounts";
import useNewCode from "../../hooks/useNewCode";
import useDatabase from "../../hooks/useDatabase";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";
import { Bill } from "../../@types/Bill";
import Form from "./Form";
import useBill from "../../hooks/useBill";
import { useEffect, useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../providers/QueryContextProvider";

const formSchema = yup.object().shape({
  parent_id: yup.string(),
  code: yup
    .string()
    .required()
    .min(1)
    .matches("^[0-9][0-9.]*$", "O código só deve conter números e pontos"),
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
  code: yup
    .string()
    .required()
    .matches("^[0-9][0-9.]*$", "O código só deve conter números e pontos"),
  name: yup.string().required(),
  type: yup.string().required().oneOf(["income", "expense"]),
  accept_entries: yup.number().required().oneOf([1, 0]),
});

export default function AddBill() {
  const database = useDatabase();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();
  const route = useRoute<RouteProp<MainNavigatorScreens, "AddBill">>();
  const { params } = route;
  const edit = Boolean(typeof params?.id === "string");
  const { data: bill } = useBill(params?.id);

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

  const [parentId, setParentId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [nameFieldTouched, setNameFieldTouched] = useState(false);
  const [type, setType] = useState(availableTypes[0].value);
  const [acceptEntries, setAcceptEntries] = useState(availableEntries[0].value);

  const generatedCode = useNewCode(parentId?.length > 0 ? parentId : undefined);

  useEffect(() => {
    setCode(generatedCode);
  }, [generatedCode]);

  useEffect(() => {
    if (edit && bill) {
      setParentId(bill.parent_id || "");
      setCode(bill.code);
      setName(bill.name);
      setType(bill.type);
      setAcceptEntries(bill.accept_entries?.toString() || "");
    }
  }, [edit, bill]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const bill = {
        parent_id: parentId?.length > 0 ? parentId : undefined,
        code,
        name,
        type,
        accept_entries: parseInt(acceptEntries),
      };

      await finalSchema.validate(bill);

      if (edit && params?.id) {
        await database?.updateBill(params?.id, bill as Bill);
      } else {
        await database?.createBill(bill as Bill);
      }

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bills"]);
      Alert.alert(
        "Pronto",
        edit
          ? "A conta foi editada com sucesso :)"
          : "A conta foi adicionada com sucesso :)"
      );

      navigation.goBack();
    },
    onError: () => {
      Alert.alert(
        "Erro",
        edit
          ? "Não foi possível editar a conta no momento. Corrija as informações e tenta novamente."
          : "Não foi possível adicionar a conta no momento. Corrija as informações e tenta novamente."
      );

      setNameFieldTouched(true);
    },
  });

  const errors = useMemo(() => {
    try {
      formSchema.validateSync(
        {
          parent_id: parentId,
          code,
          name,
          type,
          accept_entries: acceptEntries,
        },
        { abortEarly: false }
      );

      return {};
    } catch (err) {
      return err.inner.reduce((acc, curr) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
    }
  }, [parentId, code, name, type, acceptEntries]);

  const formFields: (FormFieldProps & { key: string })[] = [
    {
      key: "parent_id",
      type: "picker",
      label: "Conta Pai",
      options: availableParentAccountsOptions,
      value:
        availableParentAccountsOptions.find((f) => parentId === f.value)
          ?.label || "",
      placeholder: "Selecione a Conta Pai (opcional)",
      onChange: ({ value }) => setParentId(value),
    },
    {
      key: "code",
      type: "text",
      label: "Código",
      editable: true,
      value: code,
      error: errors.code,
      placeholder: "Gerado Automaticamente",
      keyboardType: "numeric",
      onChange: (val) => setCode(val),
    },
    {
      key: "name",
      type: "text",
      label: "Nome",
      editable: true,
      value: name,
      error: nameFieldTouched ? errors.name : undefined,
      placeholder: "Digite o nome da Conta",
      onChange: (val) => setName(val),
      onBlur: () => setNameFieldTouched(true),
    },
    {
      key: "type",
      type: "picker",
      label: "Tipo",
      options: [
        { label: "Receita", value: "income" },
        { label: "Despesa", value: "expense" },
      ],
      value: availableTypes.find((t) => t.value === type)?.label || "",
      placeholder: "Escolha o tipo de conta",
      onChange: (payload) => {
        setType(payload.value);
      },
    },
    {
      key: "accept_entries",
      type: "picker",
      label: "Aceita Lançamentos",
      options: availableEntries,
      value:
        availableEntries.find((t) => t.value === acceptEntries)?.label || "",
      placeholder: "",
      onChange: (payload) => {
        setAcceptEntries(payload.value);
      },
    },
  ];

  return <Form edit={edit} onSubmit={mutate} formFields={formFields} />;
}
