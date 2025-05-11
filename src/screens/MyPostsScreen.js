import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyPosts, deletePost } from '../utils/api';
import PostCard from '../components/PostCard';
import { isAuthenticated } from '../utils/auth';

export default function MyPostsScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
    loadMyPosts();
  }, []);

  const checkAuth = async () => {
    if (!(await isAuthenticated())) {
      navigation.navigate('Login');
    }
  };

  const loadMyPosts = async () => {
    try {
      const { data } = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error('加载我的游记失败:', error);
    }
  };

  const handleEdit = (post) => {
    navigation.navigate('PostCreate', { post });
  };

  const handleDelete = (id) => {
    Alert.alert('确认删除', '确定要删除这篇游记吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
          } catch (error) {
            Alert.alert('错误', '删除失败');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <PostCard post={item} />
      <View style={styles.actions}>
        <Text style={styles.status}>
          状态: {item.status === 'pending' ? '待审核' : item.status === 'approved' ? '已通过' : '未通过'}
        </Text>
        {item.status === 'rejected' && <Text style={styles.reason}>原因: {item.reason}</Text>}
        {(item.status === 'pending' || item.status === 'rejected') && (
          <Button title="编辑" onPress={() => handleEdit(item)} />
        )}
        <Button title="删除" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="发布新游记"
        onPress={() => navigation.navigate('PostCreate')}
      />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postContainer: { marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  status: { fontSize: 14 },
  reason: { fontSize: 14, color: 'red' },
});
