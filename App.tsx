import * as SplashScreen from "expo-splash-screen";
import { DripsyProvider } from "dripsy";
import { theme } from "./src/config/theme";
import MainNavigator from "./src/navigation/MainNavigator";
import DatabaseServiceProvider from "./src/providers/DatabaseProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <DatabaseServiceProvider>
      <DripsyProvider theme={theme}>
        <MainNavigator />
      </DripsyProvider>
    </DatabaseServiceProvider>
  );
}
