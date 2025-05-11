import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '游记列表' }} />
        <Stack.Screen name="MyPosts" component={MyPostsScreen} options={{ title: '我的游记' }} />
        <Stack.Screen name="PostCreate" component={PostCreateScreen} options={{ title: '发布游记' }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: '游记详情' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '登录' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '注册' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
