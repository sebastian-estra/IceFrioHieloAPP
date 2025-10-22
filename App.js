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
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
function HomeScreen({ navigation, route }) {
  const [dark, setDark] = useState(false);
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const banners = [granizados2banner, bannerBotell, propaganda];

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

  // Permitir que el header controle el menú
  useEffect(() => {
    if (route.params?.toggleMenu) {
      route.params.toggleMenu.current = () => setMenuVisible((prev) => !prev);
    }
  }, [route.params]);

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
                    style={[
                      styles.featureImage,
                      f.title === "Dulces" && {
                        width: "75%",
                        height: "105%",
                        marginLeft: 15,
                        resizeMode: "contain",
                      },
                    ]}
                    resizeMode={f.title === "Dulces" ? "contain" : "cover"}
                  />
                </View>

                <Text style={[styles.featureTitle, theme.text]}>
                  {f.title}
                </Text>

                <TouchableOpacity
                  style={styles.btnOutline}
                  onPress={() => navigation.navigate(f.title)}
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
              <View style={styles.featuretteTextWrap}>
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

      {/* MENÚ LATERAL */}
      {menuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity
            onPress={() => setMenuVisible(false)}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
            <Text style={styles.menuItem}>Ofertas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Insumos")}>
            <Text style={styles.menuItem}>Insumos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Granizadoras")}>
            <Text style={styles.menuItem}>Granizados</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Dulces")}>
            <Text style={styles.menuItem}>Dulces</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Pedidos")}>
            <Text style={styles.menuItem}>🛒 Carrito</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ========================
// NAVEGACIÓN PRINCIPAL
// ========================
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
                {/* 🔹 ESTE BOTÓN AHORA ABRE EL MENÚ */}
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
            headerStyle: {
              backgroundColor: "#ee82ee", // 💜 cambia este color del banner
            },
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

        {/* DEMÁS PANTALLAS */}
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

// ========================
// ESTILOS
// ========================
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 30 },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#ee82ee", // 💜 color del menú lateral
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 20,
    elevation: 10,
  },
  closeBtn: { position: "absolute", top: 20, right: 20 },
  menuItem: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 12,
    fontWeight: "600",
  },
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
  footer: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#6c757d",
  },
});

const lightStyles = {
  container: { backgroundColor: "#ffffff" },
  text: { color: "#212529" },
};
const darkStyles = {
  container: { backgroundColor: "#212529" },
  text: { color: "#f8f9fa" },
};
