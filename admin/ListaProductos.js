import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ListaProductos({ navigation }) {
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Hielo en cubos', precio: 5000, imagen: null },
    { id: '2', nombre: 'Granizado de fresa', precio: 7000, imagen: null },
  ]);

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagen ? (
              <Image source={{ uri: item.imagen }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}><Text>Sin imagen</Text></View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text>${item.precio}</Text>
            </View>
            <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Crud')}>
        <Text style={styles.btnText}>Volver al CRUD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  placeholder: {
    width: 60, height: 60, backgroundColor: '#eee',
    alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 10
  },
  name: { fontWeight: 'bold' },
  delete: { fontSize: 20, color: 'red', marginLeft: 10 },
  btn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
