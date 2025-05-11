import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPosts, searchPosts } from '../utils/api';
import PostCard from '../components/PostCard';
import { isAuthenticated } from '../utils/auth';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
    loadPosts();
  }, [page]);

  const checkAuth = async () => {
    if (!(await isAuthenticated())) {
      navigation.navigate('Login');
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts(page);
      setPosts((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('加载游记失败:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return loadPosts();
    setLoading(true);
    try {
      const { data } = await searchPosts(searchQuery);
      setPosts(data);
    } catch (error) {
      console.error('搜索失败:', error);
    }
    setLoading(false);
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" /> : null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜索游记标题或作者"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
