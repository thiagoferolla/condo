import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddBill from "../pages/AddBill";
import BillsPlan from "../pages/BillsPlan";
import { MainNavigatorScreens } from "./types";

const Stack = createNativeStackNavigator<MainNavigatorScreens>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BillsPlan" component={BillsPlan} />

        <Stack.Screen name="AddBill" component={AddBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
