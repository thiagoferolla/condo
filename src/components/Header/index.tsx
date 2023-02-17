import { View, Text, useSx } from "dripsy";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";
import { TouchableNativeFeedback } from "react-native";

type HeaderProps = {
  pageTitle: string;
  headerRight?: () => React.ReactNode;
};

export default function Header(props: HeaderProps) {
  const sx = useSx();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();

  const enableGoBack = navigation.canGoBack();

  return (
    <View
      sx={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "$primary",
        paddingX: "$lg",
      }}
    >
      <View
        sx={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingY: "$md",
        }}
      >
        {enableGoBack && (
          <View sx={{ marginRight: "$md" }}>
            <TouchableNativeFeedback onPress={navigation.goBack}>
              <Icon
                name="chevron-left"
                size={36}
                color={sx({ color: "$white" }).color}
                style={{ margin: -5 }}
              />
            </TouchableNativeFeedback>
          </View>
        )}

        <Text
          sx={{
            fontSize: "$xl",
            color: "$white",
            fontWeight: "bold",
          }}
        >
          {props.pageTitle}
        </Text>
      </View>

      {props.headerRight && props.headerRight()}
    </View>
  );
}
