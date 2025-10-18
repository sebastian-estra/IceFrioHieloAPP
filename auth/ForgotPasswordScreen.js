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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSendEmail = () => {
    if (!email) return Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
    Alert.alert("Correo enviado", `Se ha enviado un código al correo: ${email}`);
  };

  const handleResetPassword = () => {
    if (!token || !newPassword) return Alert.alert("Error", "Por favor completa todos los campos.");
    Alert.alert("Éxito", "Tu contraseña ha sido restablecida correctamente.");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.subtitle}>Ingresa tu correo para recibir el código</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Enviar código</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Introduce el código y tu nueva contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Código de verificación"
            placeholderTextColor="#999"
            value={token}
            onChangeText={setToken}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nueva Contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#6a1b9a" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Restablecer Contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Volver al inicio de sesión</Text>
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
