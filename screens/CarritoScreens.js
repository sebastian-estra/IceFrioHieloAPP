// screens/CarritoScreens.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const CarritoScreens = ({ navigation }) => {
  // Datos simulados del carrito
  const carrito = [
    { id: 1, nombre: "Granizadora de 1 tanque", precio: 950000, cantidad: 1 },
    { id: 2, nombre: "Jarabe de Fresa 1L", precio: 6800, cantidad: 2 },
    { id: 3, nombre: "Vasos plásticos 12oz", precio: 11500, cantidad: 1 },
  ];

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛒 Tu Carrito 🛒</Text>
        <Text style={styles.subtitle}>
          Revisa los productos que vas a comprar antes de finalizar tu pedido.
        </Text>
      </View>

      {carrito.map((item) => (
        <View key={item.id} style={styles.product}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productDetails}>
              Cantidad: {item.cantidad} | Precio: ${item.precio.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.productTotal}>
            ${(item.precio * item.cantidad).toLocaleString()}
          </Text>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total a pagar:</Text>
        <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Finalizar compra 💳</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.backText}>« Seguir comprando</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#0077b6" },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center" },

  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productDetails: { fontSize: 14, color: "#666", marginTop: 5 },
  productTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0077b6",
    alignSelf: "center",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  totalText: { fontSize: 18, color: "#333" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#0077b6" },

  payButton: {
    marginTop: 25,
    backgroundColor: "#0077b6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  backButton: {
    marginTop: 15,
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#333", fontWeight: "bold", fontSize: 16 },
});

export default CarritoScreens;
