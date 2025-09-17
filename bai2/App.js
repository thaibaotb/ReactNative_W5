import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://68c9fbb4ceef5a150f667b90.mockapi.io/product')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <View key={item.id} style={[styles.card, { marginRight: index % 2 === 0 ? 10 : 0 }]}>
      <Image source={{ uri: item.urlImage }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.productName}>
          {item.productName}
        </Text>
        <Text style={styles.subName}>Cáp chuyển USB sang PS2...</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>★ ★ ★ ★ ★</Text>
          <Text style={styles.ratingCount}>(15)</Text>
        </View>
        <Text style={styles.price}>69.900 đ</Text>
        <Text style={styles.discount}>-39%</Text>
      </View>
    </View>
  );

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item[0] && renderItem({ item: item[0], index: 0 })}
      {item[1] && renderItem({ item: item[1], index: 1 })}
    </View>
  );

  // Group items into pairs for 2 columns
  const groupedData = [];
  for (let i = 0; i < filteredData.length; i += 2) {
    groupedData.push([filteredData[i], filteredData[i + 1]]);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Đáy cáp usb"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
        <View style={styles.headerDot}>···</View>
      </View>

      {/* Product List */}
      <FlatList
        data={groupedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderRow}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerIcon}>≡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerIcon}>⌂</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 50,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  cartButton: {
    padding: 5,
  },
  cartIcon: {
    color: '#fff',
    fontSize: 20,
  },
  headerDot: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  listContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: (screenWidth - 40) / 2, // 2 columns with padding
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    fontSize: 12,
    color: '#FFD700',
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  discount: {
    fontSize: 12,
    color: '#FF3B30',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#0056CC',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    color: '#fff',
    fontSize: 24,
  },
});