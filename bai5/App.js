import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', or 'horizontal'

  useEffect(() => {
    fetch('https://68c9fbb4ceef5a150f667b90.mockapi.io/product')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={viewMode === 'list' ? styles.listItem : styles.gridItem}>
      <Image source={{ uri: item.urlImage }} style={styles.image} />
      <Text style={styles.productName}>{item.productName}</Text>
    </View>
  );

  const toggleViewMode = () => {
    setViewMode(prevMode => 
      prevMode === 'list' ? 'grid' : prevMode === 'grid' ? 'horizontal' : 'list'
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gallery App</Text>
        <Text style={styles.description}>
          A collection of products from our API.
        </Text>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleViewMode}>
          <Text style={styles.toggleText}>
            Switch to {viewMode === 'list' ? 'Grid' : viewMode === 'grid' ? 'Horizontal' : 'List'} View
          </Text>
        </TouchableOpacity>
      </View>
      {viewMode === 'horizontal' ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          key="horizontal"
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={styles.listContent}
          key={viewMode} // Change key to force re-render when viewMode changes
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: '#00aaff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    fontSize: 16,
    color: '#00aaff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  horizontalList: {
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});