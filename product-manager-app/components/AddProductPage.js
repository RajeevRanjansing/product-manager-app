import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProductPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAdd = async () => {
    if (!name || !price) {
      Alert.alert('Validation', 'Product name and price are required');
      return;
    }

    const stored = await AsyncStorage.getItem('products');
    const parsed = stored ? JSON.parse(stored) : [];

    const duplicate = parsed.find(p => p.name === name);
    if (duplicate) {
      Alert.alert('Duplicate', 'Product already exists');
      return;
    }

    const newProduct = { name, price, image };
    const updated = [...parsed, newProduct];
    await AsyncStorage.setItem('products', JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Product</Text>

      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={{ color: 'white' }}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
    },
  
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
    },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  
  button: {
    backgroundColor: 'green',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default AddProductPage;
