import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../utils/api';
import { setToken } from '../utils/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('错误', '请填写用户名和密码');
      return;
    }

    try {
      const { data } = await login({ username, password });
      await setToken(data.token);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('错误', '登录失败，请检查用户名或密码');
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
      <Button title="登录" onPress={handleLogin} />
      <Button
        title="注册"
        onPress={() => navigation.navigate('Register')}
        color="gray"
      />
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
