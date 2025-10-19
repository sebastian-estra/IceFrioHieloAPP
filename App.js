import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// ========================
// IMPORTACIÓN DE PANTALLAS EXISTENTES
// ========================
import DulcesScreen from "./screens/DulcesScreen";
import GranizadorasScreen from "./screens/GranizadorasScreen";
import InsumosScreen from "./screens/InsumosScreen";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";

// ========================
// IMPORTACIÓN DE PANTALLAS ADMIN (nuevas)
// ========================
import CrudScreen from "./admin/CrudScreen";
import ListaProductos from "./admin/ListaProductos";
import Categorias from "./admin/Categorias";
import Pedidos from "./admin/Pedidos";

// ========================
// IMÁGENES ESTÁTICAS
// ========================
const { width } = Dimensions.get("window");
const CAROUSEL_HEIGHT = Math.round((width * 9) / 16);

const granizados2banner = require("./assets/granizados2banner.jpg");
const bannerBotell = require("./assets/bannerBotell.jpg");
const propaganda = require("./assets/nuevaft2.jpg");
const granizadoraCartoon = require("./assets/granizadoraCartoon.jpg");
const vaso = require("./assets/vaso.jpeg");
const sprite = require("./assets/sprite.jpeg");
const granisadora1 = require("./assets/granisadora1.jpg");
const granisadora2 = require("./assets/granisadora2.jpg");
const granisadora3 = require("./assets/granisadora3.jpg");

const Stack = createNativeStackNavigator();

