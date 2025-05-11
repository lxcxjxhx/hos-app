import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function MediaUploader({ onMediaSelected, mediaType = 'image' }) {
  const [media, setMedia] = useState([]);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('需要相册权限！');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        mediaType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: mediaType === 'image',
      quality: 0.5,
    });

    if (!result.canceled) {
      const newMedia = mediaType === 'image' ? result.assets : [result.assets[0]];
      setMedia(newMedia);
      onMediaSelected(newMedia.map((asset) => asset.uri));
    }
  };

  return (
    <View style={styles.container}>
      <Button title={`上传${mediaType === 'image' ? '图片' : '视频'}`} onPress={pickMedia} />
      <View style={styles.preview}>
        {media.map((item, index) => (
          <Image key={index} source={{ uri: item.uri }} style={styles.thumbnail} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  preview: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  thumbnail: { width: 60, height: 60, margin: 5, borderRadius: 5 },
});
