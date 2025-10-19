import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function Categorias({ navigation }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const productos = [
    { id: '1', nombre: 'Granizado de Mora', categoria: 'Granizadoras' },
    { id: '2', nombre: 'Bolsa de hielo', categoria: 'Insumos' },
    { id: '3', nombre: 'Chocolatina', categoria: 'Dulces' },
  ];

  const categorias = ['Granizadoras', 'Insumos', 'Dulces', 'Ofertas'];
  const productosFiltrados = productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos por Categoría</Text>

      <View style={styles.categorias}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.btn, categoriaSeleccionada === cat && styles.btnActive]}
            onPress={() => setCategoriaSeleccionada(cat)}
          >
            <Text style={{ color: categoriaSeleccionada === cat ? '#fff' : '#000' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nombre}</Text>
        )}
      />

      <TouchableOpacity style={styles.volver} onPress={() => navigation.navigate('Crud')}>
        <Text style={{ color: '#fff' }}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 10 },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 15 },
  btn: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 10, margin: 5,
  },
  btnActive: { backgroundColor: '#007bff', borderColor: '#007bff' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  volver: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
