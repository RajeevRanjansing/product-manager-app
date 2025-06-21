import React, { useState, useEffect } from 'react';
import { View,Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';


const HomePage = ({ navigation }) => {
  const [products, setProduct] = useState([]);
  const [filtered, setFilter] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      const parsed = storedProducts ? JSON.parse(storedProducts) : [];
      setProduct(parsed);
      setFilter(parsed);
    };

    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = products.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilter(filteredData);
  };

  const handleDelete = async (name) => {
    const updated = products.filter(item => item.name !== name);
    setProduct(updated);
    setFilter(updated);
    await AsyncStorage.setItem('products', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.name)}>
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Product"
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />

      {filtered.length === 0 ? (
        <Text style={styles.noData}>No Product Found</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddProductPage')}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: 'white' 
    },
  
  search: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    width:150,
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    color: 'gray',
    fontSize: 12,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  fab: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default HomePage;
