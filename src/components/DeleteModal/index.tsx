import { Modal, TouchableNativeFeedback } from "react-native";
import { View, Text, useSx } from "dripsy";
import useDatabase from "../../hooks/useDatabase";
import useBill from "../../hooks/useBill";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../providers/QueryContextProvider";

type DeleteModalProps = {
  billId: string;
  visible: boolean;
  onRequestClose: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
  const database = useDatabase();
  const { data: bill } = useBill(props.billId);
  const sx = useSx();

  const { mutate } = useMutation({
    mutationFn: () => {
      return database?.deleteBill(props.billId);
    },
    onSuccess() {
      props.onRequestClose();
      queryClient.invalidateQueries(["bills"]);
      queryClient.invalidateQueries(["bills", { id: props.billId }]);
    },
  });

  return (
    <Modal
      onRequestClose={props.onRequestClose}
      visible={props.visible}
      transparent
    >
      <View
        sx={{
          flex: 1,
          backgroundColor: "$overflow",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          sx={{
            backgroundColor: "$white",
            paddingX: "$lg",
            paddingY: "$md",
            borderRadius: "$lg",
          }}
        >
          <View
            sx={{
              alignItems: "center",
              justifyContent: "center",
              paddingY: "$lg",
            }}
          >
            <Icon
              size={48}
              name="delete-outline"
              color={sx({ color: "$destructive" }).color}
            />
            <Text
              sx={{
                textAlign: "center",
                color: "#6C6C80",
                marginTop: "$md",
              }}
            >
              {"Deseja excluir a conta\n"}
              <Text sx={{ fontWeight: "700" }}>
                {bill?.code} - {bill?.name}
              </Text>
              ?
            </Text>
          </View>

          <View
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableNativeFeedback onPress={props.onRequestClose}>
              <View
                sx={{
                  paddingX: "$md",
                  paddingY: "$sm",
                }}
              >
                <Text
                  sx={{
                    fontSize: "$md",
                    color: "$destructive",
                  }}
                >
                  Não!
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={mutate}>
              <View
                sx={{
                  backgroundColor: "$destructive",
                  borderRadius: "$full",
                  paddingX: "$md",
                  paddingY: "$sm",
                }}
              >
                <Text
                  sx={{
                    fontSize: "$md",
                    color: "$white",
                  }}
                >
                  Com certeza
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
}
