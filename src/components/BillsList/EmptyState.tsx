import { useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text } from "dripsy";
import LottieView from "lottie-react-native";

export default function EmptyState() {
  const { width } = Dimensions.get("screen");
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <LottieView
        ref={animationRef}
        autoPlay
        autoSize
        loop
        style={{
          width: width * 0.8,
          height: width * 0.7,
        }}
        source={require("./empty_animation.json")}
      />

      <View>
        <Text
          sx={{ fontSize: "$md", textAlign: "center", color: "$highlight" }}
        >
          {"Você ainda não possui nenhuma\nconta registrada"}
        </Text>

        <Text
          sx={{
            fontSize: "$sm",
            textAlign: "center",
            color: "$text",
            marginTop: "$xs",
          }}
        >
          {
            "Cadastre a primeira conta para acompanhar\naqui seu plano de contas"
          }
        </Text>
      </View>
    </View>
  );
}
