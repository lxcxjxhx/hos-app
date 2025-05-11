import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPostById } from '../utils/api';
import Video from 'react-native-video';

export default function PostDetailScreen() {
  const [post, setPost] = useState(null);
  const route = useRoute();
  const { postId } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const { data } = await getPostById(postId);
      setPost(data);
    } catch (error) {
      console.error('加载游记详情失败:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.title} - 查看详情: http://your-app.com/post/${postId}`,
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  if (!post) return null;

  const media = post.media ? post.media.split(',') : [];
  const isVideo = post.media_type === 'video';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.user?.avatar || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{post.user?.username}</Text>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      {media.length > 0 && (
        <View style={styles.mediaContainer}>
          {isVideo ? (
            <Video
              source={{ uri: media[0] }}
              style={styles.video}
              controls
              resizeMode="contain"
            />
          ) : (
            <ScrollView horizontal pagingEnabled>
              {media.map((uri, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentIndex(index)}
                >
                  <Image source={{ uri }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
      <Text style={styles.content}>{post.content}</Text>
      <Button title="分享" onPress={handleShare} />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  username: { marginLeft: 10, fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  mediaContainer: { marginBottom: 10 },
  image: { width, height: 300, resizeMode: 'cover' },
  video: { width, height: 300 },
  content: { fontSize: 16, marginBottom: 20 },
});
