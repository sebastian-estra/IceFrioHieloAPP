import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const productosIniciales = [
  {
    id: '1',
    nombre: 'Pulpa de Mango',
    descripcion: 'Deliciosa pulpa natural de mango',
    precio: 50000,
    imagen: require('../assets/pulpaMang.jpg'),
  },
  {
    id: '2',
    nombre: 'Bombombun',
    descripcion: 'Caramelo clásico Bombombun sabor fresa',
    precio: 45000,
    imagen: require('../assets/bombombun.jpg'),
  },
  {
    id: '3',
    nombre: 'Trululú',
    descripcion: 'Gomitas de frutas Trululú surtidas',
    precio: 60000,
    imagen: require('../assets/trululu.jpg'),
  },
];

export default function DulcesScreen() {
  const [productos] = useState(productosIniciales);

  const agregarAlCarrito = (nombre, precio) => {
    Alert.alert('Producto agregado', `${nombre} ($${precio}) fue añadido al carrito 🛒`);
  };

  const renderProducto = ({ item }) => (
    <View style={styles.producto}>
      <Image source={item.imagen} style={styles.imagen} resizeMode="cover" />
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.precio}>${item.precio.toLocaleString()}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => agregarAlCarrito(item.nombre, item.precio)}
      >
        <Text style={styles.textoBoton}>🛒 Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnas}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  lista: {
    paddingHorizontal: 10,
  },
  columnas: {
    justifyContent: 'space-between',
  },
  producto: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imagen: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  descripcion: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  precio: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  boton: {
    backgroundColor: 'violet',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
