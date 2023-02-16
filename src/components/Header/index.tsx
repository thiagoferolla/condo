import { View, Text, useSx } from "dripsy";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";

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
      <View sx={{ flex: 1 }}>
        {enableGoBack && (
          <Icon
            name="chevron-left"
            size={24}
            color={sx({ color: "$white" }).color}
          />
        )}

        <Text
          sx={{
            fontSize: "$xl",
            color: "$white",
            fontWeight: "bold",
            paddingY: "$md",
          }}
        >
          {props.pageTitle}
        </Text>
      </View>

      {props.headerRight && props.headerRight()}
    </View>
  );
}
