// App.js (Expo / React Native) - Versión móvil, una sola pantalla
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

const { width } = Dimensions.get("window");
const CAROUSEL_HEIGHT = Math.round((width * 9) / 16); // ratio 16:9

// IMPORTACIONES ESTÁTICAS (NO dinámicas)
const granizados2banner = require("./assets/granizados2banner.jpg");
const bannerBotell = require("./assets/bannerBotell.jpg");
const propaganda = require("./assets/propaganda.jpg");

const granizadoraCartoon = require("./assets/granizadoraCartoon.jpg");
const vaso = require("./assets/vaso.jpeg");
const sprite = require("./assets/sprite.jpeg");

const granisadora1 = require("./assets/granisadora1.jpg");
const granisadora2 = require("./assets/granisadora2.jpg");
const granisadora3 = require("./assets/granisadora3.jpg");

export default function App() {
  const [dark, setDark] = useState(false); // puedes ligar a un Switch si quieres
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  const banners = [granizados2banner, bannerBotell, propaganda];

  // Auto-advance carousel
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

  // Feature cards data
  const features = [
    {
      title: "Granizadoras",
      //text: "Máquinas profesionales para crear los mejores granizados.",
      img: granizadoraCartoon,
    },
    {
      title: "Insumos",
      //text: "Todos los ingredientes necesarios para tus productos.",
      img: vaso,
    },
    {
      title: "Dulces",
      //text: "Complementos dulces para realzar tus creaciones y preparar el mejor coctel.",
      img: sprite,
    },
  ];

  const featurettes = [
    {
      title: "Granizadora de 1 tanque.",
      lead:
        "✔️ Ideal para: Pequeños eventos, kioskos, cafeterías o venta ambulante.\n✔️ Capacidad: Produce hasta 30-40 granizados por hora.\n✔️ Características: Compacta y fácil de transportar. Sistema de enfriamiento rápido. Tanque de mezcla único. Bajo consumo eléctrico (110V/220V).\n✔️ Ventajas: Económica y perfecta para emprendedores. Funcionamiento sencillo con un solo operador.",
      img: granisadora1,
      reverse: false,
    },
    {
      title: "Granizadora 2 tanques.",
      lead:
        "✔️ Ideal para: Fiestas medianas, ferias o negocios con alta demanda.\n✔️ Capacidad: Produce hasta 60-80 granizados por hora (2 sabores simultáneos).\n✔️ Características: Dos tanques independientes para mezclar sabores diferentes. Panel de control dual. Estructura reforzada en acero inoxidable.\n✔️ Ventajas: Mayor variedad de sabores sin parar la producción.",
      img: granisadora2,
      reverse: true,
    },
    {
      title: "Granizadora 3 tanques.",
      lead:
        "✔️ Ideal para: Eventos masivos, parques temáticos o franquicias.\n✔️ Capacidad: Produce hasta 100-120 granizados por hora (3 sabores a la vez).\n✔️ Características: Tres dispensadores profesionales con boquillas antigoteo. Tecnología de enfriamiento turbo.\n✔️ Ventajas: Atiende grandes volúmenes con rapidez. Personalización premium (iluminación LED, pantalla digital).",
      img: granisadora3,
      reverse: false,
    },
  ];

  const handleDetail = (title) => {
    // por ahora muestra alerta; puedes enlazar a otra pantalla si lo deseas
    Alert.alert(title, "Aquí iría la página de detalles.");
  };

  const theme = dark ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.safeArea, theme.container]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header simple */}
        <View style={[styles.header, { backgroundColor: "#f0ec08" }]}>
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
          {/* indicadores */}
          <View style={styles.indicators}>
            {banners.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  i === index ? { opacity: 1, transform: [{ scale: 1.15 }] } : { opacity: 0.5 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* FEATURES (cards) */}
        <View style={styles.marketing}>
          <View style={styles.featuresRow}>
            {features.map((f, idx) => (
              <View key={idx} style={styles.featureCol}>
                <View style={styles.featureIcon}>
                  <Image source={f.img} style={styles.featureImage} resizeMode="cover" />
                </View>
                <Text style={[styles.featureTitle, theme.text]}>{f.title}</Text>
                <Text style={[styles.featurePar, theme.text]}>{f.text}</Text>
                <TouchableOpacity
                  style={styles.btnOutline}
                  onPress={() => handleDetail(f.title)}
                >
                  <Text style={styles.btnOutlineText}>Ver detalles »</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* FEATURETTES */}
        <View style={styles.featurettesContainer}>
          {featurettes.map((ft, i) => (
            <View key={i} style={styles.featuretteRow}>
              <View style={[styles.featuretteTextWrap, ft.reverse && styles.orderRight]}>
                <Text style={[styles.featuretteHeading, theme.text]}>{ft.title}</Text>
                <Text style={[styles.leadText, theme.text]}>{ft.lead}</Text>
              </View>
              <View style={styles.featuretteImageWrap}>
                <Image source={ft.img} style={styles.featuretteImage} resizeMode="cover" />
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.footer]}>
          <Text style={theme.text}>© IceFrioHielo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 30 },

  header: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },

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
  featuresRow: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  featureCol: {
    width: (width - 48) / 3, // 3 columnas en pantalla grande; en móvil se ajusta por flexWrap
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
    shadowColor: "violet",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  featureImage: { width: "100%", height: "100%" },
  featureTitle: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  featurePar: { fontSize: 12, textAlign: "center", marginTop: 6, paddingHorizontal: 4 },

  btnOutline: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "violet",
    borderRadius: 6,
    transform: [{ skewX: "-15deg" }],
  },
  btnOutlineText: { color: "white", fontWeight: "700", transform: [{ skewX: "15deg" }] },

  featurettesContainer: { paddingHorizontal: 12, paddingVertical: 8 },
  featuretteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    flexWrap: "wrap",
  },
  featuretteTextWrap: { flex: 1, minWidth: 260, paddingRight: 8 },
  orderRight: { order: 2 },
  featuretteHeading: { fontSize: 18, marginBottom: 8 },
  leadText: { fontSize: 14, lineHeight: 20 },

  featuretteImageWrap: {
    width: 300,
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
  },
  featuretteImage: { width: "100%", height: "100%" },

  footer: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#6c757d",
  },
});

/* Light / Dark theme objects */
const lightStyles = {
  container: { backgroundColor: "#ffffff" },
  text: { color: "#212529" },
};
const darkStyles = {
  container: { backgroundColor: "#212529" },
  text: { color: "#f8f9fa" },
};
