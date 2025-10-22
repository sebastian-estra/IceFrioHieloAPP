// App.js
import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import InsumosScreen from "./screens/InsumosScreen";
import GranizadorasScreen from "./screens/GranizadorasScreen";
import DulcesScreen from "./screens/DulcesScreen";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";
import CrudScreen from "./admin/CrudScreen";
import ListaProductos from "./admin/ListaProductos";
import Categorias from "./admin/Categorias";
import Pedidos from "./admin/Pedidos";

const Stack = createNativeStackNavigator();

export default function App() {
  const toggleMenu = useRef(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          initialParams={{ toggleMenu }}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => toggleMenu.current?.()}>
                  <Ionicons
                    name="menu"
                    size={26}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  IceFrioHielo
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#ee82ee" },
            headerTintColor: "#fff",
            headerRight: () => (
              <Ionicons
                name="person-circle-outline"
                size={28}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Login")}
              />
            ),
          })}
        />
        <Stack.Screen name="Insumos" component={InsumosScreen} />
        <Stack.Screen name="Granizadoras" component={GranizadorasScreen} />
        <Stack.Screen name="Dulces" component={DulcesScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Crud" component={CrudScreen} />
        <Stack.Screen name="ListaProductos" component={ListaProductos} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
