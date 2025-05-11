import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PostCard({ post }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
    >
      <Image
        source={{ uri: post.media?.split(',')[0] || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: post.user?.avatar || 'https://via.placeholder.com/30' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{post.user?.username || '未知用户'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  image: { width: 100, height: 100, borderRadius: 5 },
  content: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  username: { marginLeft: 5 },
});