// ========================
// PANTALLA PRINCIPAL (HOME)
// ========================
function HomeScreen({ navigation }) {
  const [dark, setDark] = useState(false);
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const banners = [granizados2banner, bannerBotell, propaganda];

  // Rotación automática del carrusel
  useEffect(() => {
    const id = setInterval(() => {
      const next = (index + 1) % banners.length;
      setIndex(next);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ x: next * width, animated: true });
      }
    }, 4000);
    return () => clearInterval(id);
  }, [index]);

  const features = [
    { title: "Granizadoras", img: granizadoraCartoon },
    { title: "Insumos", img: vaso },
    { title: "Dulces", img: sprite },
  ];

  const featurettes = [
    {
      title: "Granizadora de 1 tanque",
      lead:
        "Compacta, ligera y perfecta para pequeños eventos o kioskos. Produce hasta 40 granizados por hora con bajo consumo eléctrico.",
      img: granisadora1,
    },
    {
      title: "Granizadora de 2 tanques",
      lead:
        "Ideal para negocios medianos. Permite ofrecer dos sabores a la vez, con sistema de enfriamiento independiente y alta capacidad.",
      img: granisadora2,
    },
    {
      title: "Granizadora de 3 tanques",
      lead:
        "Pensada para grandes eventos. Tres dispensadores con control digital y enfriamiento rápido para máxima productividad.",
      img: granisadora3,
    },
  ];

  const theme = dark ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.safeArea, theme.container]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* HEADER */}
        <View style={[styles.header, { backgroundColor: "#ff6ef3ff" }]}>
          <Text style={styles.headerTitle}>IceFrioHielo</Text>
        </View>

        {/* CARRUSEL */}
        <View style={[styles.carousel, { height: CAROUSEL_HEIGHT }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={carouselRef}
            onMomentumScrollEnd={(e) => {
              const s = Math.round(e.nativeEvent.contentOffset.x / width);
              setIndex(s);
            }}
          >
            {banners.map((src, i) => (
              <Image
                key={i}
                source={src}
                style={[styles.bannerImage, { width: width }]}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.indicators}>
            {banners.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  i === index
                    ? { opacity: 1, transform: [{ scale: 1.15 }] }
                    : { opacity: 0.5 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* SECCIÓN DE TARJETAS */}
        <View style={styles.marketing}>
          <View style={styles.featuresRow}>
            {features.map((f, idx) => (
              <View key={idx} style={styles.featureCol}>
                <View style={styles.featureIcon}>
                  <Image
                    source={f.img}
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.featureTitle, theme.text]}>
                  {f.title}
                </Text>
                <TouchableOpacity
                  style={styles.btnOutline}
                  onPress={() => {
                    if (f.title === "Granizadoras") {
                      navigation.navigate("Granizadoras");
                    } else if (f.title === "Insumos") {
                      navigation.navigate("Insumos");
                    } else if (f.title === "Dulces") {
                      navigation.navigate("Dulces");
                    }
                  }}
                >
                  <Text style={styles.btnOutlineText}>Ver detalles »</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* DETALLES DE GRANIZADORAS */}
        <View style={styles.featurettesContainer}>
          {featurettes.map((ft, i) => (
            <View key={i} style={styles.featuretteRow}>
              <View
                style={[
                  styles.featuretteTextWrap,
                  ft.reverse && styles.orderRight,
                ]}
              >
                <Text style={[styles.featuretteHeading, theme.text]}>
                  {ft.title}
                </Text>
                <Text style={[styles.leadText, theme.text]}>{ft.lead}</Text>
              </View>
              <View style={styles.featuretteImageWrap}>
                <Image
                  source={ft.img}
                  style={styles.featuretteImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={[styles.footer]}>
          <Text style={theme.text}>© IceFrioHielo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ========================
// NAVEGACIÓN PRINCIPAL
// ========================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* HOME */}
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "IceFrioHielo",
            headerStyle: { backgroundColor: "#ff6ef3ff" },
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

        {/* PANTALLAS CLIENTE */}
        <Stack.Screen name="Insumos" component={InsumosScreen} />
        <Stack.Screen name="Granizadoras" component={GranizadorasScreen} />
        <Stack.Screen name="Dulces" component={DulcesScreen} />

        {/* AUTH */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* ADMIN */}
        <Stack.Screen name="Crud" component={CrudScreen} options={{ title: "Gestión de Productos" }} />
        <Stack.Screen name="ListaProductos" component={ListaProductos} options={{ title: "Lista de Productos" }} />
        <Stack.Screen name="Categorias" component={Categorias} options={{ title: "Productos por Categoría" }} />
        <Stack.Screen name="Pedidos" component={Pedidos} options={{ title: "Pedidos Realizados" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ========================
// ESTILOS REAJUSTADOS
// ========================
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 30 },
  header: { paddingVertical: 16, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "white" },
  carousel: { width: "100%", backgroundColor: "violet" },
  bannerImage: { height: CAROUSEL_HEIGHT },
  indicators: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginHorizontal: 6,
  },
  marketing: { paddingVertical: 20, paddingHorizontal: 12 },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureCol: {
    width: (width - 48) / 3,
    alignItems: "center",
    marginBottom: 18,
  },
  featureIcon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 6,
  },
  featureImage: { width: "100%", height: "100%" },
  featureTitle: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  btnOutline: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "violet",
    borderRadius: 6,
    transform: [{ skewX: "-15deg" }],
  },
  btnOutlineText: {
    color: "white",
    fontWeight: "700",
    transform: [{ skewX: "15deg" }],
  },
  featurettesContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  featuretteRow: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 35,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  featuretteImageWrap: {
    width: "100%",
    height: 310,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  featuretteImage: { width: "100%", height: "100%", resizeMode: "cover" },
  featuretteTextWrap: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: "center",
  },
  featuretteHeading: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  leadText: { fontSize: 14, lineHeight: 20, textAlign: "center", color: "#555" },
  orderRight: { order: 2 },
  footer: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#6c757d",
  },
  secondaryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

const lightStyles = {
  container: { backgroundColor: "#ffffff" },
  text: { color: "#212529" },
};
const darkStyles = {
  container: { backgroundColor: "#212529" },
  text: { color: "#f8f9fa" },
};
