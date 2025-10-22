// styles/homeStyles.js
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const CAROUSEL_HEIGHT = Math.round((width * 9) / 16);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 30 },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#ee82ee",
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

export const lightStyles = {
  container: { backgroundColor: "#ffffff" },
  text: { color: "#212529" },
};
export const darkStyles = {
  container: { backgroundColor: "#212529" },
  text: { color: "#f8f9fa" },
};

export default styles;
