// screens/OfertasScreens.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const OfertasScreens = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Ofertas Especiales 🔥</Text>
        <Text style={styles.subtitle}>
          ¡Aprovecha nuestros descuentos limitados en productos seleccionados!
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Granizadora de 2 tanques</Text>
        <Text style={styles.productDescription}>
          Antes: $2.200.000 — Ahora: $1.899.000 💥
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Paquete de Vasos 12oz (50 unidades)</Text>
        <Text style={styles.productDescription}>
          Antes: $15.000 — Ahora: $11.500 🎉
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Jarabe de Fresa 1L</Text>
        <Text style={styles.productDescription}>
          Antes: $9.000 — Ahora: $6.800 🍓
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Topping de Mango</Text>
        <Text style={styles.productDescription}>
          Antes: $7.000 — Ahora: $5.500 🥭
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.backText}>« Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff8f0", padding: 20 },
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#d62828" },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center" },
  product: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#ffb703",
  },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  backButton: {
    marginTop: 30,
    backgroundColor: "#d62828",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default OfertasScreens;
