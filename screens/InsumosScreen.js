import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const InsumosScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧃 Sección de Insumos 🧃</Text>
        <Text style={styles.subtitle}>
          Aquí encontrarás todo lo que necesitas para preparar tus granizados.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Vasos plásticos 12oz</Text>
        <Text style={styles.productDescription}>
          Paquete de 50 unidades resistentes y transparentes.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Toppings frutales</Text>
        <Text style={styles.productDescription}>
          Ideal para decorar y agregar sabor a tus granizados.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Jarabes de sabores</Text>
        <Text style={styles.productDescription}>
          Amplia variedad de sabores tropicales: fresa, mango, maracuyá y más.
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
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#0077b6" },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center" },
  product: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  backButton: {
    marginTop: 30,
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default InsumosScreen;
