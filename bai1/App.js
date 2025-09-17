import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://68c9fbb4ceef5a150f667b90.mockapi.io/product')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.urlImage }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.productName}
        </Text>
        <Text style={styles.shopName}>{item.shopName}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartText}>🛒</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Bạn có thắc mắc về sản phẩm vui lòng xém. Chúng tôi chat với shop!</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>≪</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>⌂</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>↳</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00aaff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 0,
  },
  backButton: {
    backgroundColor: '#00cc00',
    padding: 5,
    borderRadius: 3,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#00aaff',
    padding: 5,
  },
  cartText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  shopName: {
    color: 'gray',
    fontSize: 12,
  },
  chatButton: {
    backgroundColor: '#ff3333',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  chatText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00aaff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  footerButton: {
    padding: 5,
  },
  footerText: {
    color: '#000',
    fontSize: 20,
  },
});