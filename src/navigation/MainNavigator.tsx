import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useDatabase from "../hooks/useDatabase";
import AddBill from "../pages/AddBill";
import BillsPlan from "../pages/BillsPlan";
import { MainNavigatorScreens } from "./types";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const Stack = createNativeStackNavigator<MainNavigatorScreens>();

export default function MainNavigator() {
  const databaseService = useDatabase();

  useEffect(() => {
    if (databaseService) {
      SplashScreen.hideAsync();
    }
  }, [databaseService]);

  if (!databaseService) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BillsPlan" component={BillsPlan} />

        <Stack.Screen name="AddBill" component={AddBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
