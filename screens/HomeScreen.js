// screens/HomeScreen.js
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { lightStyles, darkStyles } from "../styles/homeStyles";

const { width } = Dimensions.get("window");
const CAROUSEL_HEIGHT = Math.round((width * 9) / 16);

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
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

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
        {/* Carrusel */}
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

        {/* Tarjetas */}
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
                <Text style={[styles.featureTitle, theme.text]}>{f.title}</Text>
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

        {/* Featurettes */}
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
