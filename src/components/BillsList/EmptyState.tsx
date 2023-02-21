import { Dimensions, TouchableNativeFeedback } from "react-native";
import { View, Text, Image } from "dripsy";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";

export default function EmptyState() {
  const { width } = Dimensions.get("screen");
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("./empty.png")}
        sx={{
          width: width * 0.8,
          height: width * 0.5,
          marginTop: "$xl",
        }}
        resizeMode="contain"
      />

      <View>
        <Text
          sx={{
            fontSize: "$md",
            textAlign: "center",
            color: "$highlight",
            marginBottom: "$md",
          }}
        >
          {"Você ainda não possui\nnenhuma conta registrada"}
        </Text>

        <TouchableNativeFeedback onPress={() => navigation.navigate("AddBill")}>
          <View
            sx={{
              backgroundColor: "$primary",
              paddingX: "$md",
              paddingY: "$sm",
              borderRadius: "$sm",
              alignItems: "center",
              justifyContent: "center",
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
            }}
          >
            <Text
              sx={{
                color: "$white",
                fontSize: "$md",
                letterSpacing: 1.25,
              }}
            >
              Cadastrar Primeira Conta
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
