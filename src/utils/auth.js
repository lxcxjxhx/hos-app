import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};
