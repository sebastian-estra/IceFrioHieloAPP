// components/Carousel.js
import React from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Carousel({ banners, index, setIndex, styles }) {
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    const id = setInterval(() => {
      const next = (index + 1) % banners.length;
      setIndex(next);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ x: next * width, animated: true });
      }
    }, 4000);
    return () => clearInterval(id);
  }, [index]);

  return (
    <View style={[styles.carousel, { height: Math.round((width * 9) / 16) }]}>
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
  );
}
