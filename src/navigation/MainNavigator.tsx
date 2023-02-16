import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddBill from "../pages/AddBill";
import BillsPlan from "../pages/BillsPlan";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BillsPlan" component={BillsPlan} />

        <Stack.Screen name="AddBill" component={AddBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
