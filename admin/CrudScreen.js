import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CrudScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState(null);

    const categorias = ['Granizadoras', 'Insumos', 'Dulces', 'Ofertas'];

    const seleccionarImagen = async () => {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permiso.status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita acceso a la galería.');
            return;
        }
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!resultado.canceled) {
            setImagen(resultado.assets[0].uri);
        }
    };

    const agregarProducto = () => {
        if (!nombre || !descripcion || !categoria || !precio || !cantidad) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return;
        }

        Alert.alert('Producto agregado', `${nombre} ha sido agregado con éxito.`);
        // Aquí se haría el POST al backend
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setPrecio('');
        setCantidad('');
        setImagen(null);
    };

    const cerrarSesion = () => {
        Alert.alert('Cerrar sesión', 'Sesión cerrada correctamente.');
        navigation.navigate('Login');
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 120 }} // 👈 espacio al final para que no se corte
            showsVerticalScrollIndicator={false}
        >
            <View style={{ alignItems: 'flex-end' }}>
                <Button title="Cerrar sesión" onPress={cerrarSesion} />
            </View>

            <Text style={styles.title}>IceFrioHielo</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TouchableOpacity style={styles.imagePicker} onPress={seleccionarImagen}>
                    <Text style={{ color: '#555' }}>Seleccionar Imagen</Text>
                </TouchableOpacity>

                {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />

                <Text style={styles.label}>Categoría:</Text>
                {categorias.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.option, categoria === cat && styles.optionSelected]}
                        onPress={() => setCategoria(cat)}
                    >
                        <Text>{cat}</Text>
                    </TouchableOpacity>
                ))}

                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    keyboardType="numeric"
                    value={precio}
                    onChangeText={setPrecio}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    value={cantidad}
                    onChangeText={setCantidad}
                />

                <Button title="Agregar Producto" onPress={agregarProducto} />

                {/* 🔽 Enlaces de navegación con margen adicional para que se vean completos */}
                <View style={styles.links}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListaProductos')}>
                        <Text style={styles.linkText}>📦 Lista de Productos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Categorias')}>
                        <Text style={styles.linkText}>🗂️ Productos por Categoría</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
                        <Text style={styles.linkText}>🛒 Pedidos realizados</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#3b3b3b',
    },
    form: {
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    option: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginVertical: 3,
        backgroundColor: '#f2f2f2',
    },
    optionSelected: {
        backgroundColor: '#d0f0ff',
        borderColor: '#00aaff',
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    imagePreview: {
        width: 120,
        height: 120,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    links: {
        marginTop: 30,
        alignItems: 'center',
        paddingBottom: 30, // 👈 espacio extra por si hay notch o barra de navegación
    },
    linkText: {
        color: '#007bff',
        marginVertical: 8,
        fontSize: 16,
        fontWeight: '500',
    },
});
