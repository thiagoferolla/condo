import * as SplashScreen from "expo-splash-screen";
import { DripsyProvider } from "dripsy";
import { theme } from "./src/config/theme";
import MainNavigator from "./src/navigation/MainNavigator";
import DatabaseServiceProvider from "./src/providers/DatabaseProvider";
import QueryContextProvider from "./src/providers/QueryContextProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";


SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <DatabaseServiceProvider>
      <QueryContextProvider>
        <DripsyProvider theme={theme}>
          <ActionSheetProvider>
            <MainNavigator />
          </ActionSheetProvider>
        </DripsyProvider>
      </QueryContextProvider>
    </DatabaseServiceProvider>
  );
}
