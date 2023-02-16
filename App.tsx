import { DripsyProvider } from "dripsy";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "./src/config/theme";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <MainNavigator />
    </DripsyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
