import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const DulcesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍬 Sección de Dulces 🍬</Text>
        <Text style={styles.subtitle}>
          Aquí encontrarás todos nuestros productos dulces y confites.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Chocolates variados</Text>
        <Text style={styles.productDescription}>
          Caja de 12 unidades con mezcla de sabores clásicos y premium.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Gomitas frutales</Text>
        <Text style={styles.productDescription}>
          Surtido con frutas tropicales, ideal para acompañar tus granizados.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Caramelos de menta</Text>
        <Text style={styles.productDescription}>
          Refrescantes y perfectos para después de un granizado.
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
  title: { fontSize: 24, fontWeight: "bold", color: "#ff6b6b" },
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
    backgroundColor: "#ff6b6b",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default DulcesScreen;
