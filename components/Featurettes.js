// components/Featurettes.js
import React from "react";
import { View, Text, Image } from "react-native";

export default function Featurettes({ featurettes, styles, theme }) {
  return (
    <View style={styles.featurettesContainer}>
      {featurettes.map((ft, i) => (
        <View key={i} style={styles.featuretteRow}>
          <View style={styles.featuretteTextWrap}>
            <Text style={[styles.featuretteHeading, theme.text]}>{ft.title}</Text>
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
  );
}
