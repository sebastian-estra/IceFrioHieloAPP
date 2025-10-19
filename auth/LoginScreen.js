import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 🔹 Importa los usuarios
import { usuarios } from "../data/users"; // Asegúrate que el archivo se llama users.js

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    // 🔹 Busca el usuario por correo y contraseña
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      Alert.alert("Inicio de sesión exitoso", `Bienvenido ${user.email}`);

      // 🔹 Redirección según el rol
      if (user.rol === "admin") {
        navigation.navigate("Crud"); // 👉 Te lleva al panel del admin
      } else if (user.rol === "cliente") {
        navigation.navigate("Inicio"); // 👉 Te lleva al inicio del cliente
      }
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Usa tu correo y contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#6a1b9a"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5e9ff", justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#6a1b9a" },
  subtitle: { color: "#555", marginBottom: 20 },
  input: {
    width: "90%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  passwordContainer: {
    width: "90%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: { flex: 1, height: "100%", color: "#000" },
  eyeButton: { padding: 5 },
  forgotText: { color: "#6a1b9a", marginBottom: 20 },
  button: {
    backgroundColor: "#6a1b9a",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  link: { color: "#6a1b9a", marginTop: 20 },
});
