import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MediaUploader from '../components/MediaUploader';
import { createPost, updatePost } from '../utils/api';
import { isAuthenticated } from '../utils/auth';

export default function PostCreateScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const post = route.params?.post;

  useEffect(() => {
    checkAuth();
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      if (post.media) {
        const media = post.media.split(',');
        if (post.media_type === 'image') setImages(media);
        else setVideo(media[0]);
      }
    }
  }, [post]);

  const checkAuth = async () => {
    if (!(await isAuthenticated())) {
      navigation.navigate('Login');
    }
  };

  const validate = () => {
    if (!title) {
      Alert.alert('错误', '标题不能为空');
      return false;
    }
    if (!content) {
      Alert.alert('错误', '内容不能为空');
      return false;
    }
    if (images.length === 0 && !video) {
      Alert.alert('错误', '请至少上传一张图片或一个视频');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const media = video ? [video] : images;
    const mediaType = video ? 'video' : 'image';
    const data = { title, content, media: media.join(','), media_type: mediaType };

    try {
      if (post) {
        await updatePost(post.id, data);
      } else {
        await createPost(data);
      }
      navigation.navigate('MyPosts');
    } catch (error) {
      Alert.alert('错误', '发布失败');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="标题"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="内容"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <MediaUploader
        onMediaSelected={setImages}
        mediaType="image"
      />
      {!images.length && (
        <MediaUploader
          onMediaSelected={(uris) => setVideo(uris[0])}
          mediaType="video"
        />
      )}
      <Button title={post ? '更新游记' : '发布游记'} onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  contentInput: { height: 150, textAlignVertical: 'top' },
});
