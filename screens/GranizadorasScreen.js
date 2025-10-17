import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const GranizadorasScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍧 Sección de Granizadoras 🍧</Text>
        <Text style={styles.subtitle}>
          Encuentra las mejores máquinas granizadoras para tu negocio o uso personal.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Granizadora industrial</Text>
        <Text style={styles.productDescription}>
          Capacidad de 15L, ideal para alto rendimiento y enfriamiento rápido.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Granizadora doble compartimiento</Text>
        <Text style={styles.productDescription}>
          Permite preparar dos sabores al mismo tiempo con control independiente.
        </Text>
      </View>

      <View style={styles.product}>
        <Text style={styles.productName}>Granizadora portátil</Text>
        <Text style={styles.productDescription}>
          Compacta, ligera y perfecta para eventos pequeños o uso doméstico.
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
  title: { fontSize: 24, fontWeight: "bold", color: "#00b4d8" },
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
    backgroundColor: "#00b4d8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default GranizadorasScreen;
