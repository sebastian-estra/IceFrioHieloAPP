import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Pedidos({ navigation }) {
  const [pedidos, setPedidos] = useState([
    { id: '1', cliente: 'Carlos', producto: 'Granizado de limón', cantidad: 2 },
    { id: '2', cliente: 'María', producto: 'Hielo en cubos', cantidad: 3 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Realizados</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.cliente}</Text>
            <Text>{item.producto} × {item.cantidad}</Text>
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
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 10, marginVertical: 5,
  },
  name: { fontWeight: 'bold' },
  btn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
