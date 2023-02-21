import * as SplashScreen from "expo-splash-screen";
import { DripsyProvider } from "dripsy";
import { theme } from "./src/config/theme";
import MainNavigator from "./src/navigation/MainNavigator";
import DatabaseServiceProvider from "./src/providers/DatabaseProvider";
import QueryContextProvider from "./src/providers/QueryContextProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <DatabaseServiceProvider>
      <QueryContextProvider>
        <DripsyProvider theme={theme}>
          <MainNavigator />
        </DripsyProvider>
      </QueryContextProvider>
    </DatabaseServiceProvider>
  );
}
