// screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Carousel from "../components/Carousel";
import Features from "../components/Features";
import Featurettes from "../components/Featurettes";
import styles, { lightStyles, darkStyles } from "../styles/homeStyles";

const banners = [
  require("../image/granizados2banner.jpg"),
  require("../image/bannerBotell.jpg"),
  require("../image/nuevaft2.jpg"),
];

const features = [
  { title: "Granizadoras", img: require("../image/granizadoraCartoon.jpg") },
  { title: "Insumos", img: require("../image/vaso.jpeg") },
  { title: "Dulces", img: require("../image/sprite.jpeg") },
];

const featurettes = [
  {
    title: "Granizadora de 1 tanque",
    lead:
      "Compacta, ligera y perfecta para pequeños eventos o kioskos. Produce hasta 40 granizados por hora con bajo consumo eléctrico.",
    img: require("../image/granisadora1.jpg"),
  },
  {
    title: "Granizadora de 2 tanques",
    lead:
      "Ideal para negocios medianos. Permite ofrecer dos sabores a la vez, con sistema de enfriamiento independiente y alta capacidad.",
    img: require("../image/granisadora2.jpg"),
  },
  {
    title: "Granizadora de 3 tanques",
    lead:
      "Pensada para grandes eventos. Tres dispensadores con control digital y enfriamiento rápido para máxima productividad.",
    img: require("../image/granisadora3.jpg"),
  },
];

export default function HomeScreen({ navigation, route }) {
  const [dark, setDark] = useState(false);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (route.params?.toggleMenu) {
      route.params.toggleMenu.current = () => setMenuVisible((prev) => !prev);
    }
  }, [route.params]);

  const theme = dark ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.safeArea, theme.container]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Carousel banners={banners} index={index} setIndex={setIndex} styles={styles} />
        <Features features={features} navigation={navigation} styles={styles} theme={theme} />
        <Featurettes featurettes={featurettes} styles={styles} theme={theme} />

        <View style={styles.footer}>
          <Text style={theme.text}>© IceFrioHielo</Text>
        </View>
      </ScrollView>

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
