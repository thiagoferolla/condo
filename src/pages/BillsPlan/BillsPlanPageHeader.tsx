import { useSx, View } from "dripsy";
import { TouchableNativeFeedback, StatusBar } from "react-native";
import Header from "../../components/Header";
import SearchBox from "../../components/SearchBox";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigatorScreens } from "../../navigation/types";
import { useState } from "react";

type BillsPlanPageHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function BillsPlanPageHeader(props: BillsPlanPageHeaderProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorScreens>>();
  const sx = useSx();

  return (
    <>
      <Header
        pageTitle="Plano de Contas"
        headerRight={() => (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("AddBill")}
            style={sx({ padding: "$sm" })}
          >
            <Icon name="add" size={24} color={sx({ color: "$white" }).color} />
          </TouchableNativeFeedback>
        )}
      />
      <View sx={{ paddingX: "$lg", marginTop: "$sm", marginBottom: "$lg" }}>
        <SearchBox
          value={props.search}
          onChangeText={props.onSearchChange}
          placeholder="Pesquisar conta"
        />
      </View>
    </>
  );
}
