import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../utils/api';
import MediaUploader from '../components/MediaUploader';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username || !password || !phoneNumber) {
      Alert.alert('错误', '请填写所有必填项');
      return;
    }

    try {
      await register({ username, password, phone_number: phoneNumber, avatar });
      Alert.alert('成功', '注册成功，请登录');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('错误', '注册失败，用户名或手机号可能已存在');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="手机号"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <MediaUploader
        onMediaSelected={(uris) => setAvatar(uris[0])}
        mediaType="image"
      />
      <Button title="注册" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
