// components/Features.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Features({ features, navigation, styles, theme }) {
  return (
    <View style={styles.marketing}>
      <View style={styles.featuresRow}>
        {features.map((f, idx) => (
          <View key={idx} style={styles.featureCol}>
            <View style={styles.featureIcon}>
              <Image source={f.img} style={styles.featureImage} resizeMode="cover" />
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
  );
}
